import React, { FC, useEffect, useRef, useState } from "react";
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
  ButtonBase,
  Button,
} from "@mui/material";
import logo from "../../logo.svg";
import Copyright from "../../components/Copyright";
import {
  Business,
  BusinessOutlined,
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
  CheckOutlined,
  ArrowBack,
  ArrowForwardIosOutlined,
  Brightness7Outlined,
  Brightness4Outlined,
  GTranslateOutlined,
  Category,
  CategoryOutlined,
} from "@mui/icons-material";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../..//hooks/redux.hooks";
import {
  clearCurrentUsrState,
  currentUser,
  selectCurrentUserStatus,
} from "../../features/auth/currentUserSlice";

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

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import * as locales from "../../../locales";
import { baseURL } from "../../request";
type SupportedLocales = keyof typeof locales;

interface Admin {
  colorMode: any;
  theme: any;
}

const AdminLayout: FC<Admin> = ({ theme, colorMode }) => {
  const { t, i18n } = useTranslation();
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
  const [anchorThemeMenu, setThemeMenu] = useState<null | HTMLElement>(null);
  const [anchorLangMenu, setLangMenu] = useState<null | HTMLElement>(null);

  const isProfileMenuOpen = Boolean(anchorProfileMenu);
  const isThemeMenuOpen = Boolean(anchorThemeMenu);
  const isLangMenuOpen = Boolean(anchorLangMenu);

  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorProfileMenu(event.currentTarget);

  const changeLanguageHandler = (lang: SupportedLocales) => {
    i18n.changeLanguage(lang);
  };

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
          width: "298px",
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
          src={currentUserInfo && `${baseURL}/${currentUserInfo.avatar}`}
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
      <MenuItem
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={() => {
          setThemeMenu(anchorProfileMenu);
          handleProfileMenuClose();
        }}
      >
        <ListItemIcon>
          {theme.palette.mode === "dark" ? (
            <Brightness7Outlined fontSize="small" />
          ) : (
            <Brightness4Outlined fontSize="small" />
          )}
        </ListItemIcon>
        <Typography sx={{ flexGrow: "1" }}>
          {t("Appearance")}:&nbsp;
          {localStorage.getItem("theme")
            ? localStorage.getItem("theme") === "dark"
              ? t("Dark")
              : t("Light")
            : t("Device theme")}
        </Typography>

        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
      <MenuItem
        sx={{ display: "flex" }}
        onClick={() => {
          setLangMenu(anchorProfileMenu);
          handleProfileMenuClose();
        }}
      >
        <ListItemIcon>
          <GTranslateOutlined />
        </ListItemIcon>
        <Typography sx={{ flexGrow: "1" }}>
          {t("Language")}:&nbsp; {i18n.language === "zhCN" ? "中文" : "English"}
        </Typography>
        <ListItemIcon sx={{ justifyContent: "end" }}>
          <ArrowForwardIosOutlined fontSize="small" />
        </ListItemIcon>
      </MenuItem>
      <Divider />
      <MenuItem
        href="mailto:supercutcat@outlook.com?subject=feedback"
        component={Links}
      >
        <ListItemIcon>
          <FeedbackOutlined fontSize="small" />
        </ListItemIcon>
        {t("Feedback")}
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

  const renderThemeMenu = (
    <Menu
      anchorEl={anchorThemeMenu}
      id="theme-menu"
      keepMounted
      open={isThemeMenuOpen}
      onClose={() => setThemeMenu(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          width: "298px",
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
      <MenuItem
        onClick={() => {
          setAnchorProfileMenu(anchorThemeMenu);
          setThemeMenu(null);
        }}
      >
        <ListItemIcon>
          <ArrowBack fontSize="small" />
        </ListItemIcon>
        {t("Appearance")}
      </MenuItem>
      <Divider />
      <Typography textAlign="center" fontSize="0.4rem" variant="body2">
        {t("Setting applies to this browser only")}
      </Typography>
      <MenuItem onClick={colorMode.switchDefault}>
        <ListItemIcon>
          {!localStorage.getItem("theme") && <CheckOutlined fontSize="small" />}
        </ListItemIcon>
        {t("Use device theme")}
      </MenuItem>
      <MenuItem onClick={colorMode.switchLightMode}>
        <ListItemIcon>
          {localStorage.getItem("theme") && theme.palette.mode === "light" && (
            <CheckOutlined fontSize="small" />
          )}
        </ListItemIcon>
        {t("Light theme")}
      </MenuItem>
      <MenuItem onClick={colorMode.switchDarkMode}>
        <ListItemIcon>
          {localStorage.getItem("theme") && theme.palette.mode === "dark" && (
            <CheckOutlined fontSize="small" />
          )}
        </ListItemIcon>
        {t("Dark theme")}
      </MenuItem>
    </Menu>
  );

  const renderLangMenu = (
    <Menu
      anchorEl={anchorLangMenu}
      id="lang-menu"
      keepMounted
      open={isLangMenuOpen}
      onClose={() => setLangMenu(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          width: "298px",
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
      <MenuItem
        onClick={() => {
          setAnchorProfileMenu(anchorLangMenu);
          setLangMenu(null);
        }}
      >
        <IconButton>
          <ArrowBack fontSize="small" />
        </IconButton>
        {t("Choose your language")}
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => changeLanguageHandler("zhCN" as SupportedLocales)}
      >
        <ListItemIcon>
          {(i18n.language.replace(/\-/, "") === "zhCN" && (
            <CheckOutlined fontSize="small" />
          )) ||
            (window.localStorage.i18n === "zhCN" && (
              <CheckOutlined fontSize="small" />
            ))}
        </ListItemIcon>
        {t("中文 (简体)")}
      </MenuItem>
      <MenuItem
        onClick={() => changeLanguageHandler("enUS" as SupportedLocales)}
      >
        <ListItemIcon>
          {(i18n.language.replace(/\-/, "") === "enUS" && (
            <CheckOutlined fontSize="small" />
          )) ||
            (window.localStorage.i18n === "enUS" && (
              <CheckOutlined fontSize="small" />
            ))}
        </ListItemIcon>
        {t("English (US)")}
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
            primary={t("Post Management")}
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
            primary={t("Auth Management")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/category"
          selected={selectedIndex === "/admin/category"}
          onClick={() => {
            handleListItemClick("/admin/category");
            !matcheWithLg && handleDrawerClose();
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/admin/category" ? (
              <Category />
            ) : (
              <CategoryOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("Category Management")}
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
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={t("Feedback")} />
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

  const getHeader = () => {
    switch (location.pathname) {
      case "/admin":
        return t("User Management");
      case "/admin/auth":
        return t("Auth Management");
      case "/admin/category":
        return t("Category Management");
      case "/admin/video":
        return t("Post Management");
      case "/admin/price":
        return t("Price Management");
      case "/admin/ad":
        return t("Ad Management");
      default:
        return t("Admin");
    }
  };

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
                background: theme.palette.primary.main,
              }
        }
      >
        <Toolbar>
          <EdgeTrigger target={{ anchor: "left", field: "open" }}>
            {(open, setOpen) => (
              <IconButton
                size="large"
                edge="start"
                aria-label="open drawer"
                sx={{ mr: 2, color: "#EAF3FB" }}
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
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              视频点播系统
            </Typography>
          ) : matcheWithSm ? (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              <></>
            </Typography>
          ) : (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              视频点播
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
                src={currentUserInfo && `${baseURL}/${currentUserInfo.avatar}`}
              />
            </IconButton>
          </Box>
        </Toolbar>
        {renderProfileMenu}
        {renderLangMenu}
        {renderThemeMenu}
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
          <Toolbar>
            <Typography variant="h5">{getHeader()}</Typography>
            {location.pathname === "/admin/ad" && (
              <>
                <Box flexGrow={1} />{" "}
                <Button variant="outlined">{t("Add ad")}</Button>
              </>
            )}
          </Toolbar>
          <Outlet />
        </Box>
        <Footer>
          <Copyright sx={{ pt: 4, pr: 10, textAlign: "right" }} />
        </Footer>
      </Content>
      <PostDialog ref={postRef} />
      <AboutDialog ref={aboutRef} />
    </Root>
  );
};

export default AdminLayout;
