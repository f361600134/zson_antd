import React, { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';

export const useThemeStyles = () => {
  const { themeConfig } = useThemeStore();

  const layoutStyles = useMemo(() => ({
    layout: {
      minHeight: '100vh',
      backgroundColor: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5'
    } as React.CSSProperties,

    sider: {
      backgroundColor: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
      borderRight: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`,
      ...(themeConfig.presetTheme === 'compact' && {
        background: 'linear-gradient(180deg, #FEFEFE 0%, #F8F9FA 100%)',
        borderRight: '1px solid #E5E7EB'
      }),
      ...(themeConfig.presetTheme === 'colorful' && {
        background: 'linear-gradient(180deg, #FAF9F7 0%, #F5F3F0 100%)',
        borderRight: '1px solid #E7E5E4'
      }),
    } as React.CSSProperties,

    header: {
      backgroundColor: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
      borderBottom: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`,
      padding: '0 24px',
      ...(themeConfig.presetTheme === 'compact' && {
        background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 50%, #F1F3F4 100%)',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 8px rgba(27, 77, 62, 0.06)'
      }),
      ...(themeConfig.presetTheme === 'colorful' && {
        background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 50%, #F0EDE8 100%)',
        borderBottom: '1px solid #E7E5E4',
        boxShadow: '0 2px 8px rgba(139, 90, 107, 0.06)'
      }),
    } as React.CSSProperties,

    content: {
      backgroundColor: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5',
      padding: '24px',
      ...(themeConfig.presetTheme === 'compact' && {
        background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 100%)',
        position: 'relative'
      }),
      ...(themeConfig.presetTheme === 'colorful' && {
        background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 100%)',
        position: 'relative'
      }),
    } as React.CSSProperties
  }), [themeConfig]);

  return {
    layoutStyles,
    themeConfig
  };
};
