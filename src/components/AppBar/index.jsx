import AppsIcon from "@mui/icons-material/Apps";
import {
  Badge,
  Box,
  Button,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import TrelloIcon from "~/assets/trello.svg?react";
import theme from "../../theme";
import ModeSelect from "../ModeSelect";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";
import Workspaces from "~/components/AppBar/Menus/Workspaces";
import Profiles from "~/components/AppBar/Menus/Profiles";

function AppBar() {
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
          // color: "primary.main",
        }}
      >
        <Box
          sx={{
            color: "primary.main",
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
              sx={{ color: "primary.main" }}
              fontSize="small"
            />
            <Typography
              variant="span"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "primary.main",
              }}
            >
              Trello
            </Typography>
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "primary.main",
          }}
        >
          <TextField
            id="outlined-search"
            label="Search..."
            variant="outlined"
            type="search"
            size="small"
            // sx={{ border: "1px solid", borderColor: "primary.main" }}
          />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
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
