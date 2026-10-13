export interface ListResponse<T> {
  results?: number;
  data: T[];
}

export interface PaginatedResponse<T> {
  /** Total matches across all pages, not just this page. */
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: T[];
}

export interface ItemResponse<T> {
  data: T;
}
