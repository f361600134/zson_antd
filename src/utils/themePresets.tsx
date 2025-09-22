import React from 'react';
import type { ThemePreset } from '../types/settings';

export const createThemePreview = (previewConfig: {
  gradient: string;
  headerGradient: string;
  accent?: string;
  border?: string;
  elements?: React.ReactNode[];
}) => {
  const { gradient, headerGradient, accent, border = '#e5e7eb', elements = [] } = previewConfig;
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: gradient,
      borderRadius: '6px',
      border: `1px solid ${border}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '12px',
        background: headerGradient,
        borderRadius: '6px 6px 0 0'
      }} />
      
      {/* Default content elements */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '6px',
        width: '20px',
        height: '3px',
        backgroundColor: accent || '#1677ff',
        borderRadius: '1px',
        opacity: 0.8
      }} />
      
      <div style={{
        position: 'absolute',
        top: '22px',
        left: '6px',
        width: '14px',
        height: '3px',
        backgroundColor: accent ? `${accent}80` : '#91caff',
        borderRadius: '1px'
      }} />
      
      {/* Custom elements */}
      {elements.map((element, index) => (
        <React.Fragment key={index}>{element}</React.Fragment>
      ))}
    </div>
  );
};

export const generateThemePresets = (t: (key: string) => string): ThemePreset[] => [
  {
    key: 'default',
    name: t('defaultTheme'),
    bgColor: '#f0f5ff',
    borderColor: '#1677ff',
    preview: createThemePreview({
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%)',
      headerGradient: 'linear-gradient(90deg, #1677ff 0%, #69b1ff 100%)',
      accent: '#1677ff',
      elements: [
        <div key="sidebar" style={{
          position: 'absolute',
          right: '6px',
          top: '16px',
          width: '12px',
          height: '16px',
          backgroundColor: '#f0f5ff',
          borderRadius: '2px',
          border: '1px solid #d6e4ff'
        }} />
      ]
    })
  },
  {
    key: 'dark',
    name: t('darkTheme'),
    bgColor: '#2f2f2f',
    borderColor: '#434343',
    preview: createThemePreview({
      gradient: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
      headerGradient: 'linear-gradient(90deg, #434343 0%, #595959 100%)',
      accent: '#8c8c8c',
      elements: [
        <div key="sidebar" style={{
          position: 'absolute',
          right: '6px',
          top: '16px',
          width: '12px',
          height: '16px',
          backgroundColor: '#2f2f2f',
          borderRadius: '2px',
          border: '1px solid #434343'
        }} />,
        <div key="accent" style={{
          position: 'absolute',
          bottom: '6px',
          left: '6px',
          width: '4px',
          height: '4px',
          backgroundColor: '#1677ff',
          borderRadius: '50%',
          boxShadow: '0 0 4px rgba(22, 119, 255, 0.5)'
        }} />
      ]
    })
  },
  // 可以继续添加其他主题预设...
];
