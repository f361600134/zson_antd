import React from 'react';
import { Switch, Select, Flex, Typography } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { USER_STATUS_OPTIONS, THEME_CONFIG } from '../../../config/settings';
import SettingItem from "../ThemeSettings/SettingItem.tsx";

const { Text } = Typography;

const UserSettings: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '12px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  return (
    <div>
      <SettingItem
          label={t('allowUserRegistration')}
          control={
            <Switch
                checked={themeConfig.allowUserRegistration}
                onChange={(checked) => setThemeConfig({ allowUserRegistration: checked })}
            />
          }
      />
      
      <div>
        <Flex justify="space-between" align="center">
          <Text style={labelStyle}>{t('defaultUserStatus')}：</Text>
          <Select
            value={themeConfig.defaultUserStatus}
            onChange={(value) => setThemeConfig({ defaultUserStatus: value })}
            style={{ width: THEME_CONFIG.STATUS_SELECT_WIDTH }}
          >
            {USER_STATUS_OPTIONS.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {t(option.labelKey)}
              </Select.Option>
            ))}
          </Select>
        </Flex>
      </div>
    </div>
  );
};

export default UserSettings;
