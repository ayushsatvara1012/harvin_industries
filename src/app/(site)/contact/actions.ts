"use server";

import { createLead } from "@/lib/leads";
import { getPublishedSlugs } from "@/lib/products";
import { isValidSlug } from "@/lib/product-schema";
import { OUTPUT_BANDS, PHONE } from "@/data/contact";
import type { QuoteFormState } from "@/lib/quote-form";

const VALID_BANDS = new Set(OUTPUT_BANDS);

// Deliberately permissive: Indian mobile numbers get written with spaces, +91,
// 0 prefixes and hyphens, and rejecting those loses real leads.
const PHONE_PATTERN = /^[+\d][\d\s\-()]{7,19}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitQuoteRequest(
  _previous: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Honeypot: a real person never fills a field they cannot see. Report success
  // so a bot gets no signal about why nothing happened.
  if (readField(formData, "company_website")) {
    return { status: "success", message: "Thank you — your enquiry has been received.", errors: {}, values: {} };
  }

  const values = {
    name: readField(formData, "name"),
    company: readField(formData, "company"),
    phone: readField(formData, "phone"),
    email: readField(formData, "email"),
    location: readField(formData, "location"),
    product: readField(formData, "product"),
    output: readField(formData, "output"),
    message: readField(formData, "message"),
  };

  // A catalog outage must not block an enquiry, so fall back to checking the
  // slug's shape and keep the real lookup for when the database is reachable.
  let validSlugs: Set<string> | null = null;
  try {
    validSlugs = new Set(await getPublishedSlugs());
  } catch (error) {
    console.error("[contact] could not load the catalog to validate the product", error);
  }
  const knownProduct = (slug: string) =>
    validSlugs ? validSlugs.has(slug) : isValidSlug(slug);
  const errors: Record<string, string> = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_PATTERN.test(values.phone)) errors.phone = "Please enter a reachable phone number.";
  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "That email address does not look right.";
  }
  if (values.product && values.product !== "unsure" && !knownProduct(values.product)) {
    errors.product = "Please choose a machine from the list.";
  }
  if (values.output && !VALID_BANDS.has(values.output)) {
    errors.output = "Please choose an option from the list.";
  }
  if (values.message.length > 2000) errors.message = "Please keep the message under 2000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  try {
    await createLead(values);
  } catch (error) {
    console.error("[contact] could not store the enquiry", error);
    return {
      status: "error",
      message: `We could not save your enquiry. Please try again, or call us on ${PHONE}.`,
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you — your enquiry has been received. We will call you back within one working day.",
    errors: {},
    values: {},
  };
}
