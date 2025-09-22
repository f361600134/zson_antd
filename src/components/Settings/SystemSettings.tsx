import React from 'react';
import { 
  Card, 
  Typography, 
  Slider, 
  Radio, 
  Space, 
  Input,
  Flex,
  Row,
  Col,
  Select,
  Switch,
  Divider
} from 'antd';
import { 
  SettingOutlined,
  GlobalOutlined,
  ControlOutlined
} from '@ant-design/icons';
import { useThemeStore } from '../../store/themeStore';
import { useTranslation } from '../../utils/i18n';

const { Title, Text } = Typography;

const SystemSettings: React.FC = () => {
  const { themeConfig, setThemeConfig, applyPresetTheme } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);

  const colorPresets = [
    '#1677ff', '#722ed1', '#eb2f96', '#f5222d',
    '#fa541c', '#faad14', '#52c41a', '#13c2c2'
  ];

  const handlePresetThemeSelect = (themeKey: string) => {
    applyPresetTheme(themeKey);
  };

  const presetThemes = [
    { 
      key: 'default', 
      name: t('defaultTheme'), 
      bgColor: '#f0f5ff', 
      borderColor: '#1677ff',
      preview: (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%)',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header bar */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #1677ff 0%, #69b1ff 100%)',
            borderRadius: '6px 6px 0 0'
          }} />
          {/* Content blocks */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '6px',
            width: '20px',
            height: '3px',
            backgroundColor: '#1677ff',
            borderRadius: '1px',
            opacity: 0.8
          }} />
          <div style={{
            position: 'absolute',
            top: '22px',
            left: '6px',
            width: '14px',
            height: '3px',
            backgroundColor: '#91caff',
            borderRadius: '1px'
          }} />
          {/* Sidebar */}
          <div style={{
            position: 'absolute',
            right: '6px',
            top: '16px',
            width: '12px',
            height: '16px',
            backgroundColor: '#f0f5ff',
            borderRadius: '2px',
            border: '1px solid #d6e4ff'
          }} />
        </div>
      )
    },
    { 
      key: 'dark', 
      name: t('darkTheme'), 
      bgColor: '#2f2f2f', 
      borderColor: '#434343',
      preview: (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header bar */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #434343 0%, #595959 100%)',
            borderRadius: '6px 6px 0 0'
          }} />
          {/* Content blocks */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '6px',
            width: '20px',
            height: '3px',
            backgroundColor: '#8c8c8c',
            borderRadius: '1px'
          }} />
          <div style={{
            position: 'absolute',
            top: '22px',
            left: '6px',
            width: '14px',
            height: '3px',
            backgroundColor: '#595959',
            borderRadius: '1px'
          }} />
          {/* Sidebar */}
          <div style={{
            position: 'absolute',
            right: '6px',
            top: '16px',
            width: '12px',
            height: '16px',
            backgroundColor: '#2f2f2f',
            borderRadius: '2px',
            border: '1px solid #434343'
          }} />
          {/* Accent dot */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '6px',
            width: '4px',
            height: '4px',
            backgroundColor: '#1677ff',
            borderRadius: '50%',
            boxShadow: '0 0 4px rgba(22, 119, 255, 0.5)'
          }} />
        </div>
      )
    },
    { 
      key: 'compact', 
      name: t('compactTheme'), 
      bgColor: '#e6f7ff', 
      borderColor: '#1890ff',
      preview: (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 50%, #F1F3F4 100%)',
          borderRadius: '6px',
          border: '1px solid #E5E7EB',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header with knowledge icon pattern */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #1B4D3E 0%, #9CA3AF 50%, #E5E7EB 100%)',
            borderRadius: '6px 6px 0 0'
          }} />
          {/* Book/knowledge icons */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '6px',
            width: '8px',
            height: '10px',
            backgroundColor: '#1B4D3E',
            borderRadius: '1px',
            opacity: 0.9
          }} />
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '8px',
            height: '10px',
            backgroundColor: '#9CA3AF',
            borderRadius: '1px',
            opacity: 0.7
          }} />
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '26px',
            width: '8px',
            height: '10px',
            backgroundColor: '#E5E7EB',
            borderRadius: '1px',
            opacity: 0.5
          }} />
          {/* Collaboration dots */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '6px',
            width: '3px',
            height: '3px',
            backgroundColor: '#1B4D3E',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '12px',
            width: '3px',
            height: '3px',
            backgroundColor: '#9CA3AF',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '18px',
            width: '3px',
            height: '3px',
            backgroundColor: '#E5E7EB',
            borderRadius: '50%'
          }} />
        </div>
      )
    },
    { 
      key: 'colorful', 
      name: '浪漫',
      bgColor: '#FAF9F7', 
      borderColor: '#8B5A6B',
      preview: (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 30%, #F0EDE8 70%, #E7E5E4 100%)',
          borderRadius: '6px',
          border: '1px solid #E7E5E4',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Elegant header */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #8B5A6B 0%, #A8A29E 50%, #D6D3D1 100%)',
            borderRadius: '6px 6px 0 0'
          }} />
          {/* Flower petals */}
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '8px',
            width: '6px',
            height: '6px',
            backgroundColor: '#eb2f96',
            borderRadius: '50% 0 50% 0',
            transform: 'rotate(45deg)',
            opacity: 0.8
          }} />
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '16px',
            width: '5px',
            height: '5px',
            backgroundColor: '#f759ab',
            borderRadius: '50% 0 50% 0',
            transform: 'rotate(25deg)',
            opacity: 0.7
          }} />
          <div style={{
            position: 'absolute',
            top: '22px',
            left: '24px',
            width: '4px',
            height: '4px',
            backgroundColor: '#ff85c0',
            borderRadius: '50% 0 50% 0',
            transform: 'rotate(65deg)',
            opacity: 0.6
          }} />
          {/* Romantic elements */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            right: '8px',
            width: '8px',
            height: '8px',
            background: 'radial-gradient(circle, #fff0f6 0%, #ffadd2 100%)',
            borderRadius: '50%',
            opacity: 0.8
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '18px',
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #fff0f6 0%, #ff85c0 100%)',
            borderRadius: '50%',
            opacity: 0.6
          }} />
        </div>
      )
    },
    { 
      key: 'luxury', 
      name: '黑金',
      bgColor: '#1F1F1F', 
      borderColor: '#FFD700',
      preview: (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #121212 0%, #1F1F1F 50%, #2A2A2A 100%)',
          borderRadius: '6px',
          border: '1px solid #333333',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 奢华金色头部 */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '12px',
            background: 'linear-gradient(90deg, #FFD700 0%, #D4AF37 50%, #B8860B 100%)',
            borderRadius: '6px 6px 0 0',
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)'
          }} />
          {/* 钻石装饰 */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '8px',
            width: '6px',
            height: '6px',
            backgroundColor: '#FFD700',
            transform: 'rotate(45deg)',
            opacity: 0.9,
            filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))'
          }} />
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '18px',
            width: '4px',
            height: '4px',
            backgroundColor: '#D4AF37',
            transform: 'rotate(45deg)',
            opacity: 0.8,
            filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))'
          }} />
          {/* 皇冠符号 */}
          <div style={{
            position: 'absolute',
            top: '14px',
            right: '8px',
            fontSize: '10px',
            color: '#FFD700',
            opacity: 0.7,
            filter: 'drop-shadow(0 0 4px rgba(255, 215, 0, 0.4))'
          }}>♔</div>
          {/* 星星装饰 */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '6px',
            fontSize: '8px',
            color: '#D4AF37',
            opacity: 0.6
          }}>★</div>
          <div style={{
            position: 'absolute',
            bottom: '6px',
            right: '12px',
            fontSize: '6px',
            color: '#FFD700',
            opacity: 0.8
          }}>✦</div>
          {/* 奢华光晕 */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '6px',
            width: '8px',
            height: '8px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
        </div>
      )
    }
  ];

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '8px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  const subtitleStyle: React.CSSProperties = {
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280',
    marginBottom: '24px'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 500,
    marginBottom: '12px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  return (
    <div>
      <Card>
        <div>
          {/* 主题设置 */}
          <div style={sectionStyle}>
            <Text style={{ ...labelStyle, fontSize: '18px', marginBottom: '16px' }}>
              <SettingOutlined style={{ marginRight: '8px' }} />
              {t('themeSettings')}
            </Text>
            <div style={{ margin: '12px 0 20px 0' }} />
            
          {/* 主题预设 */}
            <div style={{ marginBottom: '20px' }}>
             
            <Row gutter={16}>
              {presetThemes.map((theme) => (
                <Col key={theme.key}>
                  <div
                    className={`theme-preset-card ${themeConfig.presetTheme === theme.key ? 'selected' : ''}`}
                    onClick={() => handlePresetThemeSelect(theme.key)}
                  >
                    <div 
                      className="theme-preview-box"
                      style={{ backgroundColor: theme.bgColor }}
                    >
                      {theme.preview}
                    </div>
                    <Text style={{ fontSize: '12px', color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666' }}>
                      {theme.name}
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
            </div>

          {/* 主色调 */}
            <div style={{ marginBottom: '20px' }}>
            <Flex align="center" gap={12} style={{ marginBottom: '16px' }}>
                <Text style={labelStyle}>{t('primaryColor')}：</Text>
              <Input 
                value={themeConfig.colorPrimary}
                onChange={(e) => setThemeConfig({ colorPrimary: e.target.value })}
                style={{ width: '96px' }}
                size="middle"
              />
            
              {colorPresets.map((color) => (
                <div
                  key={color}
                  className={`color-preset-circle ${themeConfig.colorPrimary === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setThemeConfig({ colorPrimary: color })}
                />
              ))}
            </Flex>
            </div>

          {/* 圆角 */}
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
                min={0}
                max={16}
                value={themeConfig.borderRadius}
                onChange={(value) => setThemeConfig({ borderRadius: value })}
                tooltip={{ formatter: (value) => `${value}px` }}
                style={{ width: '256px' }}
              />
            </div>
              </Flex>
            </div>

          {/* 宽松度 */}
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
          </div>

            <Divider style={{ margin: '12px 0 20px 0' }} />
          
          {/* 语言设置 */}
          <div style={sectionStyle}>
            <div style={{ marginBottom: '12px' }}>
              <Flex justify="space-between" align="center">
                {/* <Text style={labelStyle}>{t('language')}：</Text> */}
             <Text style={{ ...labelStyle, fontSize: '18px', marginBottom: '16px' }}>
              <GlobalOutlined style={{ marginRight: '8px' }} />
              {t('languageSettings')}
            </Text>
                <Select
                  value={themeConfig.language}
                  onChange={(value) => setThemeConfig({ language: value })}
                  style={{ width: '200px' }}
                >
                  <Select.Option value="zh-CN">🇨🇳 简体中文</Select.Option>
                  <Select.Option value="en-US">🇺🇸 English</Select.Option>
                  <Select.Option value="ja-JP">🇯🇵 日本語</Select.Option>
                  <Select.Option value="ko-KR">🇰🇷 한국어</Select.Option>
                </Select>
              </Flex>
            </div>
            <Text style={{ fontSize: '12px', color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666' }}>
              {t('languageDescription')}
            </Text>
          </div>

         <Divider style={{ margin: '12px 0 20px 0' }} />

          {/* 通用设置 */}
          <div style={sectionStyle}>
            <Text style={{ ...labelStyle, fontSize: '18px', marginBottom: '16px' }}>
              <ControlOutlined style={{ marginRight: '8px' }} />
              {t('generalSettings')}
            </Text>

            <div style={{ margin: '12px 0 20px 0' }} />
            
            <div>
              <Flex justify="space-between" align="center">
                <Text style={labelStyle}>{t('allowUserRegistration')}</Text>
                <Switch
                  checked={themeConfig.allowUserRegistration}
                  onChange={(checked) => setThemeConfig({ allowUserRegistration: checked })}
                />
              </Flex>
            </div>
            
            <div >
              <Flex justify="space-between" align="center">
                <Text style={labelStyle}>{t('defaultUserStatus')}：</Text>
                <Select
                  value={themeConfig.defaultUserStatus}
                  onChange={(value) => setThemeConfig({ defaultUserStatus: value })}
                  style={{ width: '150px' }}
                >
                  <Select.Option value="active">{t('statusActive')}</Select.Option>
                  <Select.Option value="inactive">{t('statusInactive')}</Select.Option>
                  <Select.Option value="pending">{t('statusPending')}</Select.Option>
                </Select>
              </Flex>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings;