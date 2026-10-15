"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markLeadHandled, removeLead } from "@/app/admin/(panel)/leads/actions";
import { secondaryButtonClass } from "@/components/admin/fields";

export function LeadActions({ id, name, handled }: { id: number; name: string; handled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  function run(action: () => Promise<{ ok: boolean; message?: string }>) {
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setError(undefined);
        router.refresh();
      } else setError(result.message);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        disabled={pending}
        onClick={() => run(() => markLeadHandled(id, !handled))}
        className={`${secondaryButtonClass} py-1.5!`}
      >
        {handled ? "Mark as new" : "Mark as handled"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (window.confirm(`Delete the enquiry from "${name}"? This cannot be undone.`)) run(() => removeLead(id));
        }}
        className="text-sm font-semibold text-red-700 hover:underline disabled:opacity-60"
      >
        Delete
      </button>
      {error && (
        <span role="alert" className="text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}
