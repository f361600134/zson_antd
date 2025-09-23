import {ReactNode} from "react";

export type NavigationPage =
  | 'dashboard' 
  | 'settings' 
  | 'profile' 
  | 'admin' 
  | 'team' 
  | 'documents' 
  | 'analytics'
  | 'sheet'
  | 'protocol';

export interface NavigationState {
  currentPage: NavigationPage;
  navigateTo: (page: NavigationPage) => void;
}


export interface NavigationMenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  roles?: string[]; // ['admin', 'editor']
}