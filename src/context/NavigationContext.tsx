import React, { createContext, useCallback } from 'react';

interface NavigationContextType {
  navigateTo: (page: string) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
}

export function NavigationProvider({ children, onNavigate }: NavigationProviderProps) {
  const navigateTo = useCallback((page: string) => {
    onNavigate(page);
  }, [onNavigate]);

  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}