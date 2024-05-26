import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the shape of the context value
interface ThemeContextValue {
  theme: string;
  toggleTheme: () => void;
}

type Props = {
  children: ReactNode;
};

// Create the context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Create a provider component
export const ThemeProvider = ({ children } : Props) => {
  const [theme, setTheme] = useState(() => {
    // Retrieve the saved theme from local storage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    // Apply the theme class to the document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
    // Save the theme preference to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Create the context value
  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
