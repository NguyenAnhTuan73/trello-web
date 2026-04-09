import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DragHandleOutlined,
  NoteAddOutlined,
} from "@mui/icons-material";
import AddCardIcon from "@mui/icons-material/AddCard";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { ListCards } from "~/pages/Boards/BoardConent/ListColumns/Columns/ListCards/ListCards";

const Columns = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
    // touchAction: "none",
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openNewCard, setOpenNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const handleToggleOpenCard = () => setOpenNewCard(!openNewCard);

  const handleAddColumn = () => {
    if (!newCardTitle) {
      return;
    }
    console.log(newCardTitle);
    handleToggleOpenCard();
    setNewCardTitle("");
  };

  return (
    <div ref={setNodeRef} style={dndKitStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: "background.main",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {column.title}
          </Typography>
          <Box>
            <Tooltip title="More Options">
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "text.primary", cursor: "pointer" }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-column-dropdown",
                },
              }}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                ></Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                ></Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                ></Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                ></Typography>
              </MenuItem>

              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* box list card */}
        <ListCards cards={column.cards} />

        {/* box footer */}

        {openNewCard ? (
          <Box
            sx={{
              minWidth: "250px",

              p: 1,
              borderRadius: "6px",
              height: "100%",
              bgcolor: "#ffffff3d",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              id="outlined-search"
              label="New Card"
              variant="outlined"
              value={newCardTitle}
              autoFocus
              type="text"
              size="small"
              onChange={(e) => setNewCardTitle(e.target.value)}
              sx={{
                width: "100%",
                marginBottom: 1,
                color: "primary.secondary",
                "& label": { color: "primary.secondary" },
                "& label.Mui-focused": { color: "primary.secondary" },
                "& input": { color: "primary.secondary" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.secondary ",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.secondary ",
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
                onClick={handleAddColumn}
              >
                Add
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  cursor: "pointer",
                  color: "warning.main",
                  "&:hover": { color: "warning.light" },
                  transition: "color 0.15s linear",
                }}
                onClick={handleToggleOpenCard}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: (theme) => theme.trello.columnFooterHeight,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleToggleOpenCard} startIcon={<AddCardIcon />}>
              Add new card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleOutlined sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Columns;
