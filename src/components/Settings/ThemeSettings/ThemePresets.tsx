import React from 'react';
import { Row, Col, Typography } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import type { ThemePreset } from '../../../types/settings';
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

  return (
    <div style={{ marginBottom: '20px' }}>
      <Row gutter={16}>
        {presetThemes.map((theme) => (
          <Col key={theme.key}>
            <div
              className={`theme-preset-card ${themeConfig.presetTheme === theme.key ? 'selected' : ''}`}
              onClick={() => handlePresetSelect(theme.key)}
            >
              <div 
                className="theme-preview-box"
                style={{ backgroundColor: theme.bgColor }}
              >
                {theme.preview}
              </div>
              <Text style={{ fontSize: '12px', color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666' }}>
                {theme.name}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ThemePresets;
