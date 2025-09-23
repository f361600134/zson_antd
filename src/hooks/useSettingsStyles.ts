import { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';

/**
 * 设置面板通用样式 hook
 */
export const useSettingsStyles = () => {
  const { themeConfig } = useThemeStore();

  const styles = useMemo(() => ({
    // 文本样式
    text: {
      sectionTitle: {
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '16px',
        color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
        display: 'flex',
        alignItems: 'center',
      } as React.CSSProperties,

      label: {
        fontSize: '14px',
        fontWeight: 500,
        color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
        minWidth: '80px',
        marginRight: '12px',
      } as React.CSSProperties,

      description: {
        fontSize: '12px',
        color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666',
        lineHeight: '1.4',
        marginTop: '4px',
      } as React.CSSProperties,

      subtitle: {
        fontSize: '16px',
        fontWeight: 500,
        color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
        marginBottom: '12px',
      } as React.CSSProperties,
    },

    // 容器样式
    container: {
      section: {
        marginBottom: '32px',
        padding: '20px',
        backgroundColor: themeConfig.themeMode === 'dark' ? '#1f1f1f' : '#ffffff',
        borderRadius: '8px',
        border: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`,
      } as React.CSSProperties,

      group: {
        marginBottom: '24px',
      } as React.CSSProperties,

      control: {
        marginBottom: '16px',
      } as React.CSSProperties,

      row: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        flexWrap: 'wrap' as const,
        gap: '12px',
      } as React.CSSProperties,

      divider: {
        margin: '20px 0',
        borderColor: themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb',
      } as React.CSSProperties,
    },

    // 表单控件样式
    form: {
      input: {
        width: '96px',
      } as React.CSSProperties,

      slider: {
        width: '200px',
        marginLeft: '12px',
      } as React.CSSProperties,

      select: {
        width: '150px',
      } as React.CSSProperties,

      switch: {
        marginLeft: '8px',
      } as React.CSSProperties,
    },

    // 预览样式
    preview: {
      container: {
        padding: '16px',
        backgroundColor: themeConfig.themeMode === 'dark' ? '#141414' : '#f5f5f5',
        borderRadius: '6px',
        border: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#d9d9d9'}`,
        marginTop: '16px',
      } as React.CSSProperties,

      title: {
        fontSize: '14px',
        fontWeight: 500,
        color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
        marginBottom: '12px',
      } as React.CSSProperties,
    },

    // 网格布局
    grid: {
      themePresets: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '16px',
        marginBottom: '20px',
      } as React.CSSProperties,

      colorPalette: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '8px',
        marginLeft: '12px',
      } as React.CSSProperties,
    },

    // 动画和过渡
    transition: {
      default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fast: 'all 0.2s ease',
      smooth: 'all 0.3s ease',
    },

    // 阴影
    shadow: {
      light: '0 2px 8px rgba(0, 0, 0, 0.1)',
      medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
      heavy: '0 8px 25px rgba(0, 0, 0, 0.15)',
      glow: (color: string, opacity = 0.2) => `0 0 0 3px ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    },
  }), [themeConfig.themeMode]);

  return styles;
};

/**
 * 获取响应式断点样式
 */
export const useResponsiveStyles = () => {
  return useMemo(() => ({
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',

    // 响应式容器
    container: {
      maxWidth: '100%',
      '@media (min-width: 768px)': {
        maxWidth: '720px',
      },
      '@media (min-width: 1024px)': {
        maxWidth: '960px',
      },
    },
  }), []);
};
