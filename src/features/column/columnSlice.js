import { createSlice } from "@reduxjs/toolkit"

const columnSlice = createSlice({
  name: "column",
  initialState: {
    newColumn: {
      title: "",
      boardId: "",
    },
  },
  reducers: {
    setNewColumn: (state, action) => {
      state.newColumn = action.payload
    },
  },
})

export const { setNewColumn } = columnSlice.actions
export default columnSlice.reducer
