import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Row, 
  Col, 
  Statistic, 
  Typography,
  Avatar,
  Popconfirm,
  message,
  Tabs,
  Switch,
  DatePicker,
  Progress
} from 'antd';
import { 
  UserOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  SettingOutlined,
  TeamOutlined,
  DatabaseOutlined,
  SecurityScanOutlined,
  BugOutlined
} from '@ant-design/icons';
import { useThemeStore } from '../../store/themeStore';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  department: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  user: string;
}

const AdminPanel: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const [activeTab, setActiveTab] = useState('users');
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2025-01-10 14:30',
      department: 'Technology'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2025-01-10 09:15',
      department: 'Marketing'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'User',
      status: 'inactive',
      lastLogin: '2025-01-08 16:45',
      department: 'Sales'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'User',
      status: 'pending',
      lastLogin: 'Never',
      department: 'HR'
    }
  ]);

  const [systemLogs] = useState<SystemLog[]>([
    {
      id: '1',
      timestamp: '2025-01-10 15:30:25',
      level: 'info',
      message: 'User login successful',
      user: 'john.doe@company.com'
    },
    {
      id: '2',
      timestamp: '2025-01-10 15:25:10',
      level: 'warning',
      message: 'Failed login attempt',
      user: 'unknown@example.com'
    },
    {
      id: '3',
      timestamp: '2025-01-10 14:45:33',
      level: 'error',
      message: 'Database connection timeout',
      user: 'system'
    },
    {
      id: '4',
      timestamp: '2025-01-10 14:20:15',
      level: 'info',
      message: 'System backup completed',
      user: 'system'
    }
  ]);

  const userColumns: ColumnsType<User> = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'red' : role === 'Manager' ? 'blue' : 'default'}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => message.info(`View user: ${record.name}`)}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditUser(record)}
          />
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const logColumns: ColumnsType<SystemLog> = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level) => (
        <Tag color={level === 'error' ? 'red' : level === 'warning' ? 'orange' : 'blue'}>
          {level.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      width: 200,
    },
  ];

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setUserModalVisible(true);
  };

  const handleDeleteUser = (userId: string) => {
    message.success(`User ${userId} deleted successfully`);
  };

  const handleUserSubmit = (values: any) => {
    if (editingUser) {
      message.success('User updated successfully');
    } else {
      message.success('User created successfully');
    }
    setUserModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

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

  const cardStyle: React.CSSProperties = {
    marginBottom: '24px',
    ...(themeConfig.presetTheme === 'compact' && {
      background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 100%)',
      border: '1px solid #E5E7EB',
      boxShadow: '0 4px 12px rgba(27, 77, 62, 0.08)'
    }),
    ...(themeConfig.presetTheme === 'colorful' && {
      background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 100%)',
      border: '1px solid #E7E5E4',
      boxShadow: '0 4px 12px rgba(139, 90, 107, 0.08)'
    }),
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 100%)',
      border: '1px solid #333333',
      boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15)'
    })
  };

  return (
    <div>
      
      {/* System Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={users.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Sessions"
              value={12}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="System Load"
              value={68}
              suffix="%"
              prefix={<DatabaseOutlined />}
            />
            <Progress 
              percent={68} 
              size="small" 
              showInfo={false} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Security Alerts"
              value={3}
              prefix={<SecurityScanOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="User Management" key="users" icon={<TeamOutlined />}>
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingUser(null);
                  form.resetFields();
                  setUserModalVisible(true);
                }}
              >
                Add New User
              </Button>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane tab="System Logs" key="logs" icon={<BugOutlined />}>
            <Table
              columns={logColumns}
              dataSource={systemLogs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane tab="System Settings" key="system" icon={<SettingOutlined />}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="General Settings" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Maintenance Mode</Text>
                      <Switch />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>User Registration</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Email Notifications</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Auto Backup</Text>
                      <Switch defaultChecked />
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Security Settings" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Two-Factor Authentication</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Password Complexity</Text>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Session Timeout</Text>
                      <Select defaultValue="30" style={{ width: 80 }}>
                        <Select.Option value="15">15m</Select.Option>
                        <Select.Option value="30">30m</Select.Option>
                        <Select.Option value="60">1h</Select.Option>
                        <Select.Option value="120">2h</Select.Option>
                      </Select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Login Attempts</Text>
                      <Select defaultValue="5" style={{ width: 80 }}>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                      </Select>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* User Modal */}
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUserSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter name' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select>
                  <Select.Option value="Admin">Admin</Select.Option>
                  <Select.Option value="Manager">Manager</Select.Option>
                  <Select.Option value="User">User</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true, message: 'Please select department' }]}
              >
                <Select>
                  <Select.Option value="Technology">Technology</Select.Option>
                  <Select.Option value="Marketing">Marketing</Select.Option>
                  <Select.Option value="Sales">Sales</Select.Option>
                  <Select.Option value="HR">Human Resources</Select.Option>
                  <Select.Option value="Finance">Finance</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setUserModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;