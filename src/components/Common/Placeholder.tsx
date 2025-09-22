import {useThemeStyles} from "../../hooks";
import React from "react";

interface PlaceholderProps {
    icon: React.ReactNode;
    title: string;
    text: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ icon, title, text }) => {
    const { themeConfig } = useThemeStyles();

    return (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: 16, color: themeConfig.themeMode === 'dark' ? '#434343' : '#d1d5db' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: 20, color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280' }}>{title}</h3>
            <p style={{ color: themeConfig.themeMode === 'dark' ? '#595959' : '#9ca3af' }}>{text}</p>
        </div>
    );
};

export default Placeholder;