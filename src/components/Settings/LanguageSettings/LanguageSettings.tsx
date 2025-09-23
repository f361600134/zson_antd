import React from 'react';
import { Select, Flex, Typography } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks/useSettingsStyles';
import { LANGUAGE_OPTIONS } from '../../../config/settings';

const { Text } = Typography;

const LanguageSettings: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    // <div style={styles.container.section}>
    <div>
      {/* 标题 */}
      <Text style={styles.text.sectionTitle}>
        <GlobalOutlined style={{ marginRight: '8px' }} />
        {t('languageSettings')}
      </Text>
      
      {/* 语言选择器 */}
      <div style={styles.container.control}>
      <Flex justify="space-between" align="center">
          <Text style={styles.text.label}>
            {t('language') || '语言'}：
          </Text>
          
          <Select
            value={themeConfig.language}
            onChange={(value) => setThemeConfig({ language: value })}
            style={styles.form.select}
            size="middle"
          >
            {LANGUAGE_OPTIONS.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.flag} {option.label}
              </Select.Option>
            ))}
          </Select>
        </Flex>
        
        <Text style={styles.text.description}>
          {t('languageDescription')}
        </Text>
      </div>
    </div>
  );
};

export default LanguageSettings;
