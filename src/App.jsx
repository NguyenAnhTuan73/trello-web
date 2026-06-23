import { ThemeProvider } from "@emotion/react"
import "./App.css"
import Board from "./pages/Boards/_id"
import theme from "~/theme"
function App() {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="system">
        <Board />
      </ThemeProvider>
    </>
  )
}

export default App
