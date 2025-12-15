import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NoteAddOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Columns from "~/pages/Boards/BoardConent/ListColumns/Columns/Columns";

export const ListColumns = ({ columns }) => {
  return (
    <SortableContext
      items={columns?.map((item) => item._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        {columns.map((column) => (
          <Columns key={column._id} column={column} />
        ))}

        {/* box and new column */}
        <Box
          sx={{
            minWidth: "200px",
            maxWidth: "200px",
            mx: 2,
            borderRadius: "6px",
            height: "fit-content",
            bgcolor: "#ffffff3d",
          }}
        >
          <Button
            startIcon={<NoteAddOutlined />}
            sx={{
              color: "white",
              width: "100%",
              justifyContent: "flex-start",
              pl: 2,
              py: 1,
            }}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
};
