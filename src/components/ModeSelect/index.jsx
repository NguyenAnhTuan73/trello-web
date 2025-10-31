import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsBrightnessOutlined,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useColorScheme,
} from "@mui/material";
import theme from "~/theme";

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Box
      sx={{
        height: theme.trello.appBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
      }}
    >
      <FormControl size="small">
        <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode || "light"}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value="light">
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "primary.main" }}
            >
              <LightModeOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.main" }}
              />{" "}
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "primary.main" }}
            >
              <DarkModeOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.main" }}
              />{" "}
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "primary.main" }}
            >
              <SettingsBrightnessOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.main" }}
              />{" "}
              System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ModeSelect;
