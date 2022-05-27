import React, { useLayoutEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hooks";
import {
  channel,
  selectChannelData,
} from "../../../features/users/channelSlice";
import { baseURL } from "../../../request";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ChannelPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const channelInfo = useAppSelector(selectChannelData);
  const [sub, setSub] = useState<boolean>(false);

  const toggle = () => {
    setSub(!sub);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(
      "/" +
        location.pathname.split("/")[1] +
        "/" +
        location.pathname.split("/")[2] +
        "/" +
        newValue,
      {
        replace: true,
      }
    );
  };

  useLayoutEffect(() => {
    dispatch(channel(location.pathname.split("/")[2]));
  }, []);

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <TabContext value={location.pathname.split("/")[3] || "featured"}>
        <Container sx={{ pt: 4 }}>
          <Grid container spacing={3}>
            <Grid item>
              <Avatar
                alt={channelInfo?.user.name}
                src={baseURL + "/" + channelInfo?.user.avatar}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">{channelInfo?.user.name}</Typography>
              <Typography variant="body2">
                {channelInfo?.user.followers} 位订阅者
              </Typography>
            </Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Grid item>
              {channelInfo?.isFollow ? (
                <>
                  <Button color="info" variant="outlined" onClick={toggle}>
                    已订阅
                  </Button>
                  <IconButton>
                    <NotificationsNoneOutlinedIcon />
                  </IconButton>
                </>
              ) : (
                <Button color="info" variant="contained" onClick={toggle}>
                  订阅
                </Button>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              maxWidth: { xs: 340, sm: 600 },
            }}
          >
            <TabList
              allowScrollButtonsMobile
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{ overflowX: "hidden" }}
            >
              <Tab label="首页" value="featured" {...a11yProps(0)} />
              <Tab label="视频" value="videos" {...a11yProps(1)} />
              <Tab label="播放列表" value="playlists" {...a11yProps(2)} />
              <Tab label="社区" value="community" {...a11yProps(3)} />
              <Tab label="社区" value="channels" {...a11yProps(3)} />
              <Tab label="简介" value="about" {...a11yProps(4)} />
            </TabList>
          </Box>
        </Container>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            minHeight: "78vh",
          }}
        >
          <TabPanel value="featured"></TabPanel>
          <TabPanel value="videos"></TabPanel>
          <TabPanel value="playlists"></TabPanel>
          <TabPanel value="community"></TabPanel>
          <TabPanel value="channels"></TabPanel>
          <TabPanel value="about">
            <Grid container spacing={4} sx={{ pl: 4, pr: 4 }}>
              <Grid item xs={8}>
                <Stack spacing={2} sx={{ pr: "96px" }}>
                  <Typography variant="subtitle1">说明</Typography>
                  <Typography variant="body2">
                    The quick brown fox jumps over the lazy dog.
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1">详情</Typography>
                  <Typography variant="body2">位置: 北京市朝阳区</Typography>
                  <Divider />
                  <Typography variant="subtitle1">链接</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">统计信息</Typography>
                  <Divider />
                  <Typography variant="body2">
                    {new Date(channelInfo?.user.createdAt).toLocaleDateString()}
                    &nbsp; 注册
                  </Typography>
                  <Divider />
                  <Typography variant="body2">2,150,046次观看</Typography>
                  <Divider />
                  <Box>
                    <IconButton>
                      <OutlinedFlagTwoToneIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default ChannelPage;
