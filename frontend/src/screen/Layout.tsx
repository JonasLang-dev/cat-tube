import React, { FC, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Container,
  Link as Links,
  ListItemButton,
  Typography,
  PaletteMode,
} from "@mui/material";
import logo from "../logo.svg";
import Copyright from "../components/Copyright";
import {
  Dashboard,
  Download,
  DownloadOutlined,
  Explore,
  ExploreOutlined,
  FeedbackOutlined,
  GitHub,
  History,
  HistoryOutlined,
  Home,
  HomeOutlined,
  InfoOutlined,
  Logout,
  MenuSharp,
  Settings,
  SettingsOutlined,
  Subscriptions,
  SubscriptionsOutlined,
  VideoLibrary,
  VideoLibraryOutlined,
  VideoSettings,
  WorkspacePremium,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";
interface Layout {
  theme: {
    palette: {
      mode: PaletteMode;
    };
  };
  setMode: Function;
}

const Layout: FC<Layout> = ({ theme, setMode }) => {
  const drawerWidth = 240;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? localStorage.setItem("theme", "light")
            : localStorage.setItem("theme", "dark")
          : prefersDarkMode
          ? localStorage.setItem("theme", "light")
          : localStorage.setItem("theme", "dark");
      },
      switchDarkMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.setItem("theme", "dark");
      },
      switchLightMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.setItem("theme", "light");
      },
      switchDefault: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.removeItem("theme");
      },
    }),
    [prefersDarkMode]
  );

  const matches = useMediaQuery("(min-width:1313px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(location.pathname);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        <Avatar /> Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/studio">
        <ListItemIcon>
          <VideoSettings fontSize="small" />
        </ListItemIcon>
        Studio
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
      <Divider />
      <MenuItem onClick={colorMode.toggleColorMode}>
        <ListItemIcon>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon fontSize="small" />
          ) : (
            <Brightness4Icon fontSize="small" />
          )}
        </ListItemIcon>
        外观：
        {localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? "深色主题"
            : "浅色主题"
          : "使用设备主题"}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDarkMode}>
        <ListItemIcon></ListItemIcon>
        深色主题
      </MenuItem>
      <MenuItem onClick={colorMode.switchLightMode}>
        <ListItemIcon></ListItemIcon>
        浅色主题
      </MenuItem>
      <MenuItem onClick={colorMode.switchDefault}>
        <ListItemIcon></ListItemIcon>使用设备主题
      </MenuItem>
    </Menu>
  );

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index: string) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={
          theme.palette.mode == "dark"
            ? {
                backdropFilter: "blur(20px)",
                background: "rgba(0,127,255, 0.4)",
              }
            : {
                backdropFilter: "blur(20px)",
              }
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuSharp />
          </IconButton>

          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex" }}>
            <IconButton color="inherit" size="large">
              <Dashboard />
            </IconButton>
            {/* <Button
              sx={{}}
              color="inherit"
              variant="outlined"
              startIcon={<AccountCircleOutlinedIcon />}
              href="/login"
            >
              SIGN IN
            </Button> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMenu}
      </AppBar>
      <Drawer
        variant={"temporary"}
        sx={
          theme.palette.mode === "dark"
            ? {
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                  background: "rgba(18,18,18,0.6)",
                  backdropFilter: "blur(20px)",
                },
              }
            : {
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }
        }
        anchor="left"
        open={open}
        onClose={handleClose}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuSharp />
          </IconButton>
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </Toolbar>
        <Box sx={{ overflow: "auto" }}>
          <List component="nav" aria-label="home explore">
            <ListItemButton
              component={Link}
              to="/"
              selected={selectedIndex === "/"}
              onClick={() => {
                handleListItemClick("/");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/" ? <Home /> : <HomeOutlined />}
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/explore"
              selected={selectedIndex === "/explore"}
              onClick={() => {
                handleListItemClick("/explore");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/explore" ? (
                  <Explore />
                ) : (
                  <ExploreOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/subscriptions"
              selected={selectedIndex === "/subscriptions"}
              onClick={() => {
                handleListItemClick("/subscriptions");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/subscriptions" ? (
                  <Subscriptions />
                ) : (
                  <SubscriptionsOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/premium"
              selected={selectedIndex === "/premium"}
              onClick={() => {
                handleListItemClick("/premium");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/premium" ? (
                  <WorkspacePremium />
                ) : (
                  <WorkspacePremiumOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Premium" />
            </ListItemButton>
          </List>
          <Divider />
          <List component="nav" aria-label="library history download">
            <ListItemButton
              component={Link}
              to="/library"
              selected={selectedIndex === "/library"}
              onClick={() => {
                handleListItemClick("/library");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/library" ? (
                  <VideoLibrary />
                ) : (
                  <VideoLibraryOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Library" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/history"
              selected={selectedIndex === "/history"}
              onClick={() => {
                handleListItemClick("/history");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/history" ? (
                  <History />
                ) : (
                  <HistoryOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/download"
              selected={selectedIndex === "/download"}
              onClick={() => {
                handleListItemClick("/download");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/download" ? (
                  <Download />
                ) : (
                  <DownloadOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Download" />
            </ListItemButton>
          </List>
          <Divider />
          <List component="nav" aria-label="library history download">
            <ListItemButton
              component={Link}
              to="/settings"
              selected={selectedIndex === "/settings"}
              onClick={() => {
                handleListItemClick("/settings");
                handleClose();
              }}
            >
              <ListItemIcon>
                {selectedIndex === "/settings" ? (
                  <Settings />
                ) : (
                  <SettingsOutlined />
                )}
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton onClick={(event) => console.log(event)}>
              <ListItemIcon>
                <FeedbackOutlined />
              </ListItemIcon>
              <ListItemText primary="Send feedback" />
            </ListItemButton>
            <ListItemButton onClick={(event) => console.log(event)}>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton
              href="https://github.com/Cat-Family/cat-tube"
              component={Links}
            >
              <ListItemIcon>
                <GitHub />
              </ListItemIcon>
              <ListItemText primary="Github" />
            </ListItemButton>
          </List>

          <Typography variant="body2" pl={2} mt={1}>
            About Press Copyright
            <br />
            Contact us Creators
            <br />
            Advertise Developers
            <br />
            Terms Privacy Policy & Safety
            <br />
            How Cat Tube works
            <br />
            Test new features
          </Typography>

          <Copyright sx={{ pt: 2 }} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
