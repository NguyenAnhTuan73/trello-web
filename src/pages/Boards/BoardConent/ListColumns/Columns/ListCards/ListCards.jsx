import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { CardItem } from "~/pages/Boards/BoardConent/ListColumns/Columns/ListCards/Card/CardItem";
import theme from "~/theme";

export const ListCards = ({ cards }) => {
  return (
    <>
      <SortableContext
        items={cards?.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: "0 5px 5px 5px",
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
          {cards?.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </Box>
      </SortableContext>
    </>
  );
};
