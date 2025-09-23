import React from 'react';
import {Select, Flex, Typography} from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { LANGUAGE_OPTIONS, THEME_CONFIG } from '../../../config/settings';
import {useSettingsStyles} from "../../../hooks";
const { Text } = Typography;

const LanguageSettings: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    <div style={{ marginBottom: '24px' }}>
        <Flex justify="space-between" align="center">
            <Text style={styles.label}>
                <GlobalOutlined style={{ marginRight: '8px' }} />
                {t('languageSettings')}
            </Text>
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
        <Text style={styles.description}>
          {t('languageDescription')}
        </Text>
    </div>
  );
};

export default LanguageSettings;
