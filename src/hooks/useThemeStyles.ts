import { useMemo } from 'react';
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
      ...(themeConfig.presetTheme === 'luxury' && {
        background: 'linear-gradient(180deg, #1F1F1F 0%, #121212 100%)',
        borderRight: '1px solid #333333',
        boxShadow: 'inset 1px 0 0 rgba(255, 215, 0, 0.1)'
      })
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
      ...(themeConfig.presetTheme === 'luxury' && {
        background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 50%, #1A1A1A 100%)',
        borderBottom: '1px solid #333333',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1)'
      })
    } as React.CSSProperties,

    content: {
      position: 'relative',
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
      ...(themeConfig.presetTheme === 'luxury' && {
        background: 'linear-gradient(135deg, #121212 0%, #1A1A1A 100%)',
        position: 'relative'
      })
    } as React.CSSProperties
  }), [themeConfig]);

  // const textStyles = {
  //   title: {
  //     fontSize: '18px',
  //     fontWeight: 600,
  //     margin: 0,
  //     color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  //   },
  //   description: {
  //     fontSize: '14px',
  //     margin: 0,
  //     lineHeight: '18px',
  //     color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#4b5563'
  //   },
  //   // 其他通用文本样式
  // };

  return {
    layoutStyles,
    themeConfig
  };
};
