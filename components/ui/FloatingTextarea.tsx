"use client";

import { useState, useId, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  funnyError?: string;
}

const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, funnyError, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const id = useId();

    const isFloating = isFocused || hasValue;
    const displayError = error || funnyError;

    return (
      <div className="relative w-full">
        <div className="relative">
          <textarea
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
              "placeholder-transparent resize-none min-h-[120px]",
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
              "absolute left-0 transition-all duration-300 pointer-events-none",
              "font-[var(--font-inter)]",
              isFloating
                ? "top-0 text-xs"
                : "top-6 text-lg",
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

        {/* Character Count (optional) */}
        {props.maxLength && (
          <p className="mt-1 text-xs text-[var(--theme-text-muted)] text-right">
            {String(props.value || "").length} / {props.maxLength}
          </p>
        )}

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

FloatingTextarea.displayName = "FloatingTextarea";

export default FloatingTextarea;
