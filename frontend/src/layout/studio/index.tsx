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
import { Link as Links, ListItemButton, Typography } from "@mui/material";
import logo from "../../logo.svg";
import Copyright from "../../components/Copyright";
import {
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
} from "@mui/icons-material";
import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
import { DropzoneDialogBase } from "mui-file-dropzone";
import axiosInstance from "../../request";

interface Studio {
  colorMode: any;
  theme: any;
}

const StudioLayout: FC<Studio> = ({ theme, colorMode }) => {
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

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorProfileMenu(event.currentTarget);
  const [showAddVideosForm, setShowAddVideosForm] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
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
            primary={t("studio.dashboard")}
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
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            primary={t("studio.video")}
          />
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
      console.log(data);
    } catch (error) {
      console.log(error);
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
              ube Video
            </Typography>
          ) : matcheWithSm ? (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              <></>
            </Typography>
          ) : (
            <Typography sx={{ color: "#EAF3FB" }} variant="h6" component="h1">
              ube
            </Typography>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              onClick={() => {
                // postRef.current.handleClickOpen();

                setShowAddVideosForm(true);
              }}
              size="large"
            >
              <VideoCameraFrontOutlined />
            </IconButton>
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
      <Footer>
        <Copyright sx={{ pt: 4, pr: 10, textAlign: "right" }} />
      </Footer>
      <DropzoneDialogBase
        open={showAddVideosForm}
        maxFileSize={5000000000}
        dialogTitle={t("upload.video")}
        fileObjects={uploadFiles}
        cancelButtonText={t("cancel")}
        submitButtonText={t("submit")}
        filesLimit={1}
        // acceptedFiles={["video/mp4"]}
        onAdd={(newFileObjs) => {
          setUploadFiles([].concat(uploadFiles, newFileObjs));
        }}
        onDelete={(deleteFileObj) => {
        }}
        dropzoneText={t("upload.dropzone")}
        onClose={() => {
          setShowAddVideosForm(false);
          setUploadFiles([]);
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
