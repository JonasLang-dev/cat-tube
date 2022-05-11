import React, { useEffect, useLayoutEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Download, Favorite, SendOutlined, Share } from "@mui/icons-material";
import Copyright from "../../components/Copyright";
import axiosInstance, { baseURL } from "../../request";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import {
  postDetail,
  selectPostDetailData,
} from "../../features/post/postDetailSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  comment,
  selectCommentData,
} from "../../features/comment/commentSlice";
import {
  createComment,
  clearCreateCommentState,
  selectCreateCommentError,
  selectCreateCommentStatus,
} from "../../features/comment/createCommentSlice";

const watch = () => {
  const dispatch = useAppDispatch();
  const search = useLocation().search.split("=")[1];
  const postDetailData = useAppSelector(selectPostDetailData);
  const commentRef = useRef<HTMLDivElement>(null);
  const createCommentError = useAppSelector(selectCreateCommentStatus);
  const createCommentStatus = useAppSelector(selectCreateCommentError);
  const commentData = useAppSelector(selectCommentData);

  const commentHandler = (e) => {
    if (commentRef != null) {
      dispatch(
        createComment({ post: search, content: commentRef?.current?.value })
      );
    }
  };

  useLayoutEffect(() => {
    dispatch(postDetail({ id: search }));
    dispatch(comment({ id: search }));
  }, []);

  useEffect(() => {
    if (createCommentStatus === "success") {
      dispatch(comment({ id: search }));
      dispatch(clearCreateCommentState());
    }
  }, [createCommentStatus]);
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
            <Input
              inputRef={commentRef}
              fullWidth
              id="comment-input"
              placeholder={"评论"}
              endAdornment={
                <IconButton
                  aria-label="comment"
                  onClick={(e) => commentHandler(e)}
                >
                  <SendOutlined fontSize="small" />
                </IconButton>
              }
            />
            {commentData &&
              commentData.map((item: any) => {
                console.log(item);

                <p key={item._id}>test</p>;
              })}
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ pr: 10, pb: 1, textAlign: "right" }} />
    </main>
  );
};

export default watch;
