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

  // 获取当前主色调
  const getCurrentPrimaryColor = () => {
    switch (themeConfig.presetTheme) {
      case 'compact':
        return '#52c41a';
      case 'colorful':
        return '#eb2f96';
      case 'luxury':
        return '#FFD700';
      default:
        return themeConfig.colorPrimary;
    }
  };

  const primaryColor = getCurrentPrimaryColor();

  // 动态颜色圆圈样式
  const getColorCircleStyle = (color: string, isSelected: boolean) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '2px solid #fff',
    backgroundColor: color,
    boxShadow: isSelected 
      ? `0 0 0 2px #fff, 0 0 0 4px ${primaryColor}` 
      : '0 2px 4px rgba(0, 0, 0, 0.1)',
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
  });

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
        
        {COLOR_PRESETS.map(({ color, name }) => {
          const isSelected = themeConfig.colorPrimary === color;
          return (
            <div
              key={color}
              style={getColorCircleStyle(color, isSelected)}
              onClick={() => setThemeConfig({ colorPrimary: color })}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }
              }}
              title={name}
            />
          );
        })}
      </Flex>
    </div>
  );
};

export default ColorPicker;
