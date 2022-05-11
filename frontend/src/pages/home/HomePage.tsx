import React, { FC, useLayoutEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import VideoCard from "../../components/VideoCard";
import Carousel from "react-material-ui-carousel";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button, Stack, Typography } from "@mui/material";
import {
  posts,
  selectPostsData,
  selectPostsStatus,
  selectPostsError,
} from "../../features/post/postsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { HourglassEmptyOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Home {
  loading?: boolean;
  colorMode: any;
  theme: any;
}

const HomePage: FC<Home> = ({ loading = false, colorMode, theme }) => {
  const { t } = useTranslation();
  const matchem = useMediaQuery(theme.breakpoints.up("md"));
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatch = useAppDispatch();
  const postsData = useAppSelector(selectPostsData);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  const mdImgs = [
    {
      Name: "E",
      Image: "/static/img/login-the-crown_2-1500x1000.jpg",
    },

    {
      Name: "B",
      Image: "https://source.unsplash.com/featured/?vacuum,cleaner",
    },
  ];

  useLayoutEffect(() => {
    dispatch(posts());
  }, []);

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 3,
          borderRadius: "0.8rem",
        }}
      >
        <Container maxWidth="md">
          <Carousel
            key="carousel"
            autoPlay={false}
            animation="fade"
            indicators={true}
            duration={500}
            navButtonsAlwaysVisible={false}
            navButtonsAlwaysInvisible={false}
            cycleNavigation={true}
            fullHeightHover={true}
            swipe={true}
            sx={{
              borderRadius: "0.8rem",
            }}
            height={matchem ? 400 : matches ? 300 : 240}
          >
            {mdImgs.map((item, index) => {
              return (
                <Grid item xs={4} key={item.Name}>
                  <img
                    src={item.Image}
                    style={{ overflow: "hidden", width: "100%" }}
                  />
                </Grid>
              );
            })}
          </Carousel>
        </Container>
      </Box>

      <Container sx={{ py: 6 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {postsData && postsData.length > 0 ? (
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
            ))
          ) : (
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography variant="h1" align="center">
                <HourglassEmptyOutlined fontSize="large" />
              </Typography>
              <Typography variant="h5" align="center">
                {t("There are no videos yet.")}
              </Typography>
              <Typography variant="body1" paragraph align="center">
                {t("Upload first video.")}
              </Typography>
            </Stack>
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default HomePage;
