import React from 'react';
import { Input, Flex, Typography, Slider, Radio } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { THEME_CONFIG } from '../../../config/settings';

const { Text } = Typography;

const ThemeControls: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '12px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  return (
    <>
      {/* 圆角设置 */}
      <div style={{ marginBottom: '20px' }}>
        <Flex align="center" gap={12} style={{ marginBottom: '16px' }}>
          <Text style={labelStyle}>{t('borderRadius')}：</Text>
          <Input 
            value={`${themeConfig.borderRadius}px`}
            style={{ width: '64px' }}
            size="middle"
            readOnly
          />
          
          <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
            <Slider
              min={THEME_CONFIG.BORDER_RADIUS.MIN}
              max={THEME_CONFIG.BORDER_RADIUS.MAX}
              value={themeConfig.borderRadius}
              onChange={(value) => setThemeConfig({ borderRadius: value })}
              tooltip={{ formatter: (value) => `${value}px` }}
              style={{ width: THEME_CONFIG.SLIDER_WIDTH }}
            />
          </div>
        </Flex>
      </div>

      {/* 宽松度设置 */}
      <div style={{ marginBottom: '20px' }}>
        <Text style={labelStyle}>{t('spacing')}：</Text>
        <Radio.Group
          value={themeConfig.compactMode ? 'compact' : 'default'}
          onChange={(e) => setThemeConfig({ compactMode: e.target.value === 'compact' })}
        >
          <Radio value="default">{t('default')}</Radio>
          <Radio value="compact">{t('compact')}</Radio>
        </Radio.Group>
      </div>
    </>
  );
};

export default ThemeControls;
