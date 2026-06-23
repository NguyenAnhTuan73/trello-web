import DashboardIcon from "@mui/icons-material/Dashboard"
import VpnLockIcon from "@mui/icons-material/VpnLock"
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material"

import AddToDriveIcon from "@mui/icons-material/AddToDrive"
import BoltIcon from "@mui/icons-material/Bolt"
import FilterListIcon from "@mui/icons-material/FilterList"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import theme from "~/theme"
import { capitalizeFirstLetter } from "~/utils/formatters"

export default function BoardBar(props) {
  // const { board } = props;
  const board = useSelector((state) => state.board.boards)

  const originOrderItems = [
    { id: "item-1", content: "Item 1" },
    { id: "item-2", content: "Item 2" },
    { id: "item-3", content: "Item 3" },
    { id: "item-4", content: "Item 4" },
  ]
  const itemOrderId = ["item-1", "item-4", "item-3", "item-2"]
  const key = "id"
  function fastSort(list, order, key) {
    const map = new Map(list.map((item) => [item[key], item]))

    return order.map((id) => map.get(id))
  }
  useEffect(() => {
    fastSort(originOrderItems, itemOrderId, key)
  }, [])
  const MENU_STYLE = {
    color: "white",
    bgcolor: "transparent",
    border: "none",
    paddingX: "5px",
    borderRadius: "4px",
    "& .MuiSvgIcon-root": { fontSize: "20px", color: "white" },
    "&:hover": { bgcolor: "primary.50" },
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: () => theme.trello.boardBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",

          paddingX: 2,
          bgcolor: "primary.secondary",
          "&::-webkit-scrollbar-track": {
            m: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip title={board?.title}>
            <Chip
              sx={MENU_STYLE}
              icon={<DashboardIcon />}
              label={board?.title || "Board Title"}
              clickable
            />
          </Tooltip>
          <Chip
            sx={MENU_STYLE}
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type || "public")}
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLE}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{ color: "white", borderColor: "white" }}
          >
            Invie
          </Button>
          <AvatarGroup
            max={2}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: 16,
                border: "none",
                gap: "10px",
                color: "white",
                cursor: "pointer",
                "&:first-of-type": { bgcolor: "#a4b0de" },
              },
            }}
          >
            <Tooltip title="Remy Sharp">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="Remy Sharp">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="Remy Sharp">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Tooltip>
            <Tooltip title="Remy Sharp">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  )
}
