import { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';

export const useSettingsStyles = () => {
  const { themeConfig } = useThemeStore();

  const styles = useMemo(() => ({
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 500,
      marginBottom: '16px',
      color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
    } as React.CSSProperties,

    label: {
      fontSize: '16px',
      fontWeight: 500,
      marginBottom: '12px',
      color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
    } as React.CSSProperties,

    description: {
      fontSize: '12px',
      color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666'
    } as React.CSSProperties,

    sectionContainer: {
      marginBottom: '24px'
    } as React.CSSProperties,

    controlContainer: {
      marginBottom: '20px'
    } as React.CSSProperties,

    flexRow: {
      marginBottom: '16px'
    } as React.CSSProperties
  }), [themeConfig.themeMode]);

  return styles;
};
