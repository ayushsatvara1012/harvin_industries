"use client";

import { Icon } from "@/components/ui";
import { inputClass, secondaryButtonClass } from "./fields";

export type Column<T> = {
  key: keyof T & string;
  label: string;
  placeholder?: string;
  inputMode?: "numeric";
  className?: string;
  multiline?: boolean;
};

export function RowsEditor<T extends Record<string, string>>({
  rows,
  onChange,
  columns,
  emptyRow,
  addLabel,
  errorFor,
}: {
  rows: T[];
  onChange: (rows: T[]) => void;
  columns: Column<T>[];
  emptyRow: T;
  addLabel: string;
  errorFor?: (index: number, key: string) => string | undefined;
}) {
  const update = (index: number, key: keyof T, value: string) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));

  return (
    <div className="grid gap-3">
      {rows.length > 0 && (
        <div aria-hidden="true" className="hidden gap-2 sm:flex">
          <div className="grid flex-1 gap-2 sm:grid-flow-col sm:auto-cols-fr">
            {columns.map((column) => (
              <span key={column.key} className="text-xs font-semibold uppercase tracking-wide text-brand-text-secondary">
                {column.label}
              </span>
            ))}
          </div>
          <span className="w-8 shrink-0" />
        </div>
      )}
      {rows.map((row, index) => (
        <div key={index} className="flex items-start gap-2 max-sm:rounded-lg max-sm:border max-sm:border-brand-border max-sm:p-3">
          <div className="grid flex-1 gap-2 sm:grid-flow-col sm:auto-cols-fr">
            {columns.map((column) => {
              const error = errorFor?.(index, column.key);
              const fieldProps = {
                "aria-label": `${column.label}, row ${index + 1}`,
                value: row[column.key],
                placeholder: column.placeholder ?? "",
              };
              return (
                <div key={column.key} className={column.className}>
                  <span className="mb-1 block text-xs font-semibold text-brand-text-secondary sm:hidden">{column.label}</span>
                  {column.multiline ? (
                    <textarea
                      {...fieldProps}
                      rows={1}
                      onChange={(event) => update(index, column.key, event.target.value)}
                      className={`${inputClass} field-sizing-content min-h-[42px] resize-none`}
                    />
                  ) : (
                    <input
                      {...fieldProps}
                      onChange={(event) => update(index, column.key, event.target.value)}
                      inputMode={column.inputMode}
                      className={inputClass}
                    />
                  )}
                  {error && <p className="mt-1 text-xs font-medium text-red-700">{error}</p>}
                </div>
              );
            })}
          </div>
          <div className="flex h-[42px] w-8 shrink-0 items-center justify-center max-sm:mt-5">
            <button
              type="button"
              aria-label={`Remove row ${index + 1}`}
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
              className="flex size-8 items-center justify-center rounded-full text-brand-text-secondary hover:bg-red-50 hover:text-red-700"
            >
              <Icon name="close" className="text-xl" />
            </button>
          </div>
        </div>
      ))}
      <div>
        <button type="button" onClick={() => onChange([...rows, emptyRow])} className={secondaryButtonClass}>
          <Icon name="add" className="text-lg" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
