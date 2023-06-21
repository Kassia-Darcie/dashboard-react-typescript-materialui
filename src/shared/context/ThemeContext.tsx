import { Box, ThemeProvider } from "@mui/material";
import { createContext, useState, useCallback, useMemo, useContext } from "react";
import { LightTheme, DarkTheme } from "../themes";

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toogleTheme: () => void;
}

interface IAppThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light')

  const toogleTheme = useCallback(() => {
    setThemeName((oldThemeName) => oldThemeName === 'light' ? 'dark' : 'light')
  },[])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  },[themeName])
  
  return (
    <ThemeContext.Provider value={{themeName, toogleTheme}}>
      <ThemeProvider theme={DarkTheme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}