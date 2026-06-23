import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchBoardDetailAPI } from "~/apis/board"
export const refreshDataBoard = createAsyncThunk(
  "board/refreshDataBoard",
  async (boardId) => {
    const response = await fetchBoardDetailAPI(boardId)
    
    return response.data
  },
)

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    boardId: "",
    loading: false,
  },
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    },
    setBoardId: (state, action) => {
      state.boardId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshDataBoard.pending, (state) => {
        state.loading = true
      })

      .addCase(refreshDataBoard.fulfilled, (state, action) => {
        state.loading = false
        state.boards = action.payload
      })

      .addCase(refreshDataBoard.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setBoards, setBoardId } = boardSlice.actions
export default boardSlice.reducer
