"use client";

import { useState, useId, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FloatingSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: SelectOption[];
  error?: string;
  funnyError?: string;
}

const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, options, error, funnyError, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const id = useId();

    const isFloating = isFocused || hasValue;
    const displayError = error || funnyError;

    return (
      <div className="relative w-full">
        <div className="relative">
          <select
            ref={ref}
            id={id}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(!!e.target.value);
              onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            className={cn(
              "peer w-full bg-transparent border-0 border-b-2 px-0 py-4 pt-6",
              "text-[var(--theme-text)] text-lg font-[var(--font-inter)]",
              "focus:outline-none focus:ring-0",
              "transition-colors duration-300 cursor-pointer",
              "appearance-none",
              !hasValue && "text-[var(--theme-text-muted)]",
              isFocused
                ? "border-[var(--ace-gold)]"
                : displayError
                ? "border-red-500"
                : "border-[var(--theme-text-muted)]/30",
              className
            )}
          >
            <option value="" disabled hidden>
              {label}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[var(--theme-background)] text-[var(--theme-text)]"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Floating Label */}
          <label
            htmlFor={id}
            className={cn(
              "absolute left-0 transition-all duration-300 pointer-events-none",
              "font-[var(--font-inter)]",
              isFloating
                ? "top-0 text-xs"
                : "top-1/2 -translate-y-1/2 text-lg",
              isFocused
                ? "text-[var(--ace-gold)]"
                : displayError
                ? "text-red-500"
                : "text-[var(--theme-text-muted)]"
            )}
          >
            {label}
          </label>

          {/* Custom Arrow */}
          <span
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none",
              "transition-transform duration-300",
              isFocused && "rotate-180"
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-colors duration-300",
                isFocused ? "text-[var(--ace-gold)]" : "text-[var(--theme-text-muted)]"
              )}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>

          {/* Animated Underline */}
          <span
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[var(--ace-gold)]",
              "transition-all duration-300 ease-out",
              isFocused ? "w-full" : "w-0"
            )}
          />

          {/* Focus Glow */}
          <span
            className={cn(
              "absolute -bottom-1 left-0 right-0 h-4 pointer-events-none",
              "bg-gradient-to-t from-[var(--ace-gold)]/10 to-transparent",
              "transition-opacity duration-300",
              isFocused ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Error Message */}
        {displayError && (
          <p className="mt-2 text-sm text-red-500 animate-shake">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";

export default FloatingSelect;
