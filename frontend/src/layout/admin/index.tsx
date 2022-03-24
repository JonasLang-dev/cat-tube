import React, { FC, useContext, useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Link as Links,
  ListItemButton,
  Typography,
  Button,
  Badge,
  SwipeableDrawer,
  ButtonBase,
} from "@mui/material";
import logo from "../../logo.svg";
import Copyright from "../../components/Copyright";
import {
  Adb,
  Business,
  BusinessOutlined,
  ChevronLeft,
  ChevronRight,
  CopyrightOutlined,
  CopyrightRounded,
  FeedbackOutlined,
  GitHub,
  InfoOutlined,
  Logout,
  MenuSharp,
  PriceChange,
  PriceChangeOutlined,
  SupervisedUserCircle,
  SupervisedUserCircleOutlined,
  VerifiedUser,
  VerifiedUserOutlined,
  VideoFile,
  VideoFileOutlined,
  VideoSettings,
  YouTube,
} from "@mui/icons-material";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../..//hooks/redux.hooks";
import {
  clearCurrentUsrState,
  currentUser,
  selectCurrentUserStatus,
} from "../../features/auth/currentUserSlice";

import {
  AppBar,
  CosDrawer,
  CoslDrawer,
  DrawerHeader,
  drawerWidth,
} from "./components";
import { useTranslation } from "react-i18next";
import PostDialog from "../../components/PostDialog";
import AboutDialog from "../../components/AboutDialog";
import {
  Root,
  Header,
  EdgeTrigger,
  EdgeSidebar,
  SidebarContent,
  Content,
  Footer,
  getCozyScheme,
} from "@mui-treasury/layout";

import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface Admin {
  colorMode: any;
  theme: any;
}

const AdminLayout: FC<Admin> = ({ theme, colorMode }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const matcheWithLg = useMediaQuery("(min-width:1200px)");
  const matcheWithSm = useMediaQuery("(max-width:600px)");
  const profileMenuId = "primary-account-menu";
  const postRef = useRef<any>();
  const aboutRef = useRef<any>();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(location.pathname);
  const [anchorProfileMenu, setAnchorProfileMenu] =
    useState<null | HTMLElement>(null);

  const isProfileMenuOpen = Boolean(anchorProfileMenu);

  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorProfileMenu(event.currentTarget);

  const handleProfileMenuClose = () => setAnchorProfileMenu(null);

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
        <Avatar
          alt={currentUserInfo && currentUserInfo.name}
          src={currentUserInfo && currentUserInfo.avatar}
        />
        &nbsp; {currentUserInfo && currentUserInfo.name}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/">
        <ListItemIcon>
          <YouTube fontSize="small" />
        </ListItemIcon>
        {t("logo")}
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose} component={Link} to="/studio">
        <ListItemIcon>
          <VideoSettings fontSize="small" />
        </ListItemIcon>
        {t("studio")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(clearCurrentUsrState());
          navigate("/users/signin", { replace: true });
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t("logout")}
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
        {t("theme")}:&nbsp;
        {localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? t("dark")
            : t("light")
          : t("default")}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDarkMode}>
        <ListItemIcon></ListItemIcon>
        {t("dark")}
      </MenuItem>
      <MenuItem onClick={colorMode.switchLightMode}>
        <ListItemIcon></ListItemIcon>
        {t("light")}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDefault}>
        <ListItemIcon></ListItemIcon>
        {t("default")}
      </MenuItem>
      <Divider />
      <MenuItem
        href="mailto:supercutcat@outlook.com?subject=feedback"
        component={Links}
      >
        <ListItemIcon>
          <FeedbackOutlined fontSize="small" />
        </ListItemIcon>
        {t("feedback")}
      </MenuItem>
      <MenuItem
        onClick={() => {
          aboutRef.current.handleClickOpen();
        }}
      >
        <ListItemIcon>
          <InfoOutlined fontSize="small" />
        </ListItemIcon>
        {t("about")}
      </MenuItem>
      <MenuItem
        href="https://github.com/Cat-Family/cat-tube"
        target="_blank"
        component={Links}
      >
        <ListItemIcon>
          <GitHub fontSize="small" />
        </ListItemIcon>
        Github
      </MenuItem>
    </Menu>
  );

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index: string) => {
    setSelectedIndex(index);
  };

  const renderDrawerItem = (
    <>
      <List component="nav" aria-label="home explore">
        <ListItemButton
          component={Link}
          to="/admin"
          selected={selectedIndex === "/admin"}
          onClick={() => {
            handleListItemClick("/admin");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin" ? (
              <SupervisedUserCircle />
            ) : (
              <SupervisedUserCircleOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("admin.user")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/auth"
          selected={selectedIndex === "/admin/auth"}
          onClick={() => {
            handleListItemClick("/admin/auth");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/auth" ? (
              <VerifiedUser />
            ) : (
              <VerifiedUserOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("admin.auth")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/copyright"
          selected={selectedIndex === "/admin/copyright"}
          onClick={() => {
            handleListItemClick("/admin/copyright");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/copyright" ? (
              <CopyrightRounded />
            ) : (
              <CopyrightOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("admin.copyright")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/video"
          selected={selectedIndex === "/admin/video"}
          onClick={() => {
            handleListItemClick("/admin/video");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/video" ? (
              <VideoFile />
            ) : (
              <VideoFileOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("admin.video")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/price"
          selected={selectedIndex === "/admin/price"}
          onClick={() => {
            handleListItemClick("/admin/price");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/price" ? (
              <PriceChange />
            ) : (
              <PriceChangeOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("admin.price")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/ad"
          selected={selectedIndex === "/admin/ad"}
          onClick={() => {
            handleListItemClick("/admin/ad");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/ad" ? (
              <Business />
            ) : (
              <BusinessOutlined />
            )}
          </ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={t("admin.ad")} />
        </ListItemButton>
      </List>

      <Divider />
      <List component="nav" aria-label="feedback about Github">
        <ListItemButton
          href="mailto:supercutcat@outlook.com?subject=feedback"
          component={Links}
        >
          <ListItemIcon>
            <FeedbackOutlined />
          </ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={t("feedback")} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            aboutRef.current.handleClickOpen();
          }}
        >
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={t("about")} />
        </ListItemButton>
        <ListItemButton
          href="https://github.com/Cat-Family/cat-tube"
          target="_blank"
          component={Links}
        >
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary="Github" />
        </ListItemButton>
      </List>
    </>
  );

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(currentUser(localStorage.getItem("accessToken") as string));
    } else {
      navigate("/users/signin", { replace: true });
    }
  }, [localStorage]);
  const scheme = getCozyScheme();

  return (
    <Root scheme={scheme}>
      <CssBaseline />
      <Header
        sx={
          theme.palette.mode == "dark"
            ? {
                backdropFilter: "blur(20px)",
                background: "rgba(0,127,255, 0.6)",
              }
            : {
                backdropFilter: "blur(20px)",
              }
        }
      >
        <Toolbar>
          <EdgeTrigger target={{ anchor: "left", field: "open" }}>
            {(open, setOpen) => (
              <IconButton
                color="inherit"
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowLeft /> : <MenuSharp />}
              </IconButton>
            )}
          </EdgeTrigger>

          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>

          {matcheWithLg ? (
            <Typography variant="h6" component="h1">
              ube Video
            </Typography>
          ) : matcheWithSm ? (
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                alt={currentUserInfo && currentUserInfo.name}
                src={currentUserInfo && currentUserInfo.avatar}
              />
            </IconButton>
          </Box>
        </Toolbar>
        {renderProfileMenu}
      </Header>
      <EdgeSidebar anchor="left">
        <SidebarContent>{renderDrawerItem}</SidebarContent>
        <EdgeTrigger target={{ anchor: "left", field: "collapsed" }}>
          {(collapsed, setCollapsed) => (
            <ButtonBase
              onClick={() => setCollapsed(!collapsed)}
              sx={{ flexGrow: 1, height: 48 }}
            >
              {collapsed ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </ButtonBase>
          )}
        </EdgeTrigger>
      </EdgeSidebar>
      <Content>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            minHeight: "100%",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Content>
      <PostDialog ref={postRef} />
      <AboutDialog ref={aboutRef} />
    </Root>
  );
};

export default AdminLayout;
