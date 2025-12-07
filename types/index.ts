// ACE STUDIO - Type Definitions

export interface NavigationItem {
  name: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ComparisonItem {
  template: string;
  aceStudio: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  imageSrc: string;
  href: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  avatar?: string;
}

// Component Props Types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  className?: string;
}

export interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "none";
  delay?: number;
}

// Animation Types
export type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "none";

export interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
}

// Hook Return Types
export interface UseTimeReturn {
  hours: number;
  minutes: number;
  formatted: string;
  greeting: string;
}

export interface UseScrollReturn {
  scrollY: number;
  isScrolled: boolean;
  scrollDirection: "up" | "down" | null;
}

export interface UseCounterReturn {
  count: number;
  ref: React.RefObject<HTMLElement>;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export interface ContactFormStep {
  id: number;
  title: string;
  subtitle: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";
