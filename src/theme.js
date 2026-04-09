// import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "58px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";
const common = {
  colorSchemeSelector: "data-attribute",
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "4px",
          },

          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          fontSize: "0.875rem",

          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "1px !important",
          },
          "& .Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({
          fontSize: "0.875rem",
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: () => ({
          ".MuiTypography-body1": {
            fontSize: "0.875rem",
          },
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
        primary: { main: "#2980b9", secondary: "#1976d2", text: "#fff" },
        warning: {
          main: "#ed6c02", // cam chuẩn (Material UI default)
          light: "#ff9800", // sáng hơn (hover/background nhẹ)
          dark: "#e65100", // đậm hơn (active)
          contrastText: "#fff", // chữ trên nền warning
        },
        background: { main: "#ebecf0", paper: "#ffffff" },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: { main: "#34495e", secondary: "#fff", text: "#fff" },
        warning: {
          main: "#ffa726", // cam sáng hơn để nổi trên nền tối
          light: "#ffb74d",
          dark: "#f57c00",
          contrastText: "#000", // dark mode thường dùng chữ đen trên màu sáng
        },
        background: { main: "#121212", paper: "#1e1e1e" },
      },
    },
  },
});

export default theme;
// "#333643" : "#ebecf0",
