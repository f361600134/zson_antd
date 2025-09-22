import React from 'react';
import { Input, Flex, Typography } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks';
import { COLOR_PRESETS, THEME_CONFIG } from '../../../config/settings';

const { Text } = Typography;

const ColorPicker: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    <div style={styles.controlContainer}>
      <Flex align="center" gap={12} style={styles.flexRow}>
        <Text style={styles.label}>{t('primaryColor')}：</Text>
        <Input 
          value={themeConfig.colorPrimary}
          onChange={(e) => setThemeConfig({ colorPrimary: e.target.value })}
          style={{ width: THEME_CONFIG.COLOR_INPUT_WIDTH }}
          size="middle"
        />
        
        {COLOR_PRESETS.map(({ color, name }) => (
          <div
            key={color}
            className={`color-preset-circle ${themeConfig.colorPrimary === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setThemeConfig({ colorPrimary: color })}
            title={name}
          />
        ))}
      </Flex>
    </div>
  );
};

export default ColorPicker;
