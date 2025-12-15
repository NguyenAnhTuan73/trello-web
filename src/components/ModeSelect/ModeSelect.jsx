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
        <InputLabel
          sx={{
            color: "white",
            "&.Mui-focused": { color: "primary.main" },
            "&.Mui-selected": { color: "primary.main" },
          }}
          id="label-select-dark-light-mode"
        >
          Mode
        </InputLabel>
        <Select
          labelId="label-select-dark-light-mode"
          id="select-dark-light-mode"
          value={mode || "light"}
          label="Mode"
          onChange={handleChange}
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
        >
          <MenuItem value="light">
            <Box display="flex" alignItems="center" sx={{ color: "white" }}>
              <LightModeOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.secondary" }}
              />{" "}
              Light
            </Box>
          </MenuItem>
          <MenuItem value="dark">
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "primary.secondary" }}
            >
              <DarkModeOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.secondary" }}
              />{" "}
              Dark
            </Box>
          </MenuItem>
          <MenuItem value="system">
            <Box
              display="flex"
              alignItems="center"
              sx={{ color: "primary.secondary" }}
            >
              <SettingsBrightnessOutlined
                fontSize="small"
                sx={{ mr: 1, color: "primary.secondary" }}
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
