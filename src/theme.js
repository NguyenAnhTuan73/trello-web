import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const common = {
  colorSchemeSelector: "data-attribute",
  trello: {
    appBarHeight: "58px",
    boardBarHeight: "58px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.primary.main,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.vars.palette.primary.main,
          },
          "& fieldset": {
            borderWidth: "1.5px !important",
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          fontSize: "0.875rem",
        }),
      },
    },
  },
};

const theme = extendTheme({
  ...common,
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: teal,
        secondary: deepOrange,
        background: { default: "#f5f5f5", paper: "#ffffff" },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: cyan,
        secondary: orange,
        background: { default: "#121212", paper: "#1e1e1e" },
      },
    },
  },
});

export default theme;
