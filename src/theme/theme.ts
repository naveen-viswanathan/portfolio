/**
 * Centralized Theme Suite
 *
 * Edit colors here to customize the portfolio theme across the entire application.
 * All glows, box-shadows, borders, text accents, and animations derive from these values.
 */

// Helper to convert hex to rgba with customizable opacity
export function hexToRgba(hex: string, alpha: number): string {
  let cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 8) {
    cleanHex = cleanHex.slice(0, 6);
  }
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const THEME_CONFIG = {
  dark: {
    // Primary brand / accent color in Dark Mode (e.g. Terminal Neon Green)
    accent: "#00c2f7ff",
    // Secondary tone for subtle gradients (e.g. Logo mark)
    accentSecondary: "#3c10eeff",
    // Background tones
    bgBase: "#121212",
    bgCard: "#181818",
    bgSidebar: "#0a0a0a",
  },
  light: {
    // Primary brand / accent color in Light Mode (e.g. Crimson Red)
    accent: "rgb(247, 47, 64)",
    // Secondary tone for subtle gradients (e.g. Logo mark)
    accentSecondary: "#e27272",
    // Background tones
    bgBase: "#F2F2F2",
    bgCard: "#ffffff",
    bgSidebar: "#ffffff",
  },
} as const;

export type ThemeMode = "dark" | "light";

export function getTheme(mode: string | ThemeMode) {
  const currentMode: ThemeMode = mode === "dark" ? "dark" : "light";
  const colors = THEME_CONFIG[currentMode];

  return {
    mode: currentMode,
    accent: colors.accent,
    accentSecondary: colors.accentSecondary,
    bgBase: colors.bgBase,
    bgCard: colors.bgCard,
    bgSidebar: colors.bgSidebar,
    glow: {
      avatar: hexToRgba(colors.accent, currentMode === "dark" ? 0.15 : 0.6),
      card: hexToRgba(colors.accent, currentMode === "dark" ? 0.08 : 0.12),
      cursor: hexToRgba(colors.accent, 0.5),
      timeline: hexToRgba(colors.accent, 0.3),
      divider: hexToRgba(colors.accent, 1),
    },
    rgba: (alpha: number) => hexToRgba(colors.accent, alpha),
  };
}
