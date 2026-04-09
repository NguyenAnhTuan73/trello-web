import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NoteAddOutlined } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Columns from "~/pages/Boards/BoardConent/ListColumns/Columns/Columns";
export const ListColumns = ({ columns }) => {
  const [openNewColumn, setOpenNewColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const toggleOpen = () => setOpenNewColumn(!openNewColumn);

  const handleAddColumn = () => {
    if (!newColumnTitle) {
      return;
    }
    console.log(newColumnTitle);
    toggleOpen();
  };

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
        {columns?.map((column) => (
          <Columns key={column._id} column={column} />
        ))}

        {/* box and new column */}
        {!openNewColumn ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
            onClick={() => toggleOpen()}
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
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter column title..."
              variant="outlined"
              value={newColumnTitle}
              autoFocus
              type="text"
              size="small"
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                width: "100%",
                marginBottom: 1,
                color: "white",
                "& label": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& input": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white ",
                  },
                  "&:hover fieldset": {
                    borderColor: "white ",
                  },
                },
              }}
              // sx={{ border: "1px solid", borderColor: "primary.main" }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                size="small"
                startIcon={<NoteAddOutlined />}
                sx={{
                  boxShadow: "none",
                  border: "0.5px soild ",

                  justifyContent: "flex-start",
                }}
                onClick={() => handleAddColumn()}
              >
                Add cloumn
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  cursor: "pointer",
                  color: "white",
                  "&:hover": { color: "primary.secondary" },
                  transition: "color 0.15s linear",
                }}
                onClick={() => toggleOpen()}
              />
            </Box>
            <Box></Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};
