import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Autocomplete,
  Avatar,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,

  ListItemText,
  ListSubheader,
  TextField,
} from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  GTranslateOutlined,
  Notifications,
  PasswordOutlined,
} from "@mui/icons-material";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { styled } from "@mui/material/styles";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  margin: 7,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function Settings() {
  const [value, setValue] = React.useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "92vh",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab disabled label="设置" />
        <Tab label="账户" {...a11yProps(0)} />
        <Tab label="应用" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <List subheader={<ListSubheader>账户设置</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <PasswordOutlined />
            </ListItemIcon>
            <ListItemText id="change-password-list-label" primary="密码修改" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>test</Avatar>
            </ListItemAvatar>
            <ListItemText id="avatar-list-label" primary="用户" />
          </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List subheader={<ListSubheader>应用设置</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText id="switch-list-label-notice" primary="桌面通知" />
            <Switch
              // onChange={handleToggle("wifi")}
              // checked={checked.indexOf("wifi") !== -1}
              inputProps={{
                "aria-labelledby": "switch-list-label-wifi",
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <GTranslateOutlined />
            </ListItemIcon>
            <ListItemText id="switch-list-label-notice" primary="语言" />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[
                { label: "The Shawshank Redemption", year: 1994 },
                { label: "The Godfather", year: 1972 },
              ]}
              sx={{ pl: 4, width: 140 }}
              renderInput={(params) => <TextField {...params} label="语言" />}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LightModeRoundedIcon />
            </ListItemIcon>
            <ListItemText
              sx={{ whiteSpace: "nowrap" }}
              id="switch-list-label-theme"
              primary="外观"
            />
            <FormGroup row sx={{ pl: 4, width: 200 }}>
              <FormControlLabel
                control={<IOSSwitch />}
                labelPlacement="start"
                label="设备主题"
              />
              <FormControlLabel
                control={<MaterialUISwitch />}
                label="主题切换"
                labelPlacement="start"
              />
            </FormGroup>
          </ListItem>
        </List>
      </TabPanel>
    </Box>
  );
}

export default Settings;
