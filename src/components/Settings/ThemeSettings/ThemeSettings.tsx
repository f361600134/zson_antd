import React from 'react';
import { Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks';
import ThemePresets from './ThemePresets';
import ColorPicker from './ColorPicker';
import ThemeControls from './ThemeControls';
const { Text } = Typography;

const ThemeSettings: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    <div>
      {/* 标题 */}
      <Text style={styles.text.sectionTitle}>
        <SettingOutlined style={{ marginRight: '8px' }} />
        {t('themeSettings')}
      </Text>
      <div style={{ margin: '12px 0 20px 0' }} />

      {/* 主题预设 */}
      <ThemePresets />
      {/* 主色调选择 */}
      <ColorPicker />
      {/* 主题控制 */}
      <ThemeControls />
    </div>
  );
};

export default ThemeSettings;
