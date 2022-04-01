import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  Backdrop,
  CircularProgress,
  Link as Links,
  ListItemButton,
  Typography,
} from "@mui/material";
import logo from "../../logo.svg";
import Copyright from "../../components/Copyright";
import {
  GTranslateOutlined,
  AdminPanelSettings,
  DashboardCustomize,
  DashboardCustomizeOutlined,
  FeedbackOutlined,
  GitHub,
  InfoOutlined,
  Logout,
  MenuSharp,
  VideoCameraFrontOutlined,
  VideoFile,
  VideoFileOutlined,
  YouTube,
  CheckOutlined,
  ArrowBack,
  ArrowForwardIosOutlined,
  Brightness7Outlined,
  Brightness4Outlined,
  PostAddOutlined,
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
import ButtonBase from "@mui/material/ButtonBase";
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
import { DropzoneDialogBase, FileObject } from "mui-file-dropzone";
import axiosInstance from "../../request";
import { useSnackbar } from "notistack";
import * as locales from "../../../locales";
type SupportedLocales = keyof typeof locales;

interface Studio {
  colorMode: any;
  theme: any;
}

const StudioLayout: FC<Studio> = ({ theme, colorMode }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const matcheWithLg = useMediaQuery("(min-width:1200px)");
  const matcheWithSm = useMediaQuery("(max-width:600px)");
  const profileMenuId = "primary-account-menu";
  const { enqueueSnackbar } = useSnackbar();
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

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorProfileMenu(event.currentTarget);
  const [showAddVideosForm, setShowAddVideosForm] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

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
      {currentUserInfo?.isAdmin && (
        <MenuItem onClick={handleProfileMenuClose} component={Link} to="/admin">
          <ListItemIcon>
            <AdminPanelSettings fontSize="small" />
          </ListItemIcon>
          {t("admin")}
        </MenuItem>
      )}
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

  const handleListItemClick = (index: string) => {
    setSelectedIndex(index);
  };

  const renderDrawerItem = (
    <>
      <List component="nav" aria-label="home explore">
        <ListItemButton
          component={Link}
          to="/studio"
          selected={selectedIndex === "/studio"}
          onClick={() => {
            handleListItemClick("/studio");
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/studio" ? (
              <DashboardCustomize />
            ) : (
              <DashboardCustomizeOutlined />
            )}
          </ListItemIcon>
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("Dashboard")}
          />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/studio/video"
          selected={selectedIndex === "/studio/video"}
          onClick={() => {
            handleListItemClick("/studio/video");
          }}
        >
          <ListItemIcon>
            {selectedIndex === "/studio/video" ? (
              <VideoFile />
            ) : (
              <VideoFileOutlined />
            )}
          </ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={t("Content")} />
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
  const scheme = getCozyScheme();

  const uploadVideoHandler = async () => {
    // const bodyFormData = new FormData();
    // bodyFormData.append("video", uploadFiles[0].data);
    setShowBackdrop(true);
    try {
      const { data } = await axiosInstance.post(
        "/api/upload/video",
        { video: uploadFiles[0].data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      postRef.current.setVideoUrl(data.message);
      setUploadFiles([]);
      setShowBackdrop(false);
      setShowAddVideosForm(false);
      postRef.current.handleClickOpen();
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message || error.message, {
        variant: "error",
      });
      setShowBackdrop(false);
    }
  };

  const getHeader = () => {
    switch (location.pathname) {
      case "/studio":
        return t("Dashboard");
      case "/studio/video":
        return t("Channel content");
      default:
        return t("Studio");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(currentUser(localStorage.getItem("accessToken") as string));
    } else {
      navigate("/users/signin", { replace: true });
    }
  }, [localStorage]);

  useLayoutEffect(() => {
    if (location.search === "?upload=video") {
      setShowAddVideosForm(true);
    }
  }, [location.search]);

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
                sx={{ mr: 2, color: "#EAF3FB" }}
                size="large"
                edge="start"
                aria-label="open drawer"
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
              ube Studio
            </Typography>
          ) : matcheWithSm ? (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              <></>
            </Typography>
          ) : (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              &nbsp;Studio
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
          }}
        >
          <Toolbar>
            <Typography variant="h5">{getHeader()}</Typography>
          </Toolbar>
          <Outlet />
        </Box>
      </Content>
      <Footer>
        <Copyright sx={{ pt: 4, pr: 10, textAlign: "right" }} />
      </Footer>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={showBackdrop}
        onClick={() => {
          setShowBackdrop(false);
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <DropzoneDialogBase
        open={showAddVideosForm}
        maxFileSize={5000000000}
        dialogTitle={t("upload.video")}
        fileObjects={uploadFiles}
        cancelButtonText={t("cancel")}
        submitButtonText={t("submit")}
        filesLimit={1}
        acceptedFiles={["video/mp4"]}
        onAdd={(newFileObjs: any) => {
          setUploadFiles([].concat(newFileObjs));
        }}
        onDelete={(file) => {
          setUploadFiles(uploadFiles.filter((f: FileObject) => f !== file));
        }}
        dropzoneText={t("upload.dropzone")}
        onClose={() => {
          setUploadFiles([]);
          setShowAddVideosForm(false);
        }}
        onSave={uploadVideoHandler}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
      <PostDialog ref={postRef} />
      <AboutDialog ref={aboutRef} />
    </Root>
  );
};

export default StudioLayout;
