"use client";

import { Icon } from "@/components/ui";
import { inputClass, secondaryButtonClass } from "./fields";

export type Column<T> = {
  key: keyof T & string;
  label: string;
  placeholder?: string;
  inputMode?: "numeric";
  className?: string;
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
      {rows.map((row, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="grid flex-1 gap-2 sm:grid-flow-col sm:auto-cols-fr">
            {columns.map((column) => {
              const error = errorFor?.(index, column.key);
              return (
                <div key={column.key} className={column.className}>
                  <input
                    aria-label={`${column.label}, row ${index + 1}`}
                    value={row[column.key]}
                    onChange={(event) => update(index, column.key, event.target.value)}
                    placeholder={column.label + (column.placeholder ? ` (${column.placeholder})` : "")}
                    inputMode={column.inputMode}
                    className={inputClass}
                  />
                  {error && <p className="mt-1 text-xs font-medium text-red-700">{error}</p>}
                </div>
              );
            })}
          </div>
          <button
            type="button"
            aria-label={`Remove row ${index + 1}`}
            onClick={() => onChange(rows.filter((_, i) => i !== index))}
            className="mt-1.5 rounded-full p-1.5 text-brand-text-secondary hover:bg-red-50 hover:text-red-700"
          >
            <Icon name="close" className="text-xl" />
          </button>
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
