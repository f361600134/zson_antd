import type { LanguageOption } from '../types/settings';

export const COLOR_PRESETS = [
  '#1677ff', '#722ed1', '#eb2f96', '#f5222d',
  '#fa541c', '#faad14', '#52c41a', '#13c2c2'
] as const;

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { value: 'ko-KR', label: '한국어', flag: '🇰🇷' }
];

export const USER_STATUS_VALUES = ['active', 'inactive', 'pending'] as const;
