import { CssBaseline, useMediaQuery } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { createContext, FC, useContext } from "react";
import { useLocalStorage } from "../lib/hooks";

type ThemeName = "light" | "dark";
type ThemeSetting = ThemeName | "system";

interface Theme {
  palette: {
    mode: "light" | "dark";
  };
}

const THEMES: Record<ThemeName, Theme> = {
  light: {
    palette: {
      mode: "light",
    },
  },
  dark: {
    palette: {
      mode: "dark",
    },
  },
};

interface ThemeContextValue {
  themeName: ThemeSetting;
  setThemeName: (themeName: ThemeName) => void;
  getTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: "system",
  setThemeName: () => {},
  getTheme: () => THEMES.light,
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeName, setThemeName] = useLocalStorage<ThemeSetting>(
    "themeName",
    "system"
  );

  const getEffectiveThemeName = () => {
    if (themeName === "system") {
      return prefersDarkTheme ? "dark" : "light";
    }
    return themeName;
  };

  const getTheme = () => THEMES[getEffectiveThemeName()];

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, getTheme }}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={createTheme(getTheme())}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};
