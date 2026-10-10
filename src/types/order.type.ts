export type PaymentMethod = "credit" | "cash";

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

export interface CheckoutSessionResponse {
  status: string;
  session: { url: string };
}
