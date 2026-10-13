// Shared by the products page (server) and the filter form (client),
// so it must stay free of server-only imports.

export const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price", label: "Price: low to high" },
  { value: "-price", label: "Price: high to low" },
  { value: "-ratingsAverage", label: "Top rated" },
  { value: "-sold", label: "Best selling" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export interface ProductQuery {
  keyword: string;
  category: string;
  brand: string;
  sort: SortValue;
  minPrice?: number;
  maxPrice?: number;
  page: number;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function toPositiveNumber(value: string) {
  const number = Number(value);
  return value !== "" && Number.isFinite(number) && number >= 0
    ? number
    : undefined;
}

/** Turns untrusted URL params into a valid query; bad values are dropped. */
export function parseProductQuery(params: RawSearchParams): ProductQuery {
  const sort = first(params.sort);
  const page = Math.floor(Number(first(params.page)));

  return {
    keyword: first(params.keyword),
    category: first(params.category),
    brand: first(params.brand),
    sort: SORT_OPTIONS.some((option) => option.value === sort)
      ? (sort as SortValue)
      : "",
    minPrice: toPositiveNumber(first(params.minPrice)),
    maxPrice: toPositiveNumber(first(params.maxPrice)),
    page: page >= 1 ? page : 1,
  };
}

/** Builds a /products URL, leaving out empty values and page 1. */
export function productsHref(query: Partial<ProductQuery>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === "") continue;
    if (key === "page" && value === 1) continue;
    params.set(key, String(value));
  }

  const search = params.toString();
  return search ? `/products?${search}` : "/products";
}
