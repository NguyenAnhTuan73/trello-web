import { configureStore } from "@reduxjs/toolkit"
import columnReducer from "~/features/column/columnSlice"
import boardReducer from "~/features/board/boardSlice"

export const store = configureStore({
  reducer: {
    column: columnReducer,
    board: boardReducer,
  },
})
