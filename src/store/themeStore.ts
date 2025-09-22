import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeConfig {
  colorPrimary: string;
  borderRadius: number;
  compactMode: boolean;
  themeMode: 'light' | 'dark';
  presetTheme: 'default' | 'dark' | 'compact' | 'colorful';
  language: 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR';
  allowUserRegistration: boolean;
  defaultUserStatus: 'active' | 'inactive' | 'pending';
}

interface ThemeState {
  themeConfig: ThemeConfig;
  setThemeConfig: (config: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  applyPresetTheme: (preset: string) => void;
}

const defaultTheme: ThemeConfig = {
  colorPrimary: '#1677ff',
  borderRadius: 6,
  compactMode: false,
  themeMode: 'light',
  presetTheme: 'default',
  language: 'zh-CN',
  allowUserRegistration: true,
  defaultUserStatus: 'inactive'
};

const presetThemes = {
  default: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    compactMode: false,
    themeMode: 'light' as const,
    presetTheme: 'default' as const,
    language: 'zh-CN' as const,
    allowUserRegistration: true,
    defaultUserStatus: 'inactive' as const
  },
  dark: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    compactMode: false,
    themeMode: 'dark' as const,
    presetTheme: 'dark' as const,
    language: 'zh-CN' as const,
    allowUserRegistration: true,
    defaultUserStatus: 'inactive' as const
  },
  compact: {
    colorPrimary: '#52c41a',
    borderRadius: 4,
    compactMode: true,
    themeMode: 'light' as const,
    presetTheme: 'compact' as const,
    language: 'zh-CN' as const,
    allowUserRegistration: true,
    defaultUserStatus: 'inactive' as const
  },
  colorful: {
    colorPrimary: '#eb2f96',
    borderRadius: 8,
    compactMode: false,
    themeMode: 'light' as const,
    presetTheme: 'colorful' as const,
    language: 'zh-CN' as const,
    allowUserRegistration: true,
    defaultUserStatus: 'inactive' as const
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeConfig: defaultTheme,
      setThemeConfig: (config) =>
        set((state) => ({
          themeConfig: { ...state.themeConfig, ...config }
        })),
      resetTheme: () => set({ themeConfig: defaultTheme }),
      applyPresetTheme: (preset) => {
        const presetConfig = presetThemes[preset as keyof typeof presetThemes];
        if (presetConfig) {
          set({ themeConfig: presetConfig });
        }
      }
    }),
    {
      name: 'theme-storage'
    }
  )
);