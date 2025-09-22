import { useState } from 'react';
import type { NavigationPage, NavigationState } from '../types/navigation';

export const useNavigation = (): NavigationState => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('dashboard');

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    navigateTo
  };
};
