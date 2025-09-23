import React from 'react';
import { Input, Flex, Typography } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks';
import { useThemePresetStyles } from '../../../hooks';
import { COLOR_PRESETS } from '../../../config/settings';

const { Text } = Typography;

const ColorPicker: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const settingsStyles = useSettingsStyles();
  const {
    getColorCircleStyle,
    handleCircleHover,
    handleCircleLeave,
  } = useThemePresetStyles();

  return (
    <div style={settingsStyles.container.control}>
      <Flex align="center" gap={12} style={settingsStyles.container.row}>
        <Text style={settingsStyles.text.label}>
          {t('primaryColor')}：
        </Text>
        
        <Input 
          value={themeConfig.colorPrimary}
          onChange={(e) => setThemeConfig({ colorPrimary: e.target.value })}
          style={settingsStyles.form.input}
          size="middle"
        />
        
        <div style={settingsStyles.grid.colorPalette}>
          {COLOR_PRESETS.map(({ color, name }) => {
            const isSelected = themeConfig.colorPrimary === color;
            return (
              <div
                key={color}
                style={getColorCircleStyle(color, isSelected)}
                onClick={() => setThemeConfig({ colorPrimary: color })}
                onMouseEnter={(e) => handleCircleHover(e.currentTarget, isSelected)}
                onMouseLeave={(e) => handleCircleLeave(e.currentTarget, isSelected)}
                title={name}
              />
            );
          })}
        </div>
      </Flex>
    </div>
  );
};

export default ColorPicker;
