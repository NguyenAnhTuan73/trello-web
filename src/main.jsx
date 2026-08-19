import { CssBaseline } from "@mui/material"
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import theme from "./theme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Provider } from "react-redux"
import { store } from "~/app/store.js"
import { ConfirmProvider } from "material-ui-confirm"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        confirmationText: "Delete",
      cancellationText: "Cancel",
      confirmationButtonProps: {
        color: "error",
      },
      }}>
        <CssVarsProvider theme={theme} defaultMode="system">
          <CssBaseline />

          <App />
          <ToastContainer />
        </CssVarsProvider>
      </ConfirmProvider>
    </Provider>
  </StrictMode>,
)
