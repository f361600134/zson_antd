import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import {authService, LoginRequest} from "../../services/authService.ts";
import {authUtils} from "../../utils/auth.ts";

const { Title } = Typography;

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: LoginRequest) => {
        setLoading(true);
        try {
            const response = await authService.login(values);

            // 保存token和用户信息
            authUtils.setToken(response.token);
            authUtils.setUserInfo(response.user);

            message.success('登录成功！');
            onLoginSuccess();
        } catch (error) {
            message.error(error instanceof Error ? error.message : '登录失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
        <Card className="login-form-container">
        <Title level={2} className="login-title">
    <LoginOutlined style={{ marginRight: 8 }} />
    用户登录
    </Title>

    <Form
    name="login"
    onFinish={handleLogin}
    autoComplete="off"
    size="large"
    >
    <Form.Item
        name="username"
    rules={[{ required: true, message: '请输入用户名!' }]}
    >
    <Input
        prefix={<UserOutlined />}
    placeholder="用户名"
        />
        </Form.Item>

        <Form.Item
    name="password"
    rules={[{ required: true, message: '请输入密码!' }]}
    >
    <Input.Password
        prefix={<LockOutlined />}
    placeholder="密码"
    />
    </Form.Item>

    <Form.Item>
    <Button
        type="primary"
    htmlType="submit"
    loading={loading}
    block
    size="large">
        登录
    </Button>
    </Form.Item>
    </Form>

        <div style={{ textAlign: 'center', marginTop: 16, color: '#666' }}>
    <p>测试账号：admin</p>
    <p>测试密码：123456</p>
    </div>
    </Card>
    </div>
);
};