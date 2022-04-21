import React, { useState } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  Box,
  IconButton,
  Divider,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useSearchParams, Link } from "react-router-dom";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { ExploreOutlined } from "@mui/icons-material";

function SearchPage() {
  const [sub, setSub] = useState<boolean>(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("search_query");

  const toggle = () => {
    setSub(!sub);
  };
  return (
    <>
      {params ? (
        <Grid width="100%" pt={4} margin="0">
          <Container maxWidth="md">
            <Typography variant="subtitle1">{params}的搜索结果</Typography>
            <Divider sx={{ pt: 2 }} />
            <List sx={{ pt: 2 }}>
              <ListItem>
                <Avatar
                  sx={{
                    width: "24%",
                    height: "24%",
                    maxWidth: 128,
                    maxHeight: 128,
                  }}
                  variant="circular"
                  src="http://localhost:5020//avatar.png"
                />
                <Box sx={{ pl: "1rem", flex: 1 }}>
                  <Stack gap={1}>
                    <Typography alignItems="center" variant="body1">
                      supercutcat
                    </Typography>
                    <Typography variant="body2">
                      23.3万位订阅者 • 106个视频
                    </Typography>
                    <Typography variant="body2">这是对频道的描述</Typography>
                  </Stack>
                </Box>
                <Box sx={{ pl: "1rem" }}>
                  {sub ? (
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
                </Box>
              </ListItem>
            </List>
            <Divider />
            <List sx={{ pt: 2 }}>
              <ListItem>
                <Box height={138} width={246}>
                  <img
                    src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, pl: "1rem" }}>
                  <Stack gap={1}>
                    <Typography alignItems="center" variant="body1">
                      This is the post title
                    </Typography>
                    <Typography variant="body2">supercutcat</Typography>
                    <Typography variant="body2">10k views</Typography>
                    <Typography variant="body2">This is desc</Typography>
                  </Stack>
                </Box>
              </ListItem>
              <ListItem>
                <Box height={138} width={246}>
                  <img
                    src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, pl: "1rem" }}>
                  <Stack gap={1}>
                    <Typography alignItems="center" variant="body1">
                      This is the post title
                    </Typography>
                    <Typography variant="body2">supercutcat</Typography>
                    <Typography variant="body2">10k views</Typography>
                    <Typography variant="body2">This is desc</Typography>
                  </Stack>
                </Box>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                    objectFit: "cover",
                    borderRadius: ".4rem",
                  }}
                  height={138}
                  width={246}
                >
                  <img
                    src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, pl: "1rem" }}>
                  <Stack gap={1}>
                    <Typography alignItems="center" variant="body1">
                      This is the post title
                    </Typography>
                    <Typography variant="body2">supercutcat</Typography>
                    <Typography variant="body2">10k views</Typography>
                    <Typography variant="body2">This is desc</Typography>
                  </Stack>
                </Box>
              </ListItem>
              <ListItem>
                <Box
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                    objectFit: "cover",
                    borderRadius: ".4rem",
                  }}
                  height={138}
                  width={246}
                >
                  <img
                    src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1, pl: "1rem" }}>
                  <Stack gap={1}>
                    <Typography alignItems="center" variant="body1">
                      This is the post title
                    </Typography>
                    <Typography variant="body2">supercutcat</Typography>
                    <Typography variant="body2">10k views</Typography>
                    <Typography variant="body2">This is desc</Typography>
                  </Stack>
                </Box>
              </ListItem>
            </List>
          </Container>
        </Grid>
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
                <RocketLaunchOutlinedIcon fontSize="large" />
              </Typography>
              <Typography variant="h5" align="center">
                There are no search results
              </Typography>
              <Typography variant="body1" paragraph align="center">
                Explore more videos now
              </Typography>
              <Grid sx={{ display: "grid", placeItems: "center" }}>
                <Button
                  color="inherit"
                  variant="outlined"
                  startIcon={<ExploreOutlined />}
                  to={`/explore`}
                  component={Link}
                  sx={{ width: "200px" }}
                >
                  explore
                </Button>
              </Grid>
            </Stack>
          </Container>
        </main>
      )}
    </>
  );
}

export default SearchPage;
