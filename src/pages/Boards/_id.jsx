import { Container, ThemeProvider } from "@mui/material";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "./BoardConent/BoardContent";
import theme from "~/theme";
import { mockData } from "~/apis/mock-data";

function Board() {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="system">
        <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
          <AppBar />
          <BoardBar board={mockData.board} />
          <BoardContent board={mockData.board} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Board;
