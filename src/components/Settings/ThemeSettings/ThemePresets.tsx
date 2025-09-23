import React from 'react';
import { Row, Col, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import type { ThemePreset } from '../../../types';
import {
  DefaultThemePreview,
  DarkThemePreview,
  CompactThemePreview,
  ColorfulThemePreview,
  LuxuryThemePreview
} from './PreviewComponents';

const { Text } = Typography;

const ThemePresets: React.FC = () => {
  const { themeConfig, applyPresetTheme } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const presetThemes: ThemePreset[] = [
    { 
      key: 'default', 
      name: t('defaultTheme'), 
      bgColor: '#f0f5ff', 
      borderColor: '#1677ff',
      preview: <DefaultThemePreview />
    },
    { 
      key: 'dark', 
      name: t('darkTheme'), 
      bgColor: '#2f2f2f', 
      borderColor: '#434343',
      preview: <DarkThemePreview />
    },
    { 
      key: 'compact', 
      name: t('compactTheme'), 
      bgColor: '#e6f7ff', 
      borderColor: '#1890ff',
      preview: <CompactThemePreview />
    },
    { 
      key: 'colorful', 
      name: '浪漫',
      bgColor: '#FAF9F7', 
      borderColor: '#8B5A6B',
      preview: <ColorfulThemePreview />
    },
    { 
      key: 'luxury', 
      name: '黑金',
      bgColor: '#1F1F1F', 
      borderColor: '#FFD700',
      preview: <LuxuryThemePreview />
    }
  ];

  const handlePresetSelect = (themeKey: string) => {
    applyPresetTheme(themeKey);
  };

  // 获取当前主色调
  const getCurrentPrimaryColor = () => {
    switch (themeConfig.presetTheme) {
      case 'compact':
        return '#52c41a';
      case 'colorful':
        return '#eb2f96';
      case 'luxury':
        return '#FFD700';
      default:
        return themeConfig.colorPrimary;
    }
  };

  const primaryColor = getCurrentPrimaryColor();

  // 动态样式
  const getCardStyle = (isSelected: boolean) => ({
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `2px solid ${isSelected ? primaryColor : 'transparent'}`,
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: isSelected ? `0 0 0 3px ${primaryColor}20` : 'none',
    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
  });

  const getCheckIconStyle = () => ({
    position: 'absolute' as const,
    top: '4px',
    right: '4px',
    width: '16px',
    height: '16px',
    backgroundColor: primaryColor,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '10px',
  });

  return (
    <div style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        {presetThemes.map((theme) => {
          const isSelected = themeConfig.presetTheme === theme.key;
          return (
            <Col key={theme.key}>
              <div
                style={getCardStyle(isSelected)}
                onClick={() => handlePresetSelect(theme.key)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div 
                  className="theme-preview-box"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  {theme.preview}
                </div>
                {isSelected && (
                  <div style={getCheckIconStyle()}>
                    <CheckOutlined />
                  </div>
                )}
                <Text style={{ 
                  fontSize: '12px', 
                  color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666',
                  display: 'block',
                  marginTop: '4px'
                }}>
                  {theme.name}
                </Text>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ThemePresets;
