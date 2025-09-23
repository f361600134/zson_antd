
export interface ThemePreset {
    key: string;
    name: string;
    bgColor: string;
    borderColor: string;
    preview: React.ReactNode;
}

export interface ColorPreset {
    color: string;
    name: string;
}

export interface LanguageOption{
    value: string;
    label: string;
    flag: string;
}