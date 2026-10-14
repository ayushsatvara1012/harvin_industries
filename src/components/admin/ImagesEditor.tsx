"use client";

import { useRef, useState } from "react";
import { CloudinaryImage, Icon } from "@/components/ui";
import type { ProductImage } from "@/lib/product-types";
import { inputClass, secondaryButtonClass } from "./fields";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp";

type Signature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  allowedFormats: string;
};

async function uploadToCloudinary(file: File): Promise<string> {
  const signed = await fetch("/api/admin/cloudinary-sign", { method: "POST" }).catch(() => {
    throw new Error("Could not reach the server. Check your connection and try again.");
  });
  if (!signed.ok) throw new Error("Could not start the upload. Please sign in again.");
  const sig: Signature = await signed.json();

  const form = new FormData();
  form.set("file", file);
  form.set("api_key", sig.apiKey);
  form.set("timestamp", String(sig.timestamp));
  form.set("signature", sig.signature);
  form.set("folder", sig.folder);
  form.set("allowed_formats", sig.allowedFormats);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  }).catch(() => {
    throw new Error("Could not reach the image service. Check your connection and try again.");
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error("[upload] Cloudinary refused the file:", body.error?.message);
    const refused = /not allowed|invalid|format|corrupt/i.test(body.error?.message ?? "");
    throw new Error(refused ? "That file is not a valid JPG, PNG or WebP image." : "The upload failed. Please try again.");
  }
  return body.public_id as string;
}

export function ImagesEditor({
  images,
  onChange,
  defaultAlt,
  errorFor,
}: {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  defaultAlt: string;
  errorFor?: (index: number) => string | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setError(undefined);
    setBusy(true);
    const added: ProductImage[] = [];
    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_BYTES) throw new Error(`${file.name} is over 10 MB`);
        added.push({ publicId: await uploadToCloudinary(file), alt: defaultAlt });
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      if (added.length) onChange([...images, ...added]);
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function move(index: number, by: -1 | 1) {
    const next = [...images];
    [next[index], next[index + by]] = [next[index + by], next[index]];
    onChange(next);
  }

  return (
    <div className="grid gap-4">
      {images.map((image, index) => (
        <div key={image.publicId} className="flex items-start gap-4 rounded-lg border border-brand-border p-3">
          <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden rounded-md bg-brand-surface-alt">
            <CloudinaryImage publicId={image.publicId} alt="" fill sizes="112px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
              {index === 0 ? "Main image" : `Image ${index + 1}`}
            </p>
            <input
              aria-label={`Alt text for image ${index + 1}`}
              value={image.alt}
              onChange={(event) =>
                onChange(images.map((item, i) => (i === index ? { ...item, alt: event.target.value } : item)))
              }
              placeholder="Describe what the image shows"
              className={`${inputClass} mt-1`}
            />
            {errorFor?.(index) && <p className="mt-1 text-xs font-medium text-red-700">{errorFor(index)}</p>}
          </div>
          <div className="flex shrink-0 flex-col">
            <button
              type="button"
              aria-label="Move image earlier"
              disabled={index === 0}
              onClick={() => move(index, -1)}
              className="rounded-full p-1 hover:bg-brand-surface-alt disabled:opacity-30"
            >
              <Icon name="arrow_upward" className="text-xl" />
            </button>
            <button
              type="button"
              aria-label="Move image later"
              disabled={index === images.length - 1}
              onClick={() => move(index, 1)}
              className="rounded-full p-1 hover:bg-brand-surface-alt disabled:opacity-30"
            >
              <Icon name="arrow_downward" className="text-xl" />
            </button>
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(images.filter((_, i) => i !== index))}
              className="rounded-full p-1 text-brand-text-secondary hover:bg-red-50 hover:text-red-700"
            >
              <Icon name="delete" className="text-xl" />
            </button>
          </div>
        </div>
      ))}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          hidden
          onChange={(event) => handleFiles(event.target.files)}
        />
        <button type="button" disabled={busy} onClick={() => inputRef.current?.click()} className={secondaryButtonClass}>
          <Icon name={busy ? "progress_activity" : "upload"} className={`text-lg ${busy ? "animate-spin" : ""}`} />
          {busy ? "Uploading..." : "Upload images"}
        </button>
        <p className="mt-2 text-xs text-brand-text-secondary">JPG, PNG or WebP, up to 10 MB each. The first image is the main one.</p>
        {error && (
          <p role="alert" className="mt-1 text-xs font-medium text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
