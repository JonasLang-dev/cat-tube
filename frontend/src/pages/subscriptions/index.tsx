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
  MoreRounded,
  MoreSharp,
  MoreVert,
  PlayCircle,
  Share,
} from "@mui/icons-material";
import {
  AccountCircleOutlined,
  SubscriptionsOutlined,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { selectCurrentUserStatus } from "../../features/auth/currentUserSlice";
import { useAppSelector } from "../../hooks/redux.hooks";
// @ts-ignore
import Image from "mui-image";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface Home {
  loading?: boolean;
}

function Subscriptions({ loading = false }) {
  const location = useLocation();
  const { t } = useTranslation();
  const currentUserInfo = useAppSelector(selectCurrentUserStatus);

  return (
    <>
      {currentUserInfo ? (
        <main>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
              pr: 2,
              pl: 2,
            }}
          >
            <Box
              sx={{
                overflow: "auto",
                display: "flex",
                minWidth: "100%",
                maxWidth: "80vw",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Travis Howard"
                src="/static/images/avatar/2.jpg"
                component={Link}
                to="#"
              />
              <Avatar
                alt="Cindy Baker"
                src="/static/images/avatar/3.jpg"
                component={Link}
                to="#"
              />
              <Avatar component={Link} to="#">
                <MoreVert />
              </Avatar>
            </Box>
          </Box>
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
                Sign in to see updates from your favorite YouTube channels
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
                  {t("signIn")}
                </Button>
              </Grid>
            </Stack>
          </Container>
        </main>
      )}
    </>
  );
}

export default Subscriptions;
