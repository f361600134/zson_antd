import type { LanguageOption, ColorPreset } from '../types';

export const COLOR_PRESETS: ColorPreset[] = [
  { color: '#1677ff', name: 'Blue' },
  { color: '#722ed1', name: 'Purple' },
  { color: '#eb2f96', name: 'Pink' },
  { color: '#f5222d', name: 'Red' },
  { color: '#fa541c', name: 'Orange' },
  { color: '#faad14', name: 'Yellow' },
  { color: '#52c41a', name: 'Green' },
  { color: '#13c2c2', name: 'Cyan' }
];

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { value: 'ko-KR', label: '한국어', flag: '🇰🇷' }
];

export const USER_STATUS_OPTIONS = [
  { value: 'active' as const, labelKey: 'statusActive' },
  { value: 'inactive' as const, labelKey: 'statusInactive' },
  { value: 'pending' as const, labelKey: 'statusPending' }
];

export const THEME_CONFIG = {
  BORDER_RADIUS: {
    MIN: 0,
    MAX: 16,
    DEFAULT: 6
  },
  SLIDER_WIDTH: 256,
  COLOR_INPUT_WIDTH: 96,
  LANGUAGE_SELECT_WIDTH: 200,
  STATUS_SELECT_WIDTH: 150
};
