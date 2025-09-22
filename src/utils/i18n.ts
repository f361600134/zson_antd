export const translations = {
  'zh-CN': {
    // 通用
    save: '保存',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    confirm: '确认',
    
    // 主题设置
    themeSettings: '主题设置',
    theme: '主题',
    primaryColor: '主色',
    borderRadius: '圆角',
    spacing: '宽松度',
    default: '默认',
    compact: '紧凑',
    
    // 主题名称
    defaultTheme: '默认',
    darkTheme: '暗黑',
    compactTheme: '知识协作',
    colorfulTheme: '浪漫',
    
    // 语言设置
    languageSettings: '语言设置',
    language: '界面语言',
    languageDescription: '选择您偏好的界面显示语言',
    
    // 通用设置
    generalSettings: '通用设置',
    allowUserRegistration: '允许新用户注册',
    defaultUserStatus: '默认用户状态',
    active: '活跃',
    inactive: '非活跃',
    pending: '待审核',
    
    // 状态选项
    statusActive: '活跃',
    statusInactive: '非活跃',
    statusPending: '待审核'
  },
  'en-US': {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    
    // Theme Settings
    themeSettings: 'Theme Settings',
    theme: 'Theme',
    primaryColor: 'Primary Color',
    borderRadius: 'Border Radius',
    spacing: 'Spacing',
    default: 'Default',
    compact: 'Compact',
    
    // Theme Names
    defaultTheme: 'Default',
    darkTheme: 'Dark',
    compactTheme: 'Knowledge',
    colorfulTheme: 'Romantic',
    
    // Language Settings
    languageSettings: 'Language Settings',
    language: 'Interface Language',
    languageDescription: 'Choose your preferred interface display language',
    
    // General Settings
    generalSettings: 'General Settings',
    allowUserRegistration: 'Allow New User Registration',
    defaultUserStatus: 'Default User Status',
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    
    // Status Options
    statusActive: 'Active',
    statusInactive: 'Inactive',
    statusPending: 'Pending'
  },
  'ja-JP': {
    // 共通
    save: '保存',
    cancel: 'キャンセル',
    edit: '編集',
    delete: '削除',
    confirm: '確認',
    
    // テーマ設定
    themeSettings: 'テーマ設定',
    theme: 'テーマ',
    primaryColor: 'プライマリカラー',
    borderRadius: '角の丸み',
    spacing: 'スペーシング',
    default: 'デフォルト',
    compact: 'コンパクト',
    
    // テーマ名
    defaultTheme: 'デフォルト',
    darkTheme: 'ダーク',
    compactTheme: 'ナレッジ',
    colorfulTheme: 'ロマンチック',
    
    // 言語設定
    languageSettings: '言語設定',
    language: 'インターフェース言語',
    languageDescription: 'お好みのインターフェース表示言語を選択してください',
    
    // 一般設定
    generalSettings: '一般設定',
    allowUserRegistration: '新規ユーザー登録を許可',
    defaultUserStatus: 'デフォルトユーザーステータス',
    active: 'アクティブ',
    inactive: '非アクティブ',
    pending: '保留中',
    
    // ステータスオプション
    statusActive: 'アクティブ',
    statusInactive: '非アクティブ',
    statusPending: '保留中'
  },
  'ko-KR': {
    // 공통
    save: '저장',
    cancel: '취소',
    edit: '편집',
    delete: '삭제',
    confirm: '확인',
    
    // 테마 설정
    themeSettings: '테마 설정',
    theme: '테마',
    primaryColor: '기본 색상',
    borderRadius: '모서리 둥글기',
    spacing: '간격',
    default: '기본',
    compact: '컴팩트',
    
    // 테마 이름
    defaultTheme: '기본',
    darkTheme: '다크',
    compactTheme: '지식',
    colorfulTheme: '로맨틱',
    
    // 언어 설정
    languageSettings: '언어 설정',
    language: '인터페이스 언어',
    languageDescription: '선호하는 인터페이스 표시 언어를 선택하세요',
    
    // 일반 설정
    generalSettings: '일반 설정',
    allowUserRegistration: '신규 사용자 등록 허용',
    defaultUserStatus: '기본 사용자 상태',
    active: '활성',
    inactive: '비활성',
    pending: '대기중',
    
    // 상태 옵션
    statusActive: '활성',
    statusInactive: '비활성',
    statusPending: '대기중'
  }
};

export const useTranslation = (language: string) => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t };
};