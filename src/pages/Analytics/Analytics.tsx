import React from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import Placeholder from "../../components/Common/Placeholder.tsx";

const Analytics: React.FC = () => {
  return (
    <Placeholder
      icon={<BarChartOutlined />}
      title="Analytics Page"
      text="This page is under development"
    />
  );
};

export default Analytics;