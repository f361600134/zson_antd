export type NavigationPage = 
  | 'dashboard' 
  | 'settings' 
  | 'profile' 
  | 'admin' 
  | 'team' 
  | 'documents' 
  | 'analytics';

export interface NavigationState {
  currentPage: NavigationPage;
  navigateTo: (page: NavigationPage) => void;
}
