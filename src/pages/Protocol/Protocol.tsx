import React from 'react';
import { FilePptOutlined } from '@ant-design/icons';
import Placeholder from "../../components/Common/Placeholder.tsx";

const Protocol: React.FC = () => {
  return (
    <Placeholder
      icon={<FilePptOutlined />}
      title="Protocol Page"
      text="This page is under development"
    />
  );
};

export default Protocol;