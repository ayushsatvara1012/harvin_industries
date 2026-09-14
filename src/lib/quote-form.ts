// Shared shape for the /contact quote form. Kept out of `app/contact/actions.ts`
// because a "use server" module may only export async functions — a plain object
// exported from there is stripped at runtime and arrives as `undefined`.

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field name → error, keyed so the input can render its own message. */
  errors: Record<string, string>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values: Record<string, string>;
};

export const EMPTY_FORM_STATE: QuoteFormState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
