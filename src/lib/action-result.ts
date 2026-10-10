import "server-only";

import { getErrorMessage } from "./utils";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

// Next.js hides thrown server action errors in production, so actions
// return the message instead of throwing.
export async function runAction<T>(
  action: () => Promise<T>,
): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await action() };
  } catch (error) {
    return {
      ok: false,
      message: getErrorMessage(error, "Something went wrong"),
    };
  }
}
