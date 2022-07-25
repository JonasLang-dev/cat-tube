import React, { useEffect, useLayoutEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
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
import ClearIcon from "@mui/icons-material/Clear";

const watch = () => {
  const dispatch = useAppDispatch();
  const search = useLocation().search.split("=")[1];
  const postDetailData = useAppSelector(selectPostDetailData);
  const commentRef = useRef<any>(null);
  const createCommentStatus = useAppSelector(selectCreateCommentStatus);
  const createCommentError = useAppSelector(selectCreateCommentError);
  const commentData = useAppSelector(selectCommentData);

  const commentHandler = (e: any) => {
    if (commentRef != null) {
      dispatch(
        createComment({ post: search, content: commentRef?.current.value })
      );
    }
  };

  useLayoutEffect(() => {
    dispatch(postDetail({ id: search }));
    dispatch(comment({ id: search }));
  }, []);

  useEffect(() => {
    if (createCommentStatus === "success") {
      dispatch(clearCreateCommentState());
      dispatch(comment({ id: search }));
    }
  }, [createCommentStatus]);

  const deleteCommentHandler = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/api/comment/${id}`);
      dispatch(comment({ id: search }));
    } catch (error) {}
  };

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
              <Box>
                <Avatar
                  alt={postDetailData?.user.name}
                  src={baseURL + "/" + postDetailData?.user.avatar}
                >
                  {postDetailData?.user.name}
                </Avatar>
                <Typography align="center" variant="subtitle2">
                  {postDetailData?.user.name}
                </Typography>
              </Box>
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
            <List>
              {commentData &&
                commentData.map((item: any) => {
                  return (
                    <ListItem key={item._id}>
                      <Stack direction="row" gap={4}>
                        <Box>
                          <Avatar src={baseURL + item?.user.avatar}>
                            {item?.user.name}
                          </Avatar>
                          <Typography align="center" variant="subtitle2">
                            {item.user.name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography align="center" variant="subtitle2">
                            {item.content}
                          </Typography>
                          <Typography align="center" variant="body1">
                            {" "}
                            {new Date(item?.createdAt).toLocaleString()}
                          </Typography>
                        </Box>

                        <Box height="100px" sx={{ pl: "1rem" }}>
                          <IconButton
                            onClick={() => {
                              deleteCommentHandler(item._id);
                            }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </Box>
                      </Stack>
                    </ListItem>
                  );
                })}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ pr: 10, pb: 1, textAlign: "right" }} />
    </main>
  );
};

export default watch;
