import React, { FC, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Avatar,
  CardActionArea,
  CardHeader,
  IconButton,
  Skeleton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Download,
  Favorite,
  MoreVert,
  PlayCircle,
  Share,
} from "@mui/icons-material";

// @ts-ignore
import Image from "mui-image";
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface Home {
  loading?: boolean;
}

function Explore({ loading = false }) {
  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid
          maxWidth="md"
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/fashion_and_beauty_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Fashion & Beauty
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/gaming_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Gaming
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/movies_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Movies
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/music_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Music
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/sports_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Sports
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
            <Card sx={{ borderRadius: "8px", maxWitdh: "210px" }}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <img
                      id="img"
                      className="style-scope yt-img-shadow"
                      alt=""
                      src="src/assets/img/trending_color_32.png"
                      width="32"
                      height="32"
                    />
                  }
                ></CardHeader>
                <Typography gutterBottom variant="h6" component="h2">
                  &nbsp;Tranding
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg">
        <Typography
          sx={{ pt: 2, pb: 2 }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Tranding:
        </Typography>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  avatar={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    )
                  }
                  action={
                    loading ? null : (
                      <IconButton aria-label="settings">
                        <MoreVert />
                      </IconButton>
                    )
                  }
                  title={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      "Shrimp"
                    )
                  }
                  subheader={
                    loading ? (
                      <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                      new Date().toDateString()
                    )
                  }
                />
                <CardActionArea
                  to={{ pathname: "/watch", search: `?v=${card}` }}
                  component={Link}
                >
                  <Image
                    src="https://source.unsplash.com/random"
                    height="200px"
                    width="auto"
                    fit="cover"
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
                    bgColor="inherit"
                  />
                </CardActionArea>
                <CardContent sx={{ flexGrow: 1 }}>
                  {loading ? (
                    <React.Fragment>
                      <Skeleton
                        animation="wave"
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                  ) : (
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton aria-label="play">
                    <PlayCircle />
                  </IconButton>
                  <IconButton aria-label="play">
                    <Download />
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <Favorite color="error" />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Explore;
