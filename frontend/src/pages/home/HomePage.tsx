import React, { FC, useLayoutEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import VideoCard from "../../components/VideoCard";
import Carousel from "react-material-ui-carousel";
// @ts-ignore
import Image from "mui-image";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface Home {
  loading?: boolean;
  colorMode: any;
  theme: any;
}

const HomePage: FC<Home> = ({ loading = false, colorMode, theme }) => {
  const matchem = useMediaQuery(theme.breakpoints.up("md"));
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const mdImgs = [
    {
      Name: "E",
      Image: "http://localhost:5020/login-the-crown_2-1500x1000.jpg",
    },

    {
      Name: "B",
      Image: "https://source.unsplash.com/featured/?vacuum,cleaner",
    },
  ];

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
                  <Image
                    src={item.Image}
                    sx={{ overflow: "hidden", width: "100%" }}
                    duration={300}
                    easing="cubic-bezier(0.7, 0, 0.6, 1)"
                    showLoading={
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="200px"
                        animation="wave"
                      />
                    }
                    errorIcon={true}
                    shift={null}
                    distanc="100px"
                    shiftDuration={900}
                  />
                </Grid>
              );
            })}
          </Carousel>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <VideoCard
              key={card}
              poster={card}
              path={card}
              avatar={card}
              title={card}
              name={card}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default HomePage;
