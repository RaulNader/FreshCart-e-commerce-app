import Image from "next/image";
import { PackageOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { PRIVATE_PAGE_ROBOTS } from "@/lib/site";
import { getUserOrders } from "@/services/orders.service";
import type { UserOrder } from "@/types/order.type";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  robots: PRIVATE_PAGE_ROBOTS,
};

function formatOrderDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCard({ order }: { order: UserOrder }) {
  const headingId = `order-${order.id}`;

  return (
    <article
      aria-labelledby={headingId}
      className="bg-white rounded-xl border border-default shadow-xs p-4"
    >
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-default pb-3">
        <div>
          <h2 id={headingId} className="font-semibold text-heading">
            Order #{order.id}
          </h2>
          <p className="text-sm text-muted-foreground">
            {order.createdAt ? (
              // Machine-readable date alongside the human-readable one.
              <time dateTime={order.createdAt}>
                {formatOrderDate(order.createdAt)}
              </time>
            ) : (
              "Unknown date"
            )}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-bold text-blue-600">
            <span className="sr-only">Total: </span>
            {order.totalOrderPrice} EGP
          </p>
          {order.paymentMethodType && (
            <p className="text-xs text-muted-foreground capitalize">
              {order.paymentMethodType}
            </p>
          )}
        </div>
      </header>

      <ul className="mt-4 space-y-3">
        {order.items.map((item) => (
          <li
            key={`${order.id}-${item.id}`}
            className="flex flex-col sm:flex-row sm:items-center gap-3 border border-default rounded-lg p-3"
          >
            {item.imageCover ? (
              <Image
                src={item.imageCover}
                alt={item.title}
                width={80}
                height={80}
                className="w-16 h-16 rounded-md object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-md bg-neutral-secondary-medium" />
            )}

            <div className="flex-1 min-w-0">
              <p className="font-medium text-heading line-clamp-1">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.count}
              </p>
            </div>

            <p className="font-semibold text-blue-500 whitespace-nowrap self-start sm:self-auto">
              {item.price * item.count} EGP
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default async function AllOrders() {
  let orders: UserOrder[] = [];
  let error = "";

  try {
    orders = await getUserOrders();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load orders.";
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {error ? (
        <p
          role="alert"
          className="bg-white rounded-xl border border-default p-6 text-center text-red-500 font-semibold"
        >
          {error}
        </p>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          description="When you place an order, it will show up here."
          action={{ href: "/products", label: "Start shopping" }}
          className="bg-white rounded-xl border border-default"
        />
      ) : (
        <ol className="space-y-4">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
