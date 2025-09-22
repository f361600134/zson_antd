import React from 'react';
import { Select, Flex, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { LANGUAGE_OPTIONS, THEME_CONFIG } from '../../../config/settings';

const { Text } = Typography;

const LanguageSettings: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const labelStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '16px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '12px',
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666'
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <Text style={labelStyle}>
        <GlobalOutlined style={{ marginRight: '8px' }} />
        {t('languageSettings')}
      </Text>
      
      <div style={{ marginBottom: '12px' }}>
        <Flex justify="space-between" align="center">
          <Select
            value={themeConfig.language}
            onChange={(value) => setThemeConfig({ language: value })}
            style={{ width: THEME_CONFIG.LANGUAGE_SELECT_WIDTH }}
          >
            {LANGUAGE_OPTIONS.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.flag} {option.label}
              </Select.Option>
            ))}
          </Select>
        </Flex>
      </div>
      
      <Text style={descriptionStyle}>
        {t('languageDescription')}
      </Text>
    </div>
  );
};

export default LanguageSettings;
