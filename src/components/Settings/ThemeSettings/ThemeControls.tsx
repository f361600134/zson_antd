import React from 'react';
import { Input, Flex, Typography, Slider, Radio } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks/useSettingsStyles';
import { THEME_CONFIG } from '../../../config/settings';

const { Text } = Typography;

const ThemeControls: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const styles = useSettingsStyles();

  return (
    <>
      {/* 圆角设置 */}
      <div style={styles.container.control}>
        <Flex align="center" gap={12} style={styles.container.row}>
          <Text style={styles.text.label}>
            {t('borderRadius')}：
          </Text>
          
          <Input 
            value={`${themeConfig.borderRadius}px`}
            style={{ width: '64px' }}
            size="middle"
            readOnly
          />
          
          <Slider
            min={THEME_CONFIG.BORDER_RADIUS.MIN}
            max={THEME_CONFIG.BORDER_RADIUS.MAX}
            value={themeConfig.borderRadius}
            onChange={(value) => setThemeConfig({ borderRadius: value })}
            tooltip={{ formatter: (value) => `${value}px` }}
            style={styles.form.slider}
          />
        </Flex>
      </div>

      {/* 宽松度设置 */}
      <div style={styles.container.control}>
        <Flex align="center" gap={12} style={styles.container.row}>
          <Text style={styles.text.label}>
            {t('spacing')}：
          </Text>
          
          <Radio.Group
            value={themeConfig.compactMode ? 'compact' : 'default'}
            onChange={(e) => setThemeConfig({ compactMode: e.target.value === 'compact' })}
          >
            <Radio value="default">{t('default')}</Radio>
            <Radio value="compact">{t('compact')}</Radio>
          </Radio.Group>
        </Flex>
      </div>
    </>
  );
};

export default ThemeControls;
