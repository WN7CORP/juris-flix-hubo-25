
import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  currentFunction: string | null;
  setCurrentFunction: (func: string | null) => void;
  isInFunction: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentFunction, setCurrentFunction] = useState<string | null>(null);

  const handleSetCurrentFunction = (func: string | null) => {
    console.log('NavigationContext - Definindo função:', func);
    setCurrentFunction(func);
  };

  const value = {
    currentFunction,
    setCurrentFunction: handleSetCurrentFunction,
    isInFunction: currentFunction !== null,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
