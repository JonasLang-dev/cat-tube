import React, { useLayoutEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import {
  search,
  selectSearchStatus,
  selectSearchData,
  selectSearchError,
} from "../../features/search/searchSlice";
import SearchUserResult from "../../components/SearchUserResult";
import { baseURL } from "../../request";

interface User {
  _id: string;
  avatar: string;
  email: string;
  name: string;
  posts: number;
  followers: number;
}

function SearchPage() {
  const [sub, setSub] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("search_query");

  const searchStatus = useAppSelector(selectSearchStatus);
  const searchError = useAppSelector(selectSearchError);
  const searchData = useAppSelector(selectSearchData);

  useLayoutEffect(() => {
    if (params) {
      dispatch(search(params));
    }
  }, [params]);

  return (
    <>
      {searchData &&
        (searchData.channels.length === 0 && searchData.posts.length === 0 ? (
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
                  没有搜索结果
                </Typography>
                <Typography variant="body1" paragraph align="center">
                  发现更多视频
                </Typography>
                <Grid sx={{ display: "grid", placeItems: "center" }}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    startIcon={<ExploreOutlined />}
                    to={`/`}
                    component={Link}
                    sx={{ width: "200px" }}
                  >
                    发现
                  </Button>
                </Grid>
              </Stack>
            </Container>
          </main>
        ) : (
          <Grid width="100%" maxWidth="100vw" pt={4} margin="0">
            <Container maxWidth="md">
              <Typography variant="subtitle1">{params} 的搜索结果</Typography>
              <Divider sx={{ pt: 2 }} />
              <List sx={{ pt: 2 }}>
                {searchData.channels.map((user: User) => {
                  return <SearchUserResult user={user} key={user._id} />;
                })}
              </List>
              {searchData.channels.length > 0 && <Divider />}
              <List sx={{ pt: 2 }}>
                {searchData.posts.map((post: any) => {
                  return (
                    <ListItem key={post._id}>
                      <Box height={138} width={246}>
                        <Link
                          to={{ pathname: "/watch", search: `?v=${post._id}` }}
                        >
                          <img
                            src={baseURL + "/" + post.postUrl}
                            style={{
                              backgroundColor: "rgba(0, 0, 0, 0.08)",
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              borderRadius: "4px",
                            }}
                          />
                        </Link>
                      </Box>
                      <Box sx={{ flex: 1, pl: "1rem" }}>
                        <Stack gap={1}>
                          <Typography alignItems="center" variant="body1">
                            This is the post title
                          </Typography>
                          <Typography variant="body2">
                            {post.user.name}
                          </Typography>
                          <Typography variant="body2">
                            {post.views} 次观看
                          </Typography>
                          <Typography variant="body2">
                            {post.description}
                          </Typography>
                        </Stack>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            </Container>
          </Grid>
        ))}
    </>
  );
}

export default SearchPage;
