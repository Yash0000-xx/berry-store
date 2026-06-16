import { create } from 'zustand';

export type ProductTheme = 'purple' | 'orange' | 'teal';

interface ThemeState {
  activeTheme: ProductTheme;
  setTheme: (theme: ProductTheme) => void;
  getThemeColors: () => {
    accentClass: string;
    glowHex: string;
    borderClass: string;
    textClass: string;
  };
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  activeTheme: 'purple',
  setTheme: (theme) => set({ activeTheme: theme }),
  getThemeColors: () => {
    const theme = get().activeTheme;
    switch (theme) {
      case 'orange':
        return {
          accentClass: 'bg-orange-500',
          glowHex: 'hsla(24, 95%, 53%, 0.14)',
          borderClass: 'border-orange-500/20',
          textClass: 'text-orange-400',
        };
      case 'teal':
        return {
          accentClass: 'bg-cyan-500',
          glowHex: 'hsla(188, 86%, 53%, 0.12)',
          borderClass: 'border-cyan-500/20',
          textClass: 'text-cyan-400',
        };
      case 'purple':
      default:
        return {
          accentClass: 'bg-accent',
          glowHex: 'hsl(275 60% 46% / 0.18)',
          borderClass: 'border-accent/20',
          textClass: 'text-accent',
        };
    }
  },
}));