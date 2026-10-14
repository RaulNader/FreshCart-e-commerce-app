import "server-only";

import { ApiError, apiFetch } from "@/lib/api";
import type { ProductQuery } from "@/lib/product-query";
import type {
  ItemResponse,
  ListResponse,
  PaginatedResponse,
} from "@/types/api.type";
import type { Product } from "@/types/product.type";

const REVALIDATE_SECONDS = 60;
const PAGE_SIZE = 12;
// Largest page size the API accepts.
const MAX_API_LIMIT = 50;

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getProducts() {
  const { data } = await apiFetch<ListResponse<Product>>("/products", {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return data;
}

function fetchProductPage(params: URLSearchParams) {
  return apiFetch<PaginatedResponse<Product>>(`/products?${params}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

/** Fetches every page that matches the filters in `params`. */
async function fetchAllProducts(params: URLSearchParams) {
  params.set("limit", String(MAX_API_LIMIT));

  const firstPage = await fetchProductPage(params);
  const remainingPages = await Promise.all(
    // numberOfPages is 0 when nothing matches.
    Array.from({ length: Math.max(firstPage.metadata.numberOfPages - 1, 0) }, (_, i) => {
      const pageParams = new URLSearchParams(params);
      pageParams.set("page", String(i + 2));
      return fetchProductPage(pageParams);
    }),
  );

  return [firstPage, ...remainingPages].flatMap((page) => page.data);
}

/** Every product in the catalog (used by the sitemap). */
export function getAllProducts() {
  return fetchAllProducts(new URLSearchParams());
}

export async function searchProducts(
  query: ProductQuery,
): Promise<ProductSearchResult> {
  // Category, brand, price and sort are filtered by the API.
  const params = new URLSearchParams();
  if (query.category) params.set("category[in]", query.category);
  if (query.brand) params.set("brand", query.brand);
  if (query.minPrice !== undefined) {
    params.set("price[gte]", String(query.minPrice));
  }
  if (query.maxPrice !== undefined) {
    params.set("price[lte]", String(query.maxPrice));
  }
  if (query.sort) params.set("sort", query.sort);

  if (!query.keyword) {
    params.set("limit", String(PAGE_SIZE));
    params.set("page", String(query.page));

    const { data, results, metadata } = await fetchProductPage(params);
    return {
      products: data,
      total: results,
      page: metadata.currentPage,
      totalPages: metadata.numberOfPages,
    };
  }

  // The API ignores `keyword`, so search titles here and paginate locally.
  const keyword = query.keyword.toLowerCase();
  const matches = (await fetchAllProducts(params)).filter((product) =>
    product.title.toLowerCase().includes(keyword),
  );
  const start = (query.page - 1) * PAGE_SIZE;

  return {
    products: matches.slice(start, start + PAGE_SIZE),
    total: matches.length,
    page: query.page,
    totalPages: Math.ceil(matches.length / PAGE_SIZE),
  };
}

/** Resolves to null when the id does not match a product. */
export async function getProduct(id: string) {
  try {
    const { data } = await apiFetch<ItemResponse<Product | null>>(
      `/products/${encodeURIComponent(id)}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    return data;
  } catch (error) {
    if (error instanceof ApiError && [400, 404].includes(error.status)) {
      return null;
    }
    throw error;
  }
}

export async function getRelatedProducts(categoryId: string) {
  const { data } = await apiFetch<ListResponse<Product>>(
    `/products?category[in]=${encodeURIComponent(categoryId)}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  return data;
}
