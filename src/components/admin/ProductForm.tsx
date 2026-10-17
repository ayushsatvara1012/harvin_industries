"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveProduct } from "@/app/admin/(panel)/products/actions";
import { CATEGORY_LABELS } from "@/lib/product-types";
import { CATEGORIES } from "@/lib/product-schema";
import {
  EMPTY_FEATURE_GROUP,
  EMPTY_PRODUCTION_ROW,
  EMPTY_SPEC_ROW,
  type ProductFormValues,
  describeIssuePath,
  slugify,
  toPayload,
} from "@/lib/product-form";
import { Field, Section, inputClass, selectClass, primaryButtonClass, secondaryButtonClass } from "./fields";
import { Icon } from "@/components/ui";
import { ImagesEditor } from "./ImagesEditor";
import { RowsEditor, type Column } from "./RowsEditor";
import type { SpecRowValues, ProductionRowValues } from "@/lib/product-form";

const SPEC_COLUMNS: Column<SpecRowValues>[] = [
  { key: "label", label: "Label" },
  { key: "value", label: "Value" },
  { key: "note", label: "Note", placeholder: "Optional, in plain language", multiline: true },
];

const PRODUCTION_COLUMNS: Column<ProductionRowValues>[] = [
  { key: "product", label: "Product" },
  { key: "sizeMm", label: "Size", placeholder: "mm" },
  { key: "pcsPerMould", label: "Pcs per mould", inputMode: "numeric" },
  { key: "pcsPerHour", label: "Pcs per hour", inputMode: "numeric" },
];

export function ProductForm({ id, initial }: { id: number | null; initial: ProductFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(id !== null);
  const [message, setMessage] = useState<string>();
  const [issues, setIssues] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));

  const error = (path: string) => issues[path];

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setMessage(undefined);
    setIssues({});
    startTransition(async () => {
      const result = await saveProduct(id, toPayload(values));
      if (result.ok) {
        router.push("/admin/products");
        router.refresh();
        return;
      }
      setMessage(result.message);
      setIssues(Object.fromEntries((result.issues ?? []).map((issue) => [issue.path, issue.message])));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const issueCount = Object.keys(issues).length;

  return (
    <form onSubmit={submit} className="grid gap-6" noValidate>
      {message && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-semibold">{message}</p>
          {issueCount > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {Object.entries(issues).map(([path, text]) => (
                <li key={path}>
                  <strong>{describeIssuePath(path)}</strong>: {text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Section title="Basics">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" error={error("name")}>
            <input
              id="name"
              value={values.name}
              onChange={(event) => {
                set("name", event.target.value);
                if (!slugTouched) set("slug", slugify(event.target.value));
              }}
              className={inputClass}
            />
          </Field>
          <Field
            label="URL slug"
            htmlFor="slug"
            hint="Used in the page address, e.g. /products/hi-1500. Changing it breaks old links."
            error={error("slug")}
          >
            <input
              id="slug"
              value={values.slug}
              onChange={(event) => {
                setSlugTouched(true);
                set("slug", event.target.value);
              }}
              className={inputClass}
            />
          </Field>
          <Field label="Category" htmlFor="category" error={error("category")}>
            <div className="relative">
              <select
                id="category"
                value={values.category}
                onChange={(event) => set("category", event.target.value as ProductFormValues["category"])}
                className={`${selectClass} h-[42px]`}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {CATEGORY_LABELS[category]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-text-secondary">
                <Icon name="expand_more" className="text-xl" />
              </div>
            </div>
          </Field>
          <Field label="Tagline" htmlFor="tagline" hint="One line shown on cards." error={error("tagline")}>
            <input id="tagline" value={values.tagline} onChange={(event) => set("tagline", event.target.value)} className={inputClass} />
          </Field>
        </div>
        <Field label="Description" htmlFor="description" error={error("description")}>
          <textarea
            id="description"
            rows={4}
            value={values.description}
            onChange={(event) => set("description", event.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Images" description="The first image is the main one on cards and the product page.">
        <ImagesEditor
          images={values.images}
          onChange={(images) => set("images", images)}
          defaultAlt={values.name}
          errorFor={(index) => error(`images.${index}.alt`)}
        />
        {error("images") && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error("images")}
          </p>
        )}
      </Section>

      <Section title="Headline figures" description="Optional. Shown on cards and the product page.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Output capacity (pcs/hr)" htmlFor="outputCapacity" error={error("outputCapacity")}>
            <input
              id="outputCapacity"
              inputMode="numeric"
              value={values.outputCapacity}
              onChange={(event) => set("outputCapacity", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Power" htmlFor="power" hint="e.g. 15 KW (22.5 HP)" error={error("power")}>
            <input id="power" value={values.power} onChange={(event) => set("power", event.target.value)} className={inputClass} />
          </Field>
          <Field label="Daily output" htmlFor="dailyOutput" error={error("dailyOutput")}>
            <input id="dailyOutput" value={values.dailyOutput} onChange={(event) => set("dailyOutput", event.target.value)} className={inputClass} />
          </Field>
          <Field label="Best for" htmlFor="bestFor" error={error("bestFor")}>
            <input id="bestFor" value={values.bestFor} onChange={(event) => set("bestFor", event.target.value)} className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section title="Specifications" description="Label and value pairs. The note explains the number in plain language.">
        <RowsEditor
          rows={values.specs}
          onChange={(rows) => set("specs", rows)}
          columns={SPEC_COLUMNS}
          emptyRow={EMPTY_SPEC_ROW}
          addLabel="Add specification"
          errorFor={(index, key) => error(`specs.${index}.${key}`)}
        />
      </Section>

      <Section title="Production summary">
        <RowsEditor
          rows={values.productionSummary}
          onChange={(rows) => set("productionSummary", rows)}
          columns={SPEC_COLUMNS}
          emptyRow={EMPTY_SPEC_ROW}
          addLabel="Add summary row"
          errorFor={(index, key) => error(`productionSummary.${index}.${key}`)}
        />
      </Section>

      <Section title="Production table" description="What this machine produces and how fast.">
        <RowsEditor
          rows={values.productionTable}
          onChange={(rows) => set("productionTable", rows)}
          columns={PRODUCTION_COLUMNS}
          emptyRow={EMPTY_PRODUCTION_ROW}
          addLabel="Add product row"
          errorFor={(index, key) => error(`productionTable.${index}.${key}`)}
        />
      </Section>

      <Section title="Features" description="Groups of features. Put one item per line.">
        <div className="grid gap-4">
          {values.featureGroups.map((group, index) => (
            <div key={index} className="rounded-lg border border-brand-border p-4">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <input
                    aria-label={`Group title ${index + 1}`}
                    placeholder="Group title"
                    value={group.title}
                    onChange={(event) =>
                      set(
                        "featureGroups",
                        values.featureGroups.map((item, i) => (i === index ? { ...item, title: event.target.value } : item)),
                      )
                    }
                    className={inputClass}
                  />
                  {error(`featureGroups.${index}.title`) && (
                    <p className="mt-1 text-xs font-medium text-red-700">{error(`featureGroups.${index}.title`)}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label={`Remove group ${index + 1}`}
                  onClick={() => set("featureGroups", values.featureGroups.filter((_, i) => i !== index))}
                  className={secondaryButtonClass}
                >
                  Remove
                </button>
              </div>
              <textarea
                aria-label={`Items for group ${index + 1}`}
                rows={4}
                placeholder="One feature per line"
                value={group.itemsText}
                onChange={(event) =>
                  set(
                    "featureGroups",
                    values.featureGroups.map((item, i) => (i === index ? { ...item, itemsText: event.target.value } : item)),
                  )
                }
                className={`${inputClass} mt-2`}
              />
              {error(`featureGroups.${index}.items`) && (
                <p className="mt-1 text-xs font-medium text-red-700">{error(`featureGroups.${index}.items`)}</p>
              )}
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => set("featureGroups", [...values.featureGroups, EMPTY_FEATURE_GROUP])}
              className={secondaryButtonClass}
            >
              Add feature group
            </button>
          </div>
        </div>
        <Field label="Additional outputs" htmlFor="additionalOutputs" hint="Other things this machine can make. One per line.">
          <textarea
            id="additionalOutputs"
            rows={5}
            value={values.additionalOutputsText}
            onChange={(event) => set("additionalOutputsText", event.target.value)}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Publishing">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Status" htmlFor="status" hint="Drafts are hidden from the public site.">
            <div className="relative">
              <select
                id="status"
                value={values.status}
                onChange={(event) => set("status", event.target.value as ProductFormValues["status"])}
                className={`${selectClass} h-[42px]`}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-brand-text-secondary">
                <Icon name="expand_more" className="text-xl" />
              </div>
            </div>
          </Field>
          <Field label="Display order" htmlFor="sortOrder" hint="Lower numbers come first." error={error("sortOrder")}>
            <input
              id="sortOrder"
              inputMode="numeric"
              value={values.sortOrder}
              onChange={(event) => set("sortOrder", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Featured">
            <label className="flex h-[42px] items-center gap-2 text-sm text-brand-text">
              <input
                type="checkbox"
                checked={values.featured}
                onChange={(event) => set("featured", event.target.checked)}
                className="size-4 accent-brand-yellow"
              />
              Show as a featured machine
            </label>
          </Field>
        </div>
      </Section>

      <div className="sticky bottom-0 -mx-4 flex items-center justify-end gap-3 border-t border-brand-border bg-brand-surface-alt/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <Link href="/admin/products" prefetch={false} className={secondaryButtonClass}>
          Cancel
        </Link>
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Saving..." : id === null ? "Create product" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
