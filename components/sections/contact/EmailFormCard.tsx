"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from 'next-intl';
import gsap from "gsap";
import {
  FloatingInput,
  FloatingTextarea,
  FloatingSelect,
  MagneticButton,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import type { ContactFormData, FormStatus } from "@/types";

interface EmailFormCardProps {
  onSuccess: () => void;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

export default function EmailFormCard({ onSuccess }: EmailFormCardProps) {
  const t = useTranslations('contact.form');
  const tProjectTypes = useTranslations('contact.projectTypes');
  const tBudget = useTranslations('contact.budgetOptions');
  const tCommon = useTranslations('common');

  // Form steps from translations
  const FORM_STEPS = [
    { id: 1, title: t('steps.1.title'), subtitle: t('steps.1.subtitle') },
    { id: 2, title: t('steps.2.title'), subtitle: t('steps.2.subtitle') },
    { id: 3, title: t('steps.3.title'), subtitle: t('steps.3.subtitle') },
  ];

  // Project types from translations
  const PROJECT_TYPES = [
    { value: "site-vitrine", label: tProjectTypes('site-vitrine') },
    { value: "projet-ambitieux", label: tProjectTypes('projet-ambitieux') },
    { value: "identite-digitale", label: tProjectTypes('identite-digitale') },
    { value: "autre", label: tProjectTypes('autre') },
  ];

  // Budget options from translations
  const BUDGET_OPTIONS = [
    { value: "a-definir", label: tBudget('a-definir') },
    { value: "less-500k", label: tBudget('less-500k') },
    { value: "500k-1m", label: tBudget('500k-1m') },
    { value: "1m-2m", label: tBudget('1m-2m') },
    { value: "more-2m", label: tBudget('more-2m') },
  ];

  // Loading messages from translations
  const LOADING_MESSAGES = t.raw('loading') as string[];

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [loadingMessage, setLoadingMessage] = useState<string>(LOADING_MESSAGES[0]);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [showHoverTooltip, setShowHoverTooltip] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const stepRefs = [step1Ref, step2Ref, step3Ref];

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate current step
  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (step === 1) {
      if (!formData.name || formData.name.length < 2) {
        newErrors.name = t('errors.fieldEmpty');
      }
      if (!formData.email) {
        newErrors.email = t('errors.fieldEmpty');
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = t('errors.emailInvalid');
      }
    }

    if (step === 2) {
      if (!formData.projectType) {
        newErrors.projectType = t('errors.fieldEmpty');
      }
    }

    if (step === 3) {
      if (!formData.message || formData.message.length < 10) {
        newErrors.message = t('errors.messageTooShort');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t]);

  // Handle step transition animation
  const animateStepTransition = useCallback((direction: "next" | "prev") => {
    const currentRef = stepRefs[currentStep - 1];
    const nextStepIndex = direction === "next" ? currentStep : currentStep - 2;
    const nextRef = stepRefs[nextStepIndex];

    if (!currentRef.current || !nextRef.current) return;

    const tl = gsap.timeline();

    // Animate current step out
    tl.to(currentRef.current, {
      opacity: 0,
      x: direction === "next" ? -50 : 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (currentRef.current) {
          currentRef.current.style.display = "none";
        }
      },
    });

    // Update step
    tl.add(() => {
      setCurrentStep((prev) => (direction === "next" ? prev + 1 : prev - 1));
    });

    // Animate next step in
    tl.add(() => {
      if (nextRef.current) {
        nextRef.current.style.display = "block";
        gsap.fromTo(
          nextRef.current,
          { opacity: 0, x: direction === "next" ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  }, [currentStep, stepRefs]);

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      animateStepTransition("next");
    }
  };

  // Handle previous step
  const handlePrev = () => {
    animateStepTransition("prev");
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setStatus("submitting");

    // Rotate loading messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[messageIndex]);
    }, 1500);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      clearInterval(messageInterval);

      if (response.ok) {
        setStatus("success");
        onSuccess();
      } else {
        setStatus("error");
      }
    } catch {
      clearInterval(messageInterval);
      setStatus("error");
    }
  };

  // Handle submit button hover (easter egg)
  const handleSubmitHoverStart = () => {
    hoverTimerRef.current = setInterval(() => {
      setHoverDuration((prev) => {
        if (prev >= 3) {
          setShowHoverTooltip(true);
          return prev;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const handleSubmitHoverEnd = () => {
    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
    }
    setHoverDuration(0);
    setShowHoverTooltip(false);
  };

  // Handle input changes
  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Initialize step visibility
  useEffect(() => {
    stepRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.display = index === 0 ? "block" : "none";
      }
    });
  }, []);

  // Cleanup hover timer
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearInterval(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="bento-card lg:col-span-2 lg:row-span-2">
      <div
        ref={formRef}
        className={cn(
          "relative h-full bg-[var(--theme-surface)] rounded-2xl p-6 md:p-8 lg:p-10",
          "border border-[var(--theme-text)]/5",
          "shadow-premium hover:shadow-premium-hover transition-all duration-300",
          "min-h-[500px] md:min-h-[550px]"
        )}
      >
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[var(--ace-gold)]/20 rounded-tl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[var(--ace-gold)]/20 rounded-br-lg" />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {FORM_STEPS.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors duration-300",
                  currentStep >= step.id
                    ? "text-[var(--ace-gold)]"
                    : "text-[var(--theme-text-muted)]"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                    "transition-all duration-300",
                    currentStep >= step.id
                      ? "bg-[var(--ace-gold)] text-[var(--ace-black)]"
                      : "bg-[var(--theme-text)]/10 text-[var(--theme-text-muted)]"
                  )}
                >
                  {currentStep > step.id ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </span>
                <span className="hidden md:inline">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-[var(--theme-text)]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--ace-gold)] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentStep - 1) / (FORM_STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Title */}
        <div className="mb-8 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-playfair)] text-[var(--theme-text)] mb-1">
            {FORM_STEPS[currentStep - 1].title}
          </h3>
          <p className="text-[var(--theme-text-muted)]">
            {FORM_STEPS[currentStep - 1].subtitle}
          </p>
        </div>

        {/* Form Steps */}
        <div className="relative min-h-[200px]">
          {/* Step 1: Name & Email */}
          <div ref={step1Ref} className="space-y-6">
            <FloatingInput
              label={t('fields.name')}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={t('placeholders.name')}
              error={errors.name}
              autoComplete="name"
            />
            <FloatingInput
              label={t('fields.email')}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={t('placeholders.email')}
              error={errors.email}
              autoComplete="email"
            />
          </div>

          {/* Step 2: Project Type & Budget */}
          <div ref={step2Ref} className="space-y-6">
            <FloatingSelect
              label={t('fields.projectType')}
              value={formData.projectType}
              onChange={(e) => handleChange("projectType", e.target.value)}
              options={[...PROJECT_TYPES]}
              error={errors.projectType}
            />
            <FloatingSelect
              label={t('fields.budget')}
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              options={[...BUDGET_OPTIONS]}
            />
          </div>

          {/* Step 3: Message */}
          <div ref={step3Ref} className="space-y-6">
            <FloatingTextarea
              label={t('fields.message')}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={t('placeholders.message')}
              error={errors.message}
              rows={5}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--theme-text)]/5">
          {/* Back Button */}
          <div>
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {tCommon('back')}
              </button>
            )}
          </div>

          {/* Next / Submit Button */}
          <div className="relative">
            {currentStep < 3 ? (
              <MagneticButton onClick={handleNext} variant="primary" size="md">
                {tCommon('continue')}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </MagneticButton>
            ) : (
              <div
                onMouseEnter={handleSubmitHoverStart}
                onMouseLeave={handleSubmitHoverEnd}
                className="relative"
              >
                <MagneticButton
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                  className={cn(
                    showHoverTooltip && "animate-shake"
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {loadingMessage}
                    </>
                  ) : (
                    <>
                      {tCommon('send')}
                      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </MagneticButton>

                {/* Hover tooltip easter egg */}
                {showHoverTooltip && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--ace-gold)] text-[var(--ace-black)] text-sm rounded-lg whitespace-nowrap animate-fade-in">
                    {t('hoverTooltip')}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--ace-gold)] rotate-45" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Error state */}
        {status === "error" && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
            {t('errorMessage')}
          </div>
        )}
      </div>
    </div>
  );
}
