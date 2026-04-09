/* eslint-disable no-console */
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchBoardDetailAPI } from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "./BoardConent/BoardContent";
import { mockData } from "~/apis/mock-data";

function Board() {
  const [board, setBoard] = useState(null);

  const getBoardDetail = async (boardId) => {
    try {
      const dataBoard = await fetchBoardDetailAPI(boardId);
      setBoard(dataBoard);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const boardId = "69cf87e4810edb3a061ae30f";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBoardDetail(boardId);
  }, []);
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        {board && <BoardBar board={board} />}
        {board && <BoardContent board={mockData.board} />}
      </Container>
    </>
  );
}

export default Board;
