import { Box } from "@mui/material";
import theme from "../../../theme";

function BoardContent() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        }}
      >
        Box content
      </Box>
    </div>
  );
}

export default BoardContent;
