import { CssBaseline, useMediaQuery } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../lib/hooks";

const THEMES = {
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

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeName, setThemeName] = useLocalStorage("themeName", "system");

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
}
