import React from 'react';
import { Typography } from 'antd';
import { ControlOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import {useSettingsStyles} from '../../../hooks';
import UserSettings from './UserSettings';

const { Text } = Typography;

const GeneralSettings: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();
  return (
    // <div style={styles.container.section}>
    <div>
      {/* 标题 */}
      <Text style={styles.text.sectionTitle}>
        <ControlOutlined style={{ marginRight: '8px' }} />
        {t('generalSettings')}
      </Text>
      
      {/* 用户设置 */}
      <div style={styles.container.group}>
        <UserSettings />
      </div>
    </div>
  );
};

export default GeneralSettings;
