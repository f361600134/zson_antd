import React from 'react';
import { Card, Row, Col, Statistic, Table, Tag, Typography } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  TeamOutlined, 
  TrophyOutlined 
} from '@ant-design/icons';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useThemeStore } from '../../store/themeStore';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { currentWorkspace } = useWorkspaceStore();
  const { themeConfig } = useThemeStore();

  const mockData = [
    {
      key: '1',
      name: 'Project Alpha Documentation',
      status: 'In Progress',
      assignee: 'John Doe',
      dueDate: '2025-01-15'
    },
    {
      key: '2', 
      name: 'Marketing Campaign Review',
      status: 'Completed',
      assignee: 'Jane Smith',
      dueDate: '2025-01-12'
    },
    {
      key: '3',
      name: 'System Integration Testing',
      status: 'Pending',
      assignee: 'Mike Johnson',
      dueDate: '2025-01-20'
    }
  ];

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Completed' ? 'green' : status === 'In Progress' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
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

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={titleStyle}>Dashboard</Title>
        <Text style={subtitleStyle}>
          Welcome to {currentWorkspace?.name}. Here's your workspace overview.
        </Text>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={12}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Team Members"
              value={24}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed Tasks"
              value={87}
              suffix="/ 100"
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card title="Recent Tasks">
            <Table 
              dataSource={mockData} 
              columns={columns} 
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;