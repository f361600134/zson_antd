import React from 'react';
import { Card, Divider } from 'antd';
import { ThemeSettings } from '../../components/Settings/ThemeSettings';
import { LanguageSettings } from '../../components/Settings/LanguageSettings';
import { GeneralSettings } from '../../components/Settings/GeneralSettings';

const SystemSettings: React.FC = () => {
  return (
    <div>
      <Card>
        <div>
          {/* 主题设置 */}
          <ThemeSettings />
          
          <Divider style={{ margin: '12px 0 20px 0' }} />
          
          {/* 语言设置 */}
          <LanguageSettings />
          
          <Divider style={{ margin: '12px 0 20px 0' }} />
          
          {/* 通用设置 */}
          <GeneralSettings />
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings;