import React, { useLayoutEffect } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Download, Favorite, Share } from "@mui/icons-material";
import Copyright from "../../components/Copyright";
import axiosInstance, { baseURL } from "../../request";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import {
  postDetail,
  selectPostDetailData,
} from "../../features/post/postDetailSlice";
import { useLocation, useSearchParams } from "react-router-dom";

const watch = () => {
  const dispatch = useAppDispatch();
  const search = useLocation().search.split("=")[1];
  const postDetailData = useAppSelector(selectPostDetailData);

  useLayoutEffect(() => {
    dispatch(postDetail({ id: search }));
  }, []);
  return (
    <main style={{ background: "background.main" }}>
      <Grid sx={{ p: "1rem" }} container gap={6}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            sx={{
              maxWidth: "1000px",
            }}
          >
            <Plyr
              crossOrigin="true"
              source={{
                type: "video",
                title: "test",
                poster: baseURL + "/" + postDetailData?.postUrl,
                sources: [
                  {
                    src: baseURL + "/" + postDetailData?.videoUrl,
                    type: "video/mp4",
                  },
                ],
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Grid container gap={2} flexDirection="column">
            <Grid container gap={2} flexDirection="row">
              <Avatar src={postDetailData?.user.avatar}>
                {postDetailData?.user.name}
              </Avatar>
              <Typography textAlign="center">
                {postDetailData?.title}
              </Typography>
            </Grid>
            <Typography>
              {new Date(postDetailData?.createdAt).toLocaleString()}
            </Typography>
            <Typography>{postDetailData?.description}</Typography>
            <Stack direction="row">
              <IconButton aria-label="play">
                <Download fontSize="large" />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <Favorite color="error" fontSize="large" />
              </IconButton>
              <IconButton aria-label="share">
                <Share fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ pr: 10, pb: 1, textAlign: "right" }} />
    </main>
  );
};

export default watch;
