import { SearchOutlined } from "@mui/icons-material";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Badge,
  Box,
  Button,
  InputAdornment,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TrelloIcon from "~/assets/trello.svg?react";
import Profiles from "~/components/AppBar/Menus/Profiles";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";
import Workspaces from "~/components/AppBar/Menus/Workspaces";
import theme from "../../theme";
import ModeSelect from "../ModeSelect/ModeSelect";
import { useState } from "react";

function AppBar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: () => theme.trello.appBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "primary.main",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {" "}
          <AppsIcon />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              sx={{ color: "white" }}
              fontSize="small"
            />
            <Typography
              variant="span"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "white",
              }}
            >
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button
              sx={{
                color: "white",
                border: "none",
                "&:hover": { border: "none" },
              }}
              variant="outlined"
              startIcon={<LibraryAddIcon />}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "white",
          }}
        >
          <TextField
            id="outlined-search"
            label="Search"
            variant="outlined"
            value={searchValue}
            type="text"
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      cursor: "pointer",
                      color: searchValue ? "white" : "transparent",
                    }}
                    onClick={() => setSearchValue("")}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              minWidth: "120px",
              maxWidth: "180px",
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
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
          <Profiles />
        </Box>
      </Box>
    </>
  );
}

export default AppBar;
