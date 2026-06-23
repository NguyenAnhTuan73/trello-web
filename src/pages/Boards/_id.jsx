/* eslint-disable no-console */
import { Container } from "@mui/material"
import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { fetchBoardDetailAPI, updateBoardDetailAPI } from "~/apis/board"
import AppBar from "~/components/AppBar/AppBar"

import { isEmpty } from "lodash"
import { createNewCardAPI } from "~/apis/cards"
import { createNewColumnAPI } from "~/apis/columns"
import { setBoardId } from "~/features/board/boardSlice"
import BoardBar from "~/pages/Boards/BoardBar/BoardBar"
import { generatePlaceholderCard } from "~/utils/sorts"
import BoardContent from "./BoardConent/BoardContent"

function Board() {
  // const board = useSelector((state) => state.board.boards)
  const [dataBoard, setDataBoard] = useState(null)

  const dispatch = useDispatch()
  const getDataBoard = async (boardId) => {
    try {
      const data = await fetchBoardDetailAPI(boardId)
      data.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
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
        columnToUpdate.cards.push(response)
        columnToUpdate.cardOrderIds.push(response._id)
        setDataBoard(newBoard)
      }
    }
  }

  const moveColumns = async (newOrderedColumns) => {
    const newColumnOrderIds = newOrderedColumns.map((c) => c._id)
    setDataBoard((prev) => ({
      ...prev,
      columns: newOrderedColumns,
      columnOrderIds: newColumnOrderIds,
    }))
    console.log("🚀 ~ moveColumns ~ newOrderedColumns:", newOrderedColumns)
    await updateBoardDetailAPI(dataBoard._id, {
      columnOrderIds: newColumnOrderIds,
    })
  }

  useEffect(() => {
    const boardId = "6a02e3c917da318b1ead180f"
    dispatch(setBoardId(boardId))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDataBoard(boardId)
  }, [])

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
          />
        )}
      </Container>
    </>
  )
}

export default Board
