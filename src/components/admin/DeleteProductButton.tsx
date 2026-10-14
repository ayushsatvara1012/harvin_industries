"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeProduct } from "@/app/admin/(panel)/products/actions";

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
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="text-sm font-semibold text-red-700 hover:underline disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {error && (
        <span role="alert" className="ml-2 text-xs text-red-700">
          {error}
        </span>
      )}
    </>
  );
}
