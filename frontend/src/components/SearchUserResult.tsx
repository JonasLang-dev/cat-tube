import {
  Avatar,
  Box,
  Button,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../request";

interface User {
  user: {
    _id: string;
    avatar: string;
    email: string;
    name: string;
    posts: number;
    followers: number;
  };
}

const SearchUserResult: FC<User> = ({ user }) => {
  return (
    <ListItem>
      <Link
        style={{
          width: "24%",
          height: "24%",
          maxWidth: 128,
          maxHeight: 128,
        }}
        to={`/channel/${user._id}`}
      >
        <Avatar
          style={{
            width: "100%",
            height: "100%",
          }}
          variant="circular"
          src={baseURL + user.avatar}
        />
      </Link>

      <Box sx={{ pl: "1rem", flex: 1 }}>
        <Stack gap={1}>
          <Typography alignItems="center" variant="body1">
            {user.name}
          </Typography>
          <Typography variant="body2">
            {user.followers} 位订阅者 • {user.posts}个视频
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ pl: "1rem" }}>
        <Button color="info" variant="contained">
          订阅
        </Button>
      </Box>
    </ListItem>
  );
};

export default SearchUserResult;
