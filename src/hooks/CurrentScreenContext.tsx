import React, { createContext, useState, FC, ReactNode } from 'react';

interface CurrentScreenContextType {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

export const CurrentScreenContext = createContext<CurrentScreenContextType>({
  currentScreen: '',
  setCurrentScreen: () => {},
});

// Correct typing for the provider with explicit return type
export const CurrentScreenProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('');

  return (
    <CurrentScreenContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </CurrentScreenContext.Provider>
  );
};
