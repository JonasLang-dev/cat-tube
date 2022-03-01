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
  Button,
} from "@mui/material";
import logo from "../logo.svg";
import Copyright from "../components/Copyright";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  AccountCircleOutlined,
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
  MoreVert,
  Settings,
  SettingsOutlined,
  Subscriptions,
  SubscriptionsOutlined,
  VideoCameraFrontOutlined,
  VideoLibrary,
  VideoLibraryOutlined,
  VideoSettings,
  WorkspacePremium,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { Outlet, Link } from "react-router-dom";

interface Layout {
  theme:
    | {
        palette: {
          mode: PaletteMode;
        };
      }
    | any;
  setMode: Function;
}

const Layout: FC<Layout> = ({ theme, setMode }) => {
  const drawerWidth = 240;
  const matcheWithLg = useMediaQuery("(min-width:900px)");
  const matcheWithsm = useMediaQuery("(max-width:600px)");
  const profileMenuId = "primary-account-menu";
  const menuId = "primary-not-signin-menu";

  const [selectedIndex, setSelectedIndex] = useState(location.pathname);
  const [anchorProfileMenu, setAnchorProfileMenu] =
    useState<null | HTMLElement>(null);
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const isProfileMenuOpen = Boolean(anchorProfileMenu);
  const isMenuOpen = Boolean(anchorMenu);

  const [open, setOpen] = React.useState(false);

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

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorProfileMenu(event.currentTarget);

  const handleProfileMenuClose = () => setAnchorProfileMenu(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorMenu(event.currentTarget);

  const handleMenuClose = () => setAnchorMenu(null);

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorProfileMenu}
      id={profileMenuId}
      keepMounted
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
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
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/profile">
        <Avatar /> &nbsp; supercat
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/studio">
        <ListItemIcon>
          <VideoSettings fontSize="small" />
        </ListItemIcon>
        Studio
      </MenuItem>
      <MenuItem
        onClick={handleProfileMenuClose}
        component={Link}
        to="/settings"
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem component={Link} to="/premium" onClick={handleProfileMenuClose}>
        <ListItemIcon>
          <WorkspacePremium fontSize="small" />
        </ListItemIcon>
        Premium
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/signin">
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
        Theme:&nbsp;
        {localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? "Dark mode"
            : "Light mode"
          : "Default mode"}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDarkMode}>
        <ListItemIcon></ListItemIcon>
        Dark mode
      </MenuItem>
      <MenuItem onClick={colorMode.switchLightMode}>
        <ListItemIcon></ListItemIcon>
        Light mode
      </MenuItem>
      <MenuItem onClick={colorMode.switchDefault}>
        <ListItemIcon></ListItemIcon>Default mode
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <FeedbackOutlined fontSize="small" />
        </ListItemIcon>
        Feedback
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InfoOutlined fontSize="small" />
        </ListItemIcon>
        About
      </MenuItem>
      <MenuItem href="https://github.com/Cat-Family/cat-tube" component={Links}>
        <ListItemIcon>
          <GitHub fontSize="small" />
        </ListItemIcon>
        Github
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorMenu}
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
      <MenuItem to="/signin" onClick={handleMenuClose} component={Link}>
        <ListItemIcon>
          <AccountCircleOutlined />
        </ListItemIcon>
        Sign In
      </MenuItem>
      <MenuItem to="/settings" onClick={handleMenuClose} component={Link}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem to="/premium" onClick={handleMenuClose} component={Link}>
        <ListItemIcon>
          <WorkspacePremium />
        </ListItemIcon>
        Premium
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
        Theme:&nbsp;
        {localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? "Dark mode"
            : "Light mode"
          : "Default mode"}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDarkMode}>
        <ListItemIcon></ListItemIcon>
        Dark mode
      </MenuItem>
      <MenuItem onClick={colorMode.switchLightMode}>
        <ListItemIcon></ListItemIcon>
        Light mode
      </MenuItem>
      <MenuItem onClick={colorMode.switchDefault}>
        <ListItemIcon></ListItemIcon>Default mode
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <FeedbackOutlined fontSize="small" />
        </ListItemIcon>
        Feedback
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InfoOutlined fontSize="small" />
        </ListItemIcon>
        About
      </MenuItem>
      <MenuItem href="https://github.com/Cat-Family/cat-tube" component={Links}>
        <ListItemIcon>
          <GitHub fontSize="small" />
        </ListItemIcon>
        Github
      </MenuItem>
    </Menu>
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index: string) => {
    setSelectedIndex(index);
  };

  const renderDrawerItem = (
    <Box sx={{ overflow: "hidden" }}>
      <List component="nav" aria-label="home explore">
        <ListItemButton
          component={Link}
          to="/"
          selected={selectedIndex === "/"}
          onClick={() => {
            handleListItemClick("/");
            !matcheWithLg && handleClose();
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
            !matcheWithLg && handleClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/explore" ? <Explore /> : <ExploreOutlined />}
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/subscriptions"
          selected={selectedIndex === "/subscriptions"}
          onClick={() => {
            handleListItemClick("/subscriptions");
            !matcheWithLg && handleClose();
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
            !matcheWithLg && handleClose();
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
            !matcheWithLg && handleClose();
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
            !matcheWithLg && handleClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/history" ? <History /> : <HistoryOutlined />}
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/download"
          selected={selectedIndex === "/download"}
          onClick={() => {
            handleListItemClick("/download");
            !matcheWithLg && handleClose();
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
            !matcheWithLg && handleClose();
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

      {!open && matcheWithLg && (
        <>
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
          <Copyright sx={{ pt: 2 }} />{" "}
        </>
      )}
      {open && !matcheWithLg && !matcheWithsm && (
        <>
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
          <Copyright sx={{ pt: 2 }} />{" "}
        </>
      )}

      {matcheWithsm && (
        <>
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
          <Copyright sx={{ pt: 2 }} />{" "}
        </>
      )}
    </Box>
  );

  const DrawerLg = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  const DrawerMd = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={
          matcheWithsm
            ? theme.palette.mode == "dark"
              ? {
                  backdropFilter: "blur(20px)",
                  background: "rgba(0,127,255, 0.6)",
                  transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }
              : {
                  backdropFilter: "blur(20px)",
                  transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                  }),
                }
            : theme.palette.mode == "dark"
            ? {
                backdropFilter: "blur(20px)",
                background: "rgba(0,127,255, 0.6)",
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }
            : {
                backdropFilter: "blur(20px)",
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
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

          {matcheWithLg ? (
            <Typography variant="h6" component="h1">
              ube Video
            </Typography>
          ) : matcheWithsm ? (
            <Typography variant="h6" component="h1">
              <></>
            </Typography>
          ) : (
            <Typography variant="h6" component="h1">
              ube
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" size="large">
              <Dashboard />
            </IconButton>
            <IconButton color="inherit" size="large">
              <VideoCameraFrontOutlined />
            </IconButton>
            <IconButton color="inherit" size="large" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<AccountCircleOutlined />}
              to="/signin"
              component={Link}
            >
              SIGN IN
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
        {renderProfileMenu}
        {renderMenu}
      </AppBar>
      {matcheWithLg ? (
        <DrawerLg variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuSharp />
            </IconButton>
          </Toolbar>
          <Divider />
          {renderDrawerItem}
        </DrawerLg>
      ) : matcheWithsm ? (
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
                    background: "rgba(18,18,18,0.7)",
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
            <Typography variant="h6" component="h1">
              ube
            </Typography>
          </Toolbar>
          {renderDrawerItem}
        </Drawer>
      ) : (
        <DrawerMd variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuSharp />
            </IconButton>
          </Toolbar>
          <Divider />
          {renderDrawerItem}
        </DrawerMd>
      )}
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
