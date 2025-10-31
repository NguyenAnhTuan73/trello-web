import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import AppBar from "~/components/AppBar";
import BoardBar from "~/pages/Boards/BoardBar";
import BoardContent from "./BoardConent/index";
import lightTheme from "~/theme";

function Board() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
          <AppBar />
          <BoardBar />
          <BoardContent />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Board;
