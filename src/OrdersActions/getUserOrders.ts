"use server";

import { getMyToken } from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";

export interface OrderedProduct {
  id: string;
  title: string;
  imageCover: string;
  count: number;
  price: number;
}

export interface UserOrder {
  id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  items: OrderedProduct[];
}

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

  const createdAt = toString(raw.createdAt);
  const id = toString(raw._id ?? raw.id, `order-${index + 1}`);

  return {
    id,
    createdAt,
    totalOrderPrice,
    paymentMethodType: toString(raw.paymentMethodType) || undefined,
    isPaid: typeof raw.isPaid === "boolean" ? raw.isPaid : undefined,
    isDelivered:
      typeof raw.isDelivered === "boolean" ? raw.isDelivered : undefined,
    items,
  };
}

export async function getUserOrders(): Promise<UserOrder[]> {
  const token = await getMyToken();
  if (!token) throw new Error("You should login first");

  const decoded = jwtDecode<{ id?: string; sub?: string }>(token);
  const userId = decoded.id ?? decoded.sub;
  if (!userId) throw new Error("Cannot resolve user id from token");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const payload: unknown = await res.json();

  if (!res.ok) {
    if (isRecord(payload) && typeof payload.message === "string") {
      throw new Error(payload.message);
    }
    throw new Error("Failed to load orders");
  }

  return pickOrders(payload)
    .map((order, index) => normalizeOrder(order, index))
    .filter((order): order is UserOrder => order !== null);
}
