import { Box } from "@mui/material";
import theme from "../../../theme";

export default function BoardBar() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: () => theme.trello.boardBarHeight,
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        Board Bar
      </Box>
    </>
  );
}
