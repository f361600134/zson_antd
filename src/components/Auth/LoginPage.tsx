import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Typography, 
  message, 
  Divider,
  Space,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';
import { useThemeStyles } from '../../hooks';
import type { LoginCredentials } from '../../store/authStore';

const { Title, Text } = Typography;

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { login, isLoading } = useAuthStore();
  const { themeConfig } = useThemeStyles();
  const [form] = Form.useForm();
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleLogin = async (values: LoginCredentials) => {
    try {
      await login(values);
      message.success('登录成功！');
      onLoginSuccess?.();
    } catch (error) {
      message.error((error as Error).message || '登录失败');
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    form.setFieldsValue({ email, password });
    handleLogin({ email, password });
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: themeConfig.themeMode === 'dark' 
      ? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 100%)',
      border: '1px solid #333333',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.1)'
    })
  };

  const titleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '8px',
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(45deg, #FFD700, #D4AF37)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    })
  };

  const subtitleStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '32px',
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280'
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        <div style={{ padding: '20px' }}>
          <Title level={2} style={titleStyle}>
            欢迎回来
          </Title>
          <Text style={subtitleStyle}>
            请登录您的账户以继续
          </Text>

          {!showDemoAccounts && (
            <Alert
              message="演示账户"
              description={
                <div>
                  <div>管理员: admin@company.com / admin123</div>
                  <div>普通用户: user@company.com / user123</div>
                  <Button 
                    type="link" 
                    size="small" 
                    style={{ padding: 0, marginTop: '8px' }}
                    onClick={() => setShowDemoAccounts(true)}
                  >
                    快速登录
                  </Button>
                </div>
              }
              type="info"
              showIcon
              style={{ marginBottom: '24px' }}
            />
          )}

          {showDemoAccounts && (
            <div style={{ marginBottom: '24px' }}>
              <Text strong style={{ display: 'block', marginBottom: '12px' }}>
                快速登录演示账户：
              </Text>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button
                  block
                  onClick={() => handleDemoLogin('admin@company.com', 'admin123')}
                  loading={isLoading}
                >
                  管理员账户 (admin@company.com)
                </Button>
                <Button
                  block
                  onClick={() => handleDemoLogin('user@company.com', 'user123')}
                  loading={isLoading}
                >
                  普通用户 (user@company.com)
                </Button>
                <Button 
                  type="link" 
                  size="small"
                  onClick={() => setShowDemoAccounts(false)}
                  style={{ alignSelf: 'center' }}
                >
                  手动输入
                </Button>
              </Space>
              <Divider>或</Divider>
            </div>
          )}

          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="邮箱地址"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位字符' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                autoComplete="current-password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '16px' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                icon={<LoginOutlined />}
                style={{
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 500
                }}
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              登录即表示您同意我们的服务条款和隐私政策
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;