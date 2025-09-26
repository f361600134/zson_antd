import React from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import Placeholder from "../../components/Common/Placeholder.tsx";

const Documents: React.FC = () => {
  return (
    <Placeholder
      icon={<FileTextOutlined />}
      title="Documents Page"
      text="This page is under development"
    />
  );
};

export default Documents;