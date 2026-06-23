import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"
import { NoteAddOutlined } from "@mui/icons-material"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, TextField } from "@mui/material"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

import Columns from "~/pages/Boards/BoardConent/ListColumns/Columns/Columns"
export const ListColumns = ({ columns, createNewColumn, createNewCard }) => {
  // const columns = board?.columns

  const [openNewColumn, setOpenNewColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState("")
  const toggleOpen = () => setOpenNewColumn(!openNewColumn)

  const boardId = useSelector((state) => {
    return state.board.boardId
  })

  const handleAddColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Please enter Column Title", {
        position: "bottom-right",
        autoClose: 2000,
      })
      return
    }
    const data = {
      boardId: boardId,
      title: newColumnTitle,
    }

    try {
      await createNewColumn(data)
      setNewColumnTitle("")
      toggleOpen()
    } catch (error) {
      // await dispatch(refreshDataBoard(boardId))
      toast.error("Failed to create column. Please try again.", {})
    }
  }

  // const createNewColumn = async (newColumn) => {
  //   const response = await createNewColumnAPI(newColumn)
  //   if (response.statusCode === 201) {
  //     toast.success(response.message, {
  //       position: "bottom-right",
  //     })
  //   }
  //   return response
  // }

  const handleChangeTitle = useCallback((e) => {
    setNewColumnTitle(e.target.value)
  }, [])

  return (
    <SortableContext
      items={columns?.map((item) => item?._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns?.map((column) => (
          <Columns
            key={column?._id}
            column={column}
            createNewCard={createNewCard}
          />
        ))}

        {/* box and new column */}
        {!openNewColumn ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
            onClick={() => toggleOpen()}
          >
            <Button
              startIcon={<NoteAddOutlined />}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2,
                py: 1,
              }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <TextField
              id="outlined-search"
              label="New column"
              variant="outlined"
              value={newColumnTitle}
              autoFocus
              type="text"
              size="small"
              onChange={(e) => handleChangeTitle(e)}
              sx={{
                width: "100%",
                marginBottom: 1,
                color: "white",
                "& label": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& input": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white ",
                  },
                  "&:hover fieldset": {
                    borderColor: "white ",
                  },
                },
              }}
              // sx={{ border: "1px solid", borderColor: "primary.main" }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<NoteAddOutlined />}
                sx={{
                  boxShadow: "none",
                  border: "0.5px soild ",

                  justifyContent: "flex-start",
                }}
                onClick={() => handleAddColumn()}
              >
                Add cloumn
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  cursor: "pointer",
                  color: "white",
                  "&:hover": { color: "primary.secondary" },
                  transition: "color 0.15s linear",
                }}
                onClick={() => toggleOpen()}
              />
            </Box>
            <Box></Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}
