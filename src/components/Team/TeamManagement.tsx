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
  Badge,
  Tooltip,
  Progress,
  List,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  TeamOutlined,
  CrownOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  TrophyOutlined,
  ProjectOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useThemeStore } from '../../store/themeStore';
import { useTranslation } from '../../utils/i18n';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Owner' | 'Admin' | 'Manager' | 'Member' | 'Guest';
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  avatar: string;
  skills: string[];
  projectsCount: number;
  tasksCompleted: number;
}

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

const TeamManagement: React.FC = () => {
  const { themeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const [activeTab, setActiveTab] = useState('members');
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [form] = Form.useForm();
  const [teamForm] = Form.useForm();

  const [members] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Owner',
      department: 'Technology',
      position: 'CTO',
      status: 'active',
      joinDate: '2020-01-15',
      lastActive: '2025-01-10 15:30',
      avatar: '',
      skills: ['Leadership', 'Strategy', 'Technology'],
      projectsCount: 12,
      tasksCompleted: 156
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Admin',
      department: 'Marketing',
      position: 'Marketing Director',
      status: 'active',
      joinDate: '2020-03-20',
      lastActive: '2025-01-10 14:15',
      avatar: '',
      skills: ['Marketing', 'Analytics', 'Content Strategy'],
      projectsCount: 8,
      tasksCompleted: 89
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Manager',
      department: 'Sales',
      position: 'Sales Manager',
      status: 'active',
      joinDate: '2021-06-10',
      lastActive: '2025-01-10 16:45',
      avatar: '',
      skills: ['Sales', 'Customer Relations', 'Negotiation'],
      projectsCount: 6,
      tasksCompleted: 67
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Member',
      department: 'HR',
      position: 'HR Specialist',
      status: 'pending',
      joinDate: '2025-01-05',
      lastActive: 'Never',
      avatar: '',
      skills: ['HR Management', 'Recruitment', 'Training'],
      projectsCount: 2,
      tasksCompleted: 12
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      phone: '+1 (555) 567-8901',
      role: 'Member',
      department: 'Technology',
      position: 'Senior Developer',
      status: 'active',
      joinDate: '2022-09-15',
      lastActive: '2025-01-10 13:20',
      avatar: '',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      projectsCount: 15,
      tasksCompleted: 234
    }
  ]);

  const [teams] = useState<Team[]>([
    {
      id: '1',
      name: 'Development Team',
      description: 'Core product development team',
      memberCount: 8,
      createdDate: '2020-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Marketing Team',
      description: 'Marketing and growth team',
      memberCount: 5,
      createdDate: '2020-02-20',
      status: 'active'
    },
    {
      id: '3',
      name: 'Sales Team',
      description: 'Sales and customer success team',
      memberCount: 6,
      createdDate: '2020-03-10',
      status: 'active'
    },
    {
      id: '4',
      name: 'Design Team',
      description: 'UI/UX and product design team',
      memberCount: 4,
      createdDate: '2021-01-05',
      status: 'inactive'
    }
  ]);

  const memberColumns: ColumnsType<TeamMember> = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Badge 
            dot 
            status={record.status === 'active' ? 'success' : record.status === 'pending' ? 'processing' : 'default'}
          >
            <Avatar size="default" icon={<UserOutlined />} />
          </Badge>
          <div>
            <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {text}
              {record.role === 'Owner' && <CrownOutlined style={{ color: '#faad14' }} />}
            </div>
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const colors = {
          Owner: 'gold',
          Admin: 'red',
          Manager: 'blue',
          Member: 'green',
          Guest: 'default'
        };
        return <Tag color={colors[role as keyof typeof colors]}>{role}</Tag>;
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
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
      title: 'Projects',
      dataIndex: 'projectsCount',
      key: 'projectsCount',
      render: (count) => (
        <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Profile">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => message.info(`View profile: ${record.name}`)}
            />
          </Tooltip>
          <Tooltip title="Edit Member">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditMember(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to remove this member?"
            onConfirm={() => handleDeleteMember(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Remove Member">
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                size="small"
                danger
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const teamColumns: ColumnsType<Team> = [
    {
      title: 'Team Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Members',
      dataIndex: 'memberCount',
      key: 'memberCount',
      render: (count) => (
        <Space>
          <TeamOutlined />
          <Text>{count}</Text>
        </Space>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditTeam(record)}
          />
          <Popconfirm
            title="Are you sure to delete this team?"
            onConfirm={() => handleDeleteTeam(record.id)}
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

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    form.setFieldsValue(member);
    setMemberModalVisible(true);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    teamForm.setFieldsValue(team);
    setTeamModalVisible(true);
  };

  const handleDeleteMember = (memberId: string) => {
    message.success(`Member ${memberId} removed successfully`);
  };

  const handleDeleteTeam = (teamId: string) => {
    message.success(`Team ${teamId} deleted successfully`);
  };

  const handleMemberSubmit = (values: any) => {
    if (editingMember) {
      message.success('Member updated successfully');
    } else {
      message.success('Member added successfully');
    }
    setMemberModalVisible(false);
    setEditingMember(null);
    form.resetFields();
  };

  const handleTeamSubmit = (values: any) => {
    if (editingTeam) {
      message.success('Team updated successfully');
    } else {
      message.success('Team created successfully');
    }
    setTeamModalVisible(false);
    setEditingTeam(null);
    teamForm.resetFields();
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

  const activeMembers = members.filter(m => m.status === 'active').length;
  const pendingMembers = members.filter(m => m.status === 'pending').length;
  const totalProjects = members.reduce((sum, m) => sum + m.projectsCount, 0);
  const totalTasks = members.reduce((sum, m) => sum + m.tasksCompleted, 0);

  return (
    <div>
      
      {/* Team Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Members"
              value={members.length}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Members"
              value={activeMembers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Projects"
              value={totalProjects}
              prefix={<ProjectOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tasks Completed"
              value={totalTasks}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Team Members" key="members" icon={<UserOutlined />}>
            <div style={{ marginBottom: '16px' }}>
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditingMember(null);
                    form.resetFields();
                    setMemberModalVisible(true);
                  }}
                >
                  Add Member
                </Button>
                <Button icon={<MailOutlined />}>
                  Invite Members
                </Button>
              </Space>
            </div>
            <Table
              columns={memberColumns}
              dataSource={members}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ padding: '16px 0' }}>
                    <Row gutter={[24, 16]}>
                      <Col xs={24} sm={12}>
                        <div>
                          <Text strong>Contact Information:</Text>
                          <div style={{ marginTop: '8px' }}>
                            <div><PhoneOutlined /> {record.phone}</div>
                            <div><CalendarOutlined /> Joined: {record.joinDate}</div>
                            <div>Last Active: {record.lastActive}</div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12}>
                        <div>
                          <Text strong>Skills:</Text>
                          <div style={{ marginTop: '8px' }}>
                            <Space wrap>
                              {record.skills.map((skill, index) => (
                                <Tag key={index} color="blue">{skill}</Tag>
                              ))}
                            </Space>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[24, 16]}>
                      <Col xs={24} sm={8}>
                        <Statistic
                          title="Projects"
                          value={record.projectsCount}
                          prefix={<ProjectOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <Statistic
                          title="Tasks Completed"
                          value={record.tasksCompleted}
                          prefix={<TrophyOutlined />}
                        />
                      </Col>
                      <Col xs={24} sm={8}>
                        <div>
                          <Text>Performance</Text>
                          <Progress 
                            percent={Math.min(100, (record.tasksCompleted / 100) * 100)} 
                            size="small" 
                            status="active"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                ),
                rowExpandable: () => true,
              }}
            />
          </TabPane>

          <TabPane tab="Teams" key="teams" icon={<TeamOutlined />}>
            <div style={{ marginBottom: '16px' }}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingTeam(null);
                  teamForm.resetFields();
                  setTeamModalVisible(true);
                }}
              >
                Create Team
              </Button>
            </div>
            <Table
              columns={teamColumns}
              dataSource={teams}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane tab="Roles & Permissions" key="roles" icon={<CrownOutlined />}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Role Hierarchy" size="small">
                  <List
                    dataSource={[
                      { role: 'Owner', description: 'Full system access and control', color: 'gold', icon: <CrownOutlined /> },
                      { role: 'Admin', description: 'Administrative privileges', color: 'red', icon: <StarOutlined /> },
                      { role: 'Manager', description: 'Team and project management', color: 'blue', icon: <TeamOutlined /> },
                      { role: 'Member', description: 'Standard team member access', color: 'green', icon: <UserOutlined /> },
                      { role: 'Guest', description: 'Limited read-only access', color: 'default', icon: <EyeOutlined /> }
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={item.icon} style={{ backgroundColor: item.color === 'default' ? '#d9d9d9' : undefined }} />}
                          title={<Tag color={item.color}>{item.role}</Tag>}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Permission Matrix" size="small">
                  <div style={{ fontSize: '14px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>System Administration:</Text>
                      <div>Owner: ✅ | Admin: ✅ | Manager: ❌ | Member: ❌ | Guest: ❌</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>User Management:</Text>
                      <div>Owner: ✅ | Admin: ✅ | Manager: ⚠️ | Member: ❌ | Guest: ❌</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>Project Management:</Text>
                      <div>Owner: ✅ | Admin: ✅ | Manager: ✅ | Member: ⚠️ | Guest: ❌</div>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <Text strong>View Reports:</Text>
                      <div>Owner: ✅ | Admin: ✅ | Manager: ✅ | Member: ✅ | Guest: ⚠️</div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '16px' }}>
                      ✅ Full Access | ⚠️ Limited Access | ❌ No Access
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Member Modal */}
      <Modal
        title={editingMember ? 'Edit Member' : 'Add New Member'}
        open={memberModalVisible}
        onCancel={() => {
          setMemberModalVisible(false);
          setEditingMember(null);
          form.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleMemberSubmit}
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
                label="Phone"
                name="phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select>
                  <Select.Option value="Owner">Owner</Select.Option>
                  <Select.Option value="Admin">Admin</Select.Option>
                  <Select.Option value="Manager">Manager</Select.Option>
                  <Select.Option value="Member">Member</Select.Option>
                  <Select.Option value="Guest">Guest</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
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
                  <Select.Option value="Operations">Operations</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Position"
                name="position"
                rules={[{ required: true, message: 'Please enter position' }]}
              >
                <Input />
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
              <Button onClick={() => setMemberModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingMember ? 'Update' : 'Add Member'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Team Modal */}
      <Modal
        title={editingTeam ? 'Edit Team' : 'Create New Team'}
        open={teamModalVisible}
        onCancel={() => {
          setTeamModalVisible(false);
          setEditingTeam(null);
          teamForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={teamForm}
          layout="vertical"
          onFinish={handleTeamSubmit}
        >
          <Form.Item
            label="Team Name"
            name="name"
            rules={[{ required: true, message: 'Please enter team name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setTeamModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTeam ? 'Update' : 'Create Team'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamManagement;