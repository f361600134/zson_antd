import React from 'react';
import { Typography } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import UserSettings from './UserSettings';

const { Text } = Typography;

const GeneralSettings: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const labelStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '16px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <Text style={labelStyle}>
        <ControlOutlined style={{ marginRight: '8px' }} />
        {t('generalSettings')}
      </Text>
      
      <div style={{ margin: '12px 0 20px 0' }} />
      
      <UserSettings />
    </div>
  );
};

export default GeneralSettings;
