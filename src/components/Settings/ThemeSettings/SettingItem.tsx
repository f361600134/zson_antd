//设置像, 用于设置页中一项为一个设置
import React from 'react';
import {Flex, Typography} from 'antd';
import {useSettingsStyles} from "../../../hooks";

const {Text} = Typography;

interface Props {
    label: string;
    description?: string;
    control: React.ReactNode;
}

const SettingItem: React.FC<Props> = ({label, control, description}) => {
    const styles = useSettingsStyles();
    return (
        <div style={{ marginBottom: '24px' }}>
            <Flex justify="space-between" align="center">
                <Text style={styles.text.label}>
                {label}
                </Text>
                {control}
            </Flex>
            <Text style={styles.text.description}>
            {description}
            </Text>
       </div>
    );
};

export default SettingItem;
