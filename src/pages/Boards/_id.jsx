import { Button, Container, useColorScheme } from "@mui/material";
import AppBar from "../../components/AppBar";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardConent";

function Board() {
  function ModeToggle() {
    const { mode, setMode } = useColorScheme();

    return (
      <Button
        onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
        }}
      >
        {mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </Button>
    );
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar />
        <BoardContent />
      </Container>
    </>
  );
}

export default Board;
