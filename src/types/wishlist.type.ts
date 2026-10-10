import type { Product } from "./product.type";

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishlistMutationResponse {
  status: string;
  message: string;
  data: string[];
}
