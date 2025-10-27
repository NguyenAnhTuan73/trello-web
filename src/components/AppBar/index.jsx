import { Box } from "@mui/material";
import theme from "../../theme";
import ModeSelect from "../ModeSelect";

function AppBar() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: () => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <ModeSelect />
      </Box>
    </>
  );
}

export default AppBar;
