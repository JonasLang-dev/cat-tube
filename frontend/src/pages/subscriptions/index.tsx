import React, { FC, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MoreVert from "@mui/icons-material/MoreVert";
import {
  AccountCircleOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import {
  posts,
  selectPostsData,
  selectPostsStatus,
  selectPostsError,
} from "../../features/post/postsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";

import VideoCard from "../../components/VideoCard";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface SubscriptionsType {
  loading?: boolean;
}

const Subscriptions: FC<SubscriptionsType> = ({ loading = false }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  const dispatch = useAppDispatch();
  const postsData = useAppSelector(selectPostsData);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  useLayoutEffect(() => {
    dispatch(posts());
  }, []);

  return (
    <>
      {currentUserInfo ? (
        <main>
          <Container maxWidth="lg" sx={{ pt: 2, pb: 2 }}>
            <Grid container spacing={4}>
              {postsData &&
                postsData.length > 0 &&
                postsData.map((post: any) => (
                  <VideoCard
                    key={post._id}
                    poster={post.postUrl}
                    path={post._id}
                    user={post.user}
                    title={post.title}
                    views={post.views}
                    date={post.createdAt}
                  />
                ))}
            </Grid>
          </Container>
        </main>
      ) : (
        <main
          style={{
            height: "93vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container maxWidth="xs">
            <Stack spacing={1}>
              <Typography variant="h1" align="center">
                <SubscriptionsOutlined fontSize="large" />
              </Typography>
              <Typography variant="h5" align="center">
                Don’t miss new videos
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Sign in to see updates from your favorite Cat Tube channels
              </Typography>
              <Grid sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<AccountCircleOutlined />}
                  to={`/users/signin?redirect=${location.pathname}`}
                  component={Link}
                  sx={{ width: "200px" }}
                >
                  {t("Sign In")}
                </Button>
              </Grid>
            </Stack>
          </Container>
        </main>
      )}
    </>
  );
};

export default Subscriptions;
