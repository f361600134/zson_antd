import React, {useState} from 'react';
import {
    Card,
    Tabs,
    Input,
    Select,
    Row,
    Col,
    Typography,
    Space,
    Button,
    Tooltip,
    Tag,
    Empty,
    List,
    Avatar,
    Dropdown,
    message
} from 'antd';
import {
    SearchOutlined,
    AppstoreOutlined,
    UnorderedListOutlined,
    FileExcelOutlined,
    EyeOutlined,
    DownloadOutlined,
    DeleteOutlined,
    MoreOutlined,
    FileTextOutlined,
    CalendarOutlined,
    BranchesOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';

const {Text} = Typography;
const {TabPane} = Tabs;

interface ExcelFile {
    id: string;
    name: string;
    createTime: string;
    updateTime: string;
    branch: string;
    size: string;
}

interface JsonFile {
    id: string;
    name: string;
    createTime: string;
    updateTime: string;
    branch: string;
    size: string;
    type: 'config' | 'data' | 'schema';
}

const Spreadsheet: React.FC = () => {
    const [activeTab, setActiveTab] = useState('excel');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchText, setSearchText] = useState('');
    const [selectedBranch, setSelectedBranch] = useState<string>('all');

    const [excelFiles] = useState<ExcelFile[]>([
        {
            id: '1',
            name: 'Sales_Report_Q4_2024_Final_Version.xlsx',
            createTime: '2024-12-15 10:30:00',
            updateTime: '2025-01-10 14:20:00',
            branch: 'main',
            size: '2.5MB'
        },
        {
            id: '2',
            name: 'Employee_Data.xlsx',
            createTime: '2024-11-20 09:15:00',
            updateTime: '2025-01-08 16:45:00',
            branch: 'develop',
            size: '1.8MB'
        },
        {
            id: '3',
            name: 'Financial_Analysis_2024.xlsx',
            createTime: '2024-12-01 11:00:00',
            updateTime: '2025-01-05 13:30:00',
            branch: 'main',
            size: '3.2MB'
        },
        {
            id: '4',
            name: 'Inventory_Management_System_Data_Export.xlsx',
            createTime: '2024-10-15 14:20:00',
            updateTime: '2024-12-28 10:15:00',
            branch: 'feature/inventory',
            size: '4.1MB'
        },
        {
            id: '5',
            name: 'Customer_Feedback_Analysis.xlsx',
            createTime: '2024-11-30 16:45:00',
            updateTime: '2025-01-03 09:20:00',
            branch: 'main',
            size: '1.5MB'
        },
        {
            id: '6',
            name: 'Marketing_Campaign_Results.xlsx',
            createTime: '2024-12-10 08:30:00',
            updateTime: '2025-01-07 15:10:00',
            branch: 'develop',
            size: '2.8MB'
        }
    ]);

    const [jsonFiles] = useState<JsonFile[]>([
        {
            id: '1',
            name: 'app_config.json',
            createTime: '2024-12-20 10:00:00',
            updateTime: '2025-01-09 11:30:00',
            branch: 'main',
            size: '15KB',
            type: 'config'
        },
        {
            id: '2',
            name: 'user_data_schema.json',
            createTime: '2024-11-15 14:20:00',
            updateTime: '2025-01-05 16:45:00',
            branch: 'develop',
            size: '8KB',
            type: 'schema'
        },
        {
            id: '3',
            name: 'api_response_data.json',
            createTime: '2024-12-05 09:15:00',
            updateTime: '2025-01-08 13:20:00',
            branch: 'main',
            size: '125KB',
            type: 'data'
        },
        {
            id: '4',
            name: 'localization_strings.json',
            createTime: '2024-10-30 11:45:00',
            updateTime: '2024-12-30 10:30:00',
            branch: 'feature/i18n',
            size: '45KB',
            type: 'config'
        }
    ]);

    const branches = ['all', 'main', 'develop', 'feature/inventory', 'feature/i18n'];

    const filteredExcelFiles = excelFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesBranch = selectedBranch === 'all' || file.branch === selectedBranch;
        return matchesSearch && matchesBranch;
    });

    const filteredJsonFiles = jsonFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
        const matchesBranch = selectedBranch === 'all' || file.branch === selectedBranch;
        return matchesSearch && matchesBranch;
    });

    const handleFileAction = (action: string, fileName: string) => {
        switch (action) {
            case 'view':
                message.info(`查看文件: ${fileName}`);
                break;
            case 'download':
                message.success(`下载文件: ${fileName}`);
                break;
            case 'delete':
                message.warning(`删除文件: ${fileName}`);
                break;
        }
    };

    const getFileActionMenu = (file: ExcelFile | JsonFile): MenuProps => ({
        items: [
            {
                key: 'view',
                label: '查看',
                icon: <EyeOutlined/>,
                onClick: () => handleFileAction('view', file.name)
            },
            {
                key: 'download',
                label: '下载',
                icon: <DownloadOutlined/>,
                onClick: () => handleFileAction('download', file.name)
            },
            {
                type: 'divider'
            },
            {
                key: 'delete',
                label: '删除',
                icon: <DeleteOutlined/>,
                danger: true,
                onClick: () => handleFileAction('delete', file.name)
            }
        ]
    });

    const truncateFileName = (name: string, maxLength: number = 25) => {
        return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
    };

    const getBranchColor = (branch: string) => {
        switch (branch) {
            case 'main':
                return 'blue';
            case 'develop':
                return 'green';
            case 'feature/inventory':
                return 'orange';
            case 'feature/i18n':
                return 'purple';
            default:
                return 'default';
        }
    };

    const getJsonTypeColor = (type: string) => {
        switch (type) {
            case 'config':
                return 'blue';
            case 'data':
                return 'green';
            case 'schema':
                return 'orange';
            default:
                return 'default';
        }
    };

    const fileCardStyle: React.CSSProperties = {
        height: '180px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
    };

    const fileCardHoverStyle: React.CSSProperties = {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
    };

    const renderExcelGridView = () => (
        <Row gutter={[16, 16]}>
            {filteredExcelFiles.map((file) => (
                <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
                    <Card
                        style={fileCardStyle}
                        bodyStyle={{padding: '16px', height: '100%', display: 'flex', flexDirection: 'column'}}
                        className="file-card"
                        onMouseEnter={(e) => {
                            const card = e.currentTarget;
                            Object.assign(card.style, fileCardHoverStyle);
                            const actions = card.querySelector('.file-actions') as HTMLElement;
                            if (actions) actions.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            const card = e.currentTarget;
                            card.style.transform = 'scale(1)';
                            card.style.boxShadow = '';
                            const actions = card.querySelector('.file-actions') as HTMLElement;
                            if (actions) actions.style.opacity = '0';
                        }}
                    >
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                            <div style={{textAlign: 'center', marginBottom: '12px'}}>
                                <FileExcelOutlined style={{fontSize: '48px', color: '#52c41a'}}/>
                            </div>

                            <div style={{flex: 1}}>
                                <Tooltip title={file.name}>
                                    <Text strong style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        height: '40px',
                                        overflow: 'hidden'
                                    }}>
                                        {truncateFileName(file.name)}
                                    </Text>
                                </Tooltip>

                                <div style={{fontSize: '12px', color: '#8c8c8c'}}>
                                    <div style={{marginBottom: '4px'}}>
                                        <CalendarOutlined style={{marginRight: '4px'}}/>
                                        {file.updateTime.split(' ')[0]}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Tag color={getBranchColor(file.branch)}>
                                            {file.branch}
                                        </Tag>
                                        <Text style={{fontSize: '12px', color: '#8c8c8c'}}>
                                            {file.size}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="file-actions"
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <Dropdown menu={getFileActionMenu(file)} trigger={['click']}>
                                <Button
                                    type="text"
                                    icon={<MoreOutlined/>}

                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </Dropdown>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const renderExcelListView = () => (
        <List
            dataSource={filteredExcelFiles}
            renderItem={(file) => (
                <List.Item
                    actions={[
                        <Tooltip title="查看">
                            <Button
                                type="text"
                                icon={<EyeOutlined/>}
                                onClick={() => handleFileAction('view', file.name)}
                            />
                        </Tooltip>,
                        <Tooltip title="下载">
                            <Button
                                type="text"
                                icon={<DownloadOutlined/>}
                                onClick={() => handleFileAction('download', file.name)}
                            />
                        </Tooltip>,
                        <Tooltip title="删除">
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                danger
                                onClick={() => handleFileAction('delete', file.name)}
                            />
                        </Tooltip>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar icon={<FileExcelOutlined/>} style={{backgroundColor: '#52c41a'}}/>}
                        title={
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <Text strong>{file.name}</Text>
                                <Tag color={getBranchColor(file.branch)}>
                                    {file.branch}
                                </Tag>
                            </div>
                        }
                        description={
                            <Space direction="vertical" size={4}>
                                <Text type="secondary">创建时间: {file.createTime}</Text>
                                <Text type="secondary">更新时间: {file.updateTime}</Text>
                                <Text type="secondary">文件大小: {file.size}</Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    );

    const renderJsonGridView = () => (
        <Row gutter={[16, 16]}>
            {filteredJsonFiles.map((file) => (
                <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
                    <Card
                        style={fileCardStyle}
                        bodyStyle={{padding: '16px', height: '100%', display: 'flex', flexDirection: 'column'}}
                        className="file-card"
                        onMouseEnter={(e) => {
                            const card = e.currentTarget;
                            Object.assign(card.style, fileCardHoverStyle);
                            const actions = card.querySelector('.file-actions') as HTMLElement;
                            if (actions) actions.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            const card = e.currentTarget;
                            card.style.transform = 'scale(1)';
                            card.style.boxShadow = '';
                            const actions = card.querySelector('.file-actions') as HTMLElement;
                            if (actions) actions.style.opacity = '0';
                        }}
                    >
                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                            <div style={{textAlign: 'center', marginBottom: '12px'}}>
                                <FileTextOutlined style={{fontSize: '48px', color: '#1677ff'}}/>
                            </div>

                            <div style={{flex: 1}}>
                                <Tooltip title={file.name}>
                                    <Text strong style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        height: '40px',
                                        overflow: 'hidden'
                                    }}>
                                        {truncateFileName(file.name)}
                                    </Text>
                                </Tooltip>

                                <div style={{fontSize: '12px', color: '#8c8c8c'}}>
                                    <div style={{marginBottom: '4px'}}>
                                        <CalendarOutlined style={{marginRight: '4px'}}/>
                                        {file.updateTime.split(' ')[0]}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '4px'
                                    }}>
                                        <Tag color={getBranchColor(file.branch)}>
                                            {file.branch}
                                        </Tag>
                                        <Text style={{fontSize: '12px', color: '#8c8c8c'}}>
                                            {file.size}
                                        </Text>
                                    </div>
                                    <Tag color={getJsonTypeColor(file.type)}>
                                        {file.type}
                                    </Tag>
                                </div>
                            </div>
                        </div>

                        <div
                            className="file-actions"
                            style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                opacity: 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <Dropdown menu={getFileActionMenu(file)} trigger={['click']}>
                                <Button
                                    type="text"
                                    icon={<MoreOutlined/>}

                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </Dropdown>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );

    const renderJsonListView = () => (
        <List
            dataSource={filteredJsonFiles}
            renderItem={(file) => (
                <List.Item
                    actions={[
                        <Tooltip title="查看">
                            <Button
                                type="text"
                                icon={<EyeOutlined/>}
                                onClick={() => handleFileAction('view', file.name)}
                            />
                        </Tooltip>,
                        <Tooltip title="下载">
                            <Button
                                type="text"
                                icon={<DownloadOutlined/>}
                                onClick={() => handleFileAction('download', file.name)}
                            />
                        </Tooltip>,
                        <Tooltip title="删除">
                            <Button
                                type="text"
                                icon={<DeleteOutlined/>}
                                danger
                                onClick={() => handleFileAction('delete', file.name)}
                            />
                        </Tooltip>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar icon={<FileTextOutlined/>} style={{backgroundColor: '#1677ff'}}/>}
                        title={
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <Text strong>{file.name}</Text>
                                <Tag color={getBranchColor(file.branch)}>
                                    {file.branch}
                                </Tag>
                                <Tag color={getJsonTypeColor(file.type)}>
                                    {file.type}
                                </Tag>
                            </div>
                        }
                        description={
                            <Space direction="vertical" size={4}>
                                <Text type="secondary">创建时间: {file.createTime}</Text>
                                <Text type="secondary">更新时间: {file.updateTime}</Text>
                                <Text type="secondary">文件大小: {file.size}</Text>
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    );

    return (
        <div>
            <Card>
                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab={
                        <span>
              <FileExcelOutlined/>
              EXCEL
            </span>
                    } key="excel">
                        {/* 工具栏 */}
                        <div style={{
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                        }}>
                            <Space>
                                <Input
                                    placeholder="搜索文件名..."
                                    prefix={<SearchOutlined/>}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{width: '250px'}}
                                />
                                <Select
                                    value={selectedBranch}
                                    onChange={setSelectedBranch}
                                    style={{width: '150px'}}
                                    placeholder="选择分支"
                                >
                                    <Select.Option value="all">
                                        <BranchesOutlined style={{marginRight: '4px'}}/>
                                        所有分支
                                    </Select.Option>
                                    {branches.filter(b => b !== 'all').map(branch => (
                                        <Select.Option key={branch} value={branch}>
                                            <BranchesOutlined style={{marginRight: '4px'}}/>
                                            {branch}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>

                            <Space>
                                <Button.Group>
                                    <Button
                                        type={viewMode === 'grid' ? 'primary' : 'default'}
                                        icon={<AppstoreOutlined/>}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        网格
                                    </Button>
                                    <Button
                                        type={viewMode === 'list' ? 'primary' : 'default'}
                                        icon={<UnorderedListOutlined/>}
                                        onClick={() => setViewMode('list')}
                                    >
                                        列表
                                    </Button>
                                </Button.Group>
                            </Space>
                        </div>

                        {/* 文件展示区域 */}
                        {filteredExcelFiles.length === 0 ? (
                            <Empty description="没有找到匹配的 Excel 文件"/>
                        ) : (
                            viewMode === 'grid' ? renderExcelGridView() : renderExcelListView()
                        )}
                    </TabPane>

                    <TabPane tab={
                        <span>
              <FileTextOutlined/>
              JSON
            </span>
                    } key="json">
                        {/* 工具栏 */}
                        <div style={{
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px'
                        }}>
                            <Space>
                                <Input
                                    placeholder="搜索文件名..."
                                    prefix={<SearchOutlined/>}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    style={{width: '250px'}}
                                />
                                <Select
                                    value={selectedBranch}
                                    onChange={setSelectedBranch}
                                    style={{width: '150px'}}
                                    placeholder="选择分支"
                                >
                                    <Select.Option value="all">
                                        <BranchesOutlined style={{marginRight: '4px'}}/>
                                        所有分支
                                    </Select.Option>
                                    {branches.filter(b => b !== 'all').map(branch => (
                                        <Select.Option key={branch} value={branch}>
                                            <BranchesOutlined style={{marginRight: '4px'}}/>
                                            {branch}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Space>

                            <Space>
                                <Button.Group>
                                    <Button
                                        type={viewMode === 'grid' ? 'primary' : 'default'}
                                        icon={<AppstoreOutlined/>}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        网格
                                    </Button>
                                    <Button
                                        type={viewMode === 'list' ? 'primary' : 'default'}
                                        icon={<UnorderedListOutlined/>}
                                        onClick={() => setViewMode('list')}
                                    >
                                        列表
                                    </Button>
                                </Button.Group>
                            </Space>
                        </div>

                        {/* 文件展示区域 */}
                        {filteredJsonFiles.length === 0 ? (
                            <Empty description="没有找到匹配的 JSON 文件"/>
                        ) : (
                            viewMode === 'grid' ? renderJsonGridView() : renderJsonListView()
                        )}
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default Spreadsheet;