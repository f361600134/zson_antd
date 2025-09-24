import React, {useState} from 'react';
import {Card, Tabs} from 'antd';
import {FileTextOutlined, FileExcelOutlined} from '@ant-design/icons';
import type {ViewMode, FilterOptions} from './types';
import {useFileData} from './hooks/useFileData';
import {useFileActions} from './hooks/useFileActions';
import FileTab from './components/FileTab';

const {TabPane} = Tabs;

const Spreadsheet: React.FC = () => {
    // 状态管理
    const [activeTab, setActiveTab] = useState('excel');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        searchText: '',
        selectedBranch: 'all'
    });

    // 自定义 hooks
    const {getFilteredFiles} = useFileData();
    const {handleFileAction} = useFileActions();

    // 处理过滤器变更
    const handleFilterChange = (newOptions: Partial<FilterOptions>) => {
        setFilterOptions(prev => ({...prev, ...newOptions}));
    };

    // 获取过滤后的文件数据
    const filteredExcelFiles = getFilteredFiles.excel(filterOptions);
    const filteredJsonFiles = getFilteredFiles.json(filterOptions);

    return (
        <div>
            <Card>
                <Tabs activeKey={activeTab} onChange={setActiveTab}  size="large" >
                    <TabPane tab={
                        <span> <FileExcelOutlined/> EXCEL </span>
                    } key="excel">
                        <FileTab
                            files={filteredExcelFiles}
                            fileType="excel"
                            filterOptions={filterOptions}
                            viewMode={viewMode}
                            emptyDescription="没有找到匹配的 Excel 文件"
                            onFilterChange={handleFilterChange}
                            onViewModeChange={setViewMode}
                            onAction={(action, file) => handleFileAction(action, file, "excel")}
                        />
                    </TabPane>
                    <TabPane tab={
                        <span><FileTextOutlined/>JSON</span>
                        }
                        key="json">
                        <FileTab
                            files={filteredJsonFiles}
                            fileType="json"
                            filterOptions={filterOptions}
                            viewMode={viewMode}
                            emptyDescription="没有找到匹配的 JSON 文件"
                            onFilterChange={handleFilterChange}
                            onViewModeChange={setViewMode}
                            onAction={(action, file) => handleFileAction(action, file, "json")}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default Spreadsheet;
