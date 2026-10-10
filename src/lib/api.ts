import "server-only";

import { getApiToken } from "./session";

const API_URL = process.env.API ?? "https://ecommerce.routemisr.com/api/v1";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiOptions = Omit<RequestInit, "body"> & {
  /** Send the logged-in user's API token. Throws ApiError(401) when logged out. */
  auth?: boolean;
  /** Serialized as JSON. */
  body?: unknown;
};

export async function apiFetch<T>(
  path: string,
  { auth = false, body, headers, ...init }: ApiOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (body !== undefined) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = await getApiToken();
    if (!token) throw new ApiError("You should login first", 401);
    requestHeaders.set("token", token);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      payload?.message ?? `Request failed with status ${res.status}`,
      res.status,
    );
  }

  return payload as T;
}
