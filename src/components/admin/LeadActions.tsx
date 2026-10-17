"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markLeadHandled, removeLead } from "@/app/admin/(panel)/leads/actions";
import { Icon } from "@/components/ui";

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
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={() => run(() => markLeadHandled(id, !handled))}
        className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3.5 py-2 text-xs font-semibold text-brand-ink transition-colors hover:border-brand-accent hover:text-brand-accent-text hover:bg-brand-surface-alt disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon
          name={handled ? "undo" : "check_circle"}
          className={`text-base ${handled ? "text-brand-text-secondary" : "text-green-600"}`}
        />
        <span>{handled ? "Mark as new" : "Mark as handled"}</span>
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (window.confirm(`Delete the enquiry from "${name}"? This cannot be undone.`)) run(() => removeLead(id));
        }}
        title={`Delete enquiry from ${name}`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Icon name="delete" className="text-base" />
        <span>Delete</span>
      </button>
      {error && (
        <span role="alert" className="text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}
