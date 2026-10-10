export interface ListResponse<T> {
  results?: number;
  data: T[];
}

export interface ItemResponse<T> {
  data: T;
}
