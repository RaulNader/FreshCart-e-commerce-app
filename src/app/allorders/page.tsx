import Image from "next/image";
import {
  getUserOrders,
  type UserOrder,
} from "@/OrdersActions/getUserOrders";

export const metadata = {
  title: "All Orders",
  description: "FreshCart - All Orders",
};

function formatOrderDate(createdAt: string) {
  if (!createdAt) return "Unknown date";

  return new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AllOrders() {
  let orders: UserOrder[] = [];
  let error = "";

  try {
    orders = await getUserOrders();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load orders.";
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
        <p className="bg-white rounded-xl border border-default p-6 text-center text-red-500 font-semibold">
          {error}
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
        <p className="bg-white rounded-xl border border-default p-6 text-center text-body text-lg font-semibold">
          No orders found yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-5 my-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-default shadow-xs p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-default pb-3">
              <div>
                <p className="font-semibold text-heading">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {formatOrderDate(order.createdAt)}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-bold text-blue-600">
                  {order.totalOrderPrice} EGP
                </p>
                {order.paymentMethodType && (
                  <p className="text-xs text-muted-foreground capitalize">
                    {order.paymentMethodType}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {order.items.map((item) => (
                <div
                  key={`${order.id}-${item.id}`}
                  className="flex items-center gap-3 border border-default rounded-lg p-3"
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

                  <p className="font-semibold text-blue-500 whitespace-nowrap">
                    {item.price * item.count} EGP
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
