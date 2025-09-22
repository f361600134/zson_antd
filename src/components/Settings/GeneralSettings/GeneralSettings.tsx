import React from 'react';
import { Typography } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import UserSettings from './UserSettings';
import {useSettingsStyles} from "../../../hooks";

const { Text } = Typography;

const GeneralSettings: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    <div style={{ marginBottom: '24px' }}>
      <Text style={styles.label}>
        <ControlOutlined style={{ marginRight: '8px' }} />
        {t('generalSettings')}
      </Text>
      
      <div style={{ margin: '12px 0 20px 0' }} />
      
      <UserSettings />
    </div>
  );
};

export default GeneralSettings;
