import React from 'react';
import { Row, Col, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useThemePresetStyles } from '../../../hooks/useThemePresetStyles';
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
  const {
    styles,
    getThemeCardStyle,
    handleCardHover,
    handleCardLeave,
  } = useThemePresetStyles();

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

  return (
    <div style={styles.container.presetGrid}>
      <Row gutter={16}>
        {presetThemes.map((theme) => {
          const isSelected = themeConfig.presetTheme === theme.key;
          return (
            <Col key={theme.key}>
              <div
                style={getThemeCardStyle(isSelected)}
                onClick={() => handlePresetSelect(theme.key)}
                onMouseEnter={(e) => handleCardHover(e.currentTarget, isSelected)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget, isSelected)}
              >
                <div 
                  className="theme-preview-box"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  {theme.preview}
                </div>
                
                {isSelected && (
                  <div style={styles.checkIcon}>
                    <CheckOutlined />
                  </div>
                )}
                
                <Text style={styles.themeName}>
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
