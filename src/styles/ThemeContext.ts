import React, { createContext } from 'react';

const defaultTheme = {
    primary: '#3c486c',
    secondary: '#6d85b3',
    tertiary: '#464950',
    accent: '#deb245',
    background: '#f0f4fd',
    textWhite: '#FFFFFF',
    textBlack: '#000000',
    textDarkGray: '#181819',
};

export const ThemeContext = createContext(defaultTheme);
const ThemeProvider = ({ children }) => {

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};
    
export default ThemeProvider;
