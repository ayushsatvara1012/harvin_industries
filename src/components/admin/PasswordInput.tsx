"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import { inputClass } from "./fields";

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export function PasswordInput({ className = "", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input {...props} type={visible ? "text" : "password"} className={`${inputClass} pr-11 ${className}`} />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-brand-text-secondary hover:text-brand-ink"
      >
        <Icon name={visible ? "visibility_off" : "visibility"} className="text-xl" />
      </button>
    </div>
  );
}
