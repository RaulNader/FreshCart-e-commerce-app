import type { Product } from "./product.type";

export type CartProduct = Pick<
  Product,
  | "_id"
  | "id"
  | "title"
  | "quantity"
  | "imageCover"
  | "category"
  | "brand"
  | "subcategory"
  | "ratingsAverage"
>;

// Adding to cart returns each product as a bare id instead of an object.
export interface CartItem<TProduct = CartProduct> {
  _id: string;
  count: number;
  price: number;
  product: TProduct;
}

export interface Cart<TProduct = CartProduct> {
  _id: string;
  cartOwner: string;
  products: CartItem<TProduct>[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse<TProduct = CartProduct> {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart<TProduct>;
}
