import {
  AccountCircleOutlined,
  Download,
  Favorite,
  MoreVert,
  PlayCircle,
  Share,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentUserStatus } from "../../../features/auth/currentUserSlice";
import { useAppSelector } from "../../../hooks/redux.hooks";
import { red } from "@mui/material/colors";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Library({ loading = false }) {
  const location = useLocation();
  const { t } = useTranslation();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);
  return (
    <>
      {currentUserInfo ? (
        <main>
          <Container maxWidth="lg" sx={{ pt: 2, pb: 2 }}>
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
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
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
                      <CardMedia
                        component="img"
                        height="200"
                        width="100%"
                        sx={{
                          bgcolor: "rgba(0, 0, 0, 0.08)",
                          objectFit: "cover",
                        }}
                        image="https://source.unsplash.com/random"
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
                <VideoLibraryOutlined fontSize="large" />
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
}

export default Library;
