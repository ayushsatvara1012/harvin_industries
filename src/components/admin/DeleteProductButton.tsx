"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProduct } from "@/app/admin/(panel)/products/actions";
import { Icon } from "@/components/ui";

export function DeleteProductButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  function handleClick() {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await removeProduct(id);
      if (result.ok) router.refresh();
      else setError(result.message);
    });
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        title={`Delete ${name}`}
        aria-label={`Delete ${name}`}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon
          name={pending ? "progress_activity" : "delete"}
          className={`text-base ${pending ? "animate-spin" : ""}`}
        />
        <span>{pending ? "Deleting..." : "Delete"}</span>
      </button>
      {error && (
        <span role="alert" className="absolute left-0 top-full mt-1 whitespace-nowrap text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
