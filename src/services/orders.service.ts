import "server-only";

import { ApiError, apiFetch } from "@/lib/api";
import { getUserId } from "@/lib/session";
import type { OrderedProduct, UserOrder } from "@/types/order.type";

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function pickOrders(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.orders)) return payload.orders;

  return [];
}

function normalizeItem(raw: unknown): OrderedProduct | null {
  if (!isRecord(raw)) return null;

  const product = isRecord(raw.product) ? raw.product : {};
  const id = toString(product._id ?? product.id ?? raw._id);

  if (!id) return null;

  return {
    id,
    title: toString(product.title, "Untitled product"),
    imageCover: toString(product.imageCover),
    count: toNumber(raw.count, 1),
    price: toNumber(raw.price, toNumber(product.price, 0)),
  };
}

function normalizeOrder(raw: unknown, index: number): UserOrder | null {
  if (!isRecord(raw)) return null;

  const rawItems = Array.isArray(raw.cartItems)
    ? raw.cartItems
    : Array.isArray(raw.items)
      ? raw.items
      : Array.isArray(raw.products)
        ? raw.products
        : [];

  const items = rawItems
    .map((item) => normalizeItem(item))
    .filter((item): item is OrderedProduct => item !== null);

  const totalOrderPrice =
    toNumber(raw.totalOrderPrice) ||
    items.reduce((sum, item) => sum + item.price * item.count, 0);

  return {
    id: toString(raw._id ?? raw.id, `order-${index + 1}`),
    createdAt: toString(raw.createdAt),
    totalOrderPrice,
    paymentMethodType: toString(raw.paymentMethodType) || undefined,
    isPaid: typeof raw.isPaid === "boolean" ? raw.isPaid : undefined,
    isDelivered:
      typeof raw.isDelivered === "boolean" ? raw.isDelivered : undefined,
    items,
  };
}

export async function getUserOrders(): Promise<UserOrder[]> {
  const userId = await getUserId();
  if (!userId) throw new ApiError("You should login first", 401);

  const payload = await apiFetch<unknown>(
    `/orders/user/${encodeURIComponent(userId)}`,
    { auth: true, cache: "no-store" },
  );

  return pickOrders(payload)
    .map((order, index) => normalizeOrder(order, index))
    .filter((order): order is UserOrder => order !== null);
}
