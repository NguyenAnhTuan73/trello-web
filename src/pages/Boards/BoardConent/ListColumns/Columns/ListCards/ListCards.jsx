import { Box } from "@mui/material";
import { CardItem } from "~/pages/Boards/BoardConent/ListColumns/Columns/ListCards/Card/CardItem";
import theme from "~/theme";

export const ListCards = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: "0 5px",
          m: "0 5px",
          maxHeight: `calc(${theme.trello.boardContentHeight} - ${
            theme.trello.columnHeaderHeight
          } - ${theme.trello.columnFooterHeight} - ${theme.spacing(5)})`,
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "4px",
          },

          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        <CardItem />
        <CardItem />
      </Box>
    </>
  );
};
