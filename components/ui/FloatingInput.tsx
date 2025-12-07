"use client";

import { useState, useId, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  funnyError?: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, funnyError, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const id = useId();

    const isFloating = isFocused || hasValue;
    const displayError = error || funnyError;

    return (
      <div className="relative w-full">
        <div className="relative h-16">
          <input
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
              "peer w-full h-full bg-transparent border-0 border-b-2 px-0 pt-5 pb-2",
              "text-[var(--theme-text)] text-lg",
              "placeholder-transparent",
              "focus:outline-none focus:ring-0",
              "transition-colors duration-300",
              isFocused
                ? "border-[var(--ace-gold)]"
                : displayError
                ? "border-red-500"
                : "border-[var(--theme-text-muted)]/30",
              className
            )}
            placeholder={label}
          />

          {/* Floating Label */}
          <label
            htmlFor={id}
            className={cn(
              "absolute left-0 pointer-events-none",
              "transition-all duration-300 ease-out",
              isFloating
                ? "top-0 text-xs font-medium"
                : "top-6 text-base",
              isFocused
                ? "text-[var(--ace-gold)]"
                : displayError
                ? "text-red-500"
                : "text-[var(--theme-text-muted)]"
            )}
          >
            {label}
          </label>

          {/* Animated Underline */}
          <span
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--ace-gold)]",
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

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
