import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  Row, 
  Col, 
  Divider,
  Typography,
  Space,
  Tag,
  Switch,
  Select,
  DatePicker,
  message
} from 'antd';
import { 
  UserOutlined, 
  CameraOutlined, 
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { useThemeStore } from '../../store/themeStore';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  bio: string;
  joinDate: string;
  avatar: string;
  skills: string[];
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const PersonalProfile: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Technology',
    position: 'System Administrator',
    location: 'San Francisco, CA',
    bio: 'Experienced system administrator with over 8 years in enterprise software management and team leadership.',
    joinDate: '2020-03-15',
    avatar: '',
    skills: ['System Administration', 'Team Management', 'Cloud Computing', 'Security'],
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserProfile({
        ...userProfile,
        ...values,
        joinDate: values.joinDate ? values.joinDate.format('YYYY-MM-DD') : userProfile.joinDate
      });
      
      setEditing(false);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      ...userProfile,
      joinDate: dayjs(userProfile.joinDate)
    });
    setEditing(false);
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
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={titleStyle}>Personal Profile</Title>
        <Text style={subtitleStyle}>
          Manage your personal information and account settings
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card style={cardStyle}>
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size={120} 
                icon={<UserOutlined />}
                style={{ 
                  backgroundColor: themeConfig.presetTheme === 'compact' ? '#1B4D3E' :
                                   themeConfig.presetTheme === 'colorful' ? '#8B5A6B' :
                                   themeConfig.presetTheme === 'luxury' ? '#FFD700' : '#1677ff',
                  marginBottom: '16px'
                }}
              />
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  message.info('Avatar upload functionality would be implemented here');
                }}
              >
                <Button 
                  icon={<CameraOutlined />} 
                  type="dashed"
                  style={{ marginBottom: '16px' }}
                >
                  Change Avatar
                </Button>
              </Upload>
              
              <Title level={4} style={{ marginBottom: '8px' }}>
                {userProfile.name}
              </Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
                {userProfile.position}
              </Text>
              <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                {userProfile.department}
              </Text>
              
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div>
                  <MailOutlined style={{ marginRight: '8px' }} />
                  <Text>{userProfile.email}</Text>
                </div>
                <div>
                  <PhoneOutlined style={{ marginRight: '8px' }} />
                  <Text>{userProfile.phone}</Text>
                </div>
                <div>
                  <EnvironmentOutlined style={{ marginRight: '8px' }} />
                  <Text>{userProfile.location}</Text>
                </div>
              </Space>
            </div>
          </Card>

          <Card title="Skills" style={cardStyle}>
            <Space wrap>
              {userProfile.skills.map((skill, index) => (
                <Tag 
                  key={index}
                  color={themeConfig.presetTheme === 'compact' ? 'green' :
                         themeConfig.presetTheme === 'colorful' ? 'purple' :
                         themeConfig.presetTheme === 'luxury' ? 'gold' : 'blue'}
                >
                  {skill}
                </Tag>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title="Profile Information"
            style={cardStyle}
            extra={
              !editing ? (
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditing(true);
                    form.setFieldsValue({
                      ...userProfile,
                      joinDate: dayjs(userProfile.joinDate)
                    });
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Space>
                  <Button 
                    icon={<CloseOutlined />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<SaveOutlined />}
                    loading={loading}
                    onClick={() => form.submit()}
                  >
                    Save Changes
                  </Button>
                </Space>
              )
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              disabled={!editing}
              initialValues={{
                ...userProfile,
                joinDate: dayjs(userProfile.joinDate)
              }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Location"
                    name="location"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Department"
                    name="department"
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
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Position"
                    name="position"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Join Date"
                name="joinDate"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Bio"
                name="bio"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </Card>

          <Card title="Notification Settings" style={cardStyle}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <Form.Item label="Email Notifications">
                    <Switch 
                      checked={userProfile.notifications.email}
                      onChange={(checked) => 
                        setUserProfile({
                          ...userProfile,
                          notifications: { ...userProfile.notifications, email: checked }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item label="Push Notifications">
                    <Switch 
                      checked={userProfile.notifications.push}
                      onChange={(checked) => 
                        setUserProfile({
                          ...userProfile,
                          notifications: { ...userProfile.notifications, push: checked }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item label="SMS Notifications">
                    <Switch 
                      checked={userProfile.notifications.sms}
                      onChange={(checked) => 
                        setUserProfile({
                          ...userProfile,
                          notifications: { ...userProfile.notifications, sms: checked }
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalProfile;