/**
 * ACE STUDIO - Centralized Theme Configuration
 *
 * This file contains all color, spacing, and design token definitions.
 * Use this as the single source of truth for theming.
 */

export const theme = {
  colors: {
    // Base colors
    black: '#0A0A0A',
    white: '#FFFFFF',
    offWhite: '#F5F5F5',
    cream: '#F8F6F3',
    creamRich: '#F5F2ED',

    // Accent (gold)
    gold: '#C9A050',
    goldLight: '#D4B36A',
    goldDark: '#B8923F',

    // Text colors
    gray: '#6B6B6B',
    warmGray: '#8A8A8A',

    // Dark mode variants
    dark: {
      background: '#0A0A0A',
      backgroundAlt: '#141414',
      surface: '#1A1A1A',
      surfaceHover: '#242424',
      text: '#F5F5F5',
      textMuted: '#A0A0A0',
      // Gold is slightly brighter in dark mode for contrast
      gold: '#D4B36A',
      goldLight: '#E0C080',
    },

    // Light mode (explicit for reference)
    light: {
      background: '#FFFFFF',
      backgroundAlt: '#F5F5F5',
      surface: '#FFFFFF',
      surfaceHover: '#F8F6F3',
      text: '#0A0A0A',
      textMuted: '#6B6B6B',
      gold: '#C9A050',
      goldLight: '#D4B36A',
    }
  },

  // Standardized opacity levels
  opacity: {
    subtle: 0.03,
    light: 0.08,
    medium: 0.15,
    strong: 0.25,
    visible: 0.40,
    prominent: 0.60,
  },

  // Decorative element sizes
  decorative: {
    glowCircle: {
      sm: 300,
      md: 500,
      lg: 700,
      xl: 900,
    },
    borderWidth: {
      thin: 1,
      medium: 2,
      thick: 3,
    },
    cornerSize: 60,
    lineWidth: {
      sm: 96,
      md: 128,
      lg: 160,
    },
  },

  // Animation timing
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    verySlow: '800ms',
  },

  // Spacing (matches Tailwind defaults)
  spacing: {
    section: {
      sm: '4rem',    // py-16
      md: '6rem',    // py-24
      lg: '8rem',    // py-32
    },
  },

  // Shadows
  shadows: {
    card: '0 1px 3px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.04)',
    cardHover: '0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
    gold: '0 4px 20px rgba(201, 160, 80, 0.15)',
    goldStrong: '0 8px 30px rgba(201, 160, 80, 0.25)',
  },

  // Blur values
  blur: {
    sm: '8px',
    md: '20px',
    lg: '40px',
    xl: '60px',
  },
} as const;

// Type exports
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeOpacity = typeof theme.opacity;

// Helper to get CSS variable value
export const cssVar = (name: string) => `var(--${name})`;

// Helper to get theme color with opacity
export const withOpacity = (color: string, opacity: number) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Default export
export default theme;
