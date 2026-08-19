/* eslint-disable no-console */
import { Box, CircularProgress, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import {
  fetchBoardDetailAPI,
  moveCardToDifferentColumnAPI,
  updateBoardDetailAPI,
} from "~/apis/board"
import AppBar from "~/components/AppBar/AppBar"

import { isEmpty } from "lodash"
import { createNewCardAPI } from "~/apis/cards"
import { createNewColumnAPI, deleteColumnDetailAPI, updateColumnDetailAPI } from "~/apis/columns"
import { setBoardId } from "~/features/board/boardSlice"
import BoardBar from "~/pages/Boards/BoardBar/BoardBar"
import { generatePlaceholderCard, mapOrder } from "~/utils/sorts"
import BoardContent from "./BoardConent/BoardContent"

function Board() {
  // const board = useSelector((state) => state.board.boards)
  const [dataBoard, setDataBoard] = useState(null)

  const dispatch = useDispatch()
  const getDataBoard = async (boardId) => {
    try {
      const data = await fetchBoardDetailAPI(boardId)

      data.columns = mapOrder(data.columns, data.columnOrderIds, "_id")
      // data.columns.forEach((column) => {
      //   if (isEmpty(column?.cards)) {
      //     column.cards = [generatePlaceholderCard(column)]
      //     column.cardOrderIds = [generatePlaceholderCard(column)?._id]
      //   } else {
      //     column.cards = mapOrder(column.cards, column.cardOrderIds, "_id")
      //   }
      // })

      setDataBoard(data)
    } catch (error) {
      console.error("Error fetching board detail:", error)
    }
  }

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI(newColumnData)

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    setDataBoard((prev) => ({
      ...prev,
      columns: [...prev.columns, createdColumn],
      columnOrderIds: [...prev.columnOrderIds, createdColumn._id],
    }))
  }

  const createNewCard = async (dataNewCard) => {
    const response = await createNewCardAPI(dataNewCard)

    if (response) {
      const newBoard = { ...dataBoard }
      const columnToUpdate = newBoard.columns.find(
        (column) => column._id === response.columnId,
      )

      if (columnToUpdate) {
        if (columnToUpdate.cards.some((card) => card.Fe_PlaceholderCard)) {
          columnToUpdate.cards = [response]
        } else {
          columnToUpdate.cards.push(response)
          columnToUpdate.cardOrderIds.push(response._id)
        }
      }

      setDataBoard(newBoard)
    }
  }

  const moveColumns = (newOrderedColumns) => {
    const newColumnOrderIds = newOrderedColumns.map((c) => c._id)
    setDataBoard((prev) => ({
      ...prev,
      columns: newOrderedColumns,
      columnOrderIds: newColumnOrderIds,
    }))

    updateBoardDetailAPI(dataBoard._id, {
      columnOrderIds: newColumnOrderIds,
    })
  }
  const moveCardInColumn = (newOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...dataBoard }
    const columnToUpdate = newBoard.columns?.find(
      (column) => column._id === columnId,
    )

    if (columnToUpdate) {
      columnToUpdate.cards = newOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setDataBoard(newBoard)
    //

    updateColumnDetailAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    })
  }

  useEffect(() => {
    const boardId = "6a02e3c917da318b1ead180f"
    dispatch(setBoardId(boardId))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDataBoard(boardId)
  }, [])

  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns,
  ) => {
    const newColumnOrderIds = dndOrderedColumns?.map((c) => c._id)

    setDataBoard((prev) => ({
      ...prev,
      columns: dndOrderedColumns,
      columnOrderIds: newColumnOrderIds,
    }))
    let prevCardOrderIds = dndOrderedColumns?.find(
      (c) => c._id === prevColumnId,
    )?.cardOrderIds
    // Xu lý vấn đề khi kéo card cuối cùng ra khỏi column
    if (prevCardOrderIds?.[0]?.includes("-placeholder-card")) {
      prevCardOrderIds = []
    }

    let nextCardOrderIds = dndOrderedColumns?.find(
      (c) => c._id === nextColumnId,
    )?.cardOrderIds

    if (nextCardOrderIds?.[0]?.includes("-placeholder-card")) {
      nextCardOrderIds = [nextCardOrderIds[0].replace("-placeholder-card", "")]
    }
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds,
    })
  }

  const handleDeleteColumn = (columnId) => {
    console.log("Delete column with ID:", columnId)
    deleteColumnDetailAPI(columnId)
  }

  if (!dataBoard) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />

        {dataBoard && <BoardBar board={dataBoard} />}
        {dataBoard && (
          <BoardContent
            board={dataBoard}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
            moveColumns={moveColumns}
            moveCardInColumn={moveCardInColumn}
            moveCardToDifferentColumn={moveCardToDifferentColumn}
            handleDeleteColumn={handleDeleteColumn}
          />
        )}
      </Container>
    </>
  )
}

export default Board
