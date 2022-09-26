import { PaletteMode, ThemeOptions } from "@mui/material";

export const mainDarkBackground = "#00050B";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? ({
          // palette values for light mode
        } as ThemeOptions["palette"])
      : ({
          // palette values for dark mode
          primary: {
            main: "rgba(1, 246, 246, 1)",
            contrastText: "#080404",
          },
          secondary: {
            main: "rgba(176, 72, 253, 1)",
            contrastText: "rgba(255,255,255,0.87)",
          },
          info: {
            main: "#1e3799",
          },
          success: {
            main: "#78e08f",
          },
          error: {
            main: "#EB1545",
          },
          background: {
            default: mainDarkBackground,
            paper: "rgba(9, 9, 9, 1)",
          },
          divider: "rgba(226,226,226,0.2)",
          common: {
            white: "#fff",
            gray: "rgba(226,226,226,0.5)",
            lightGray: "rgba(226, 226, 226, 1)",
            black: "#000",
          },
        } as ThemeOptions["palette"])),
  },
});

export { getDesignTokens as PerseusColorsGetter };
