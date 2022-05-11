import React, { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Circle } from "@mui/icons-material";
import { CardMedia, Link } from "@mui/material";
import { baseURL } from "../request";

interface VideoCardType {
  path: any;
  user: any;
  title: any;
  poster: any;
  views: number;
  date: string;
}

const VideoCard: FC<VideoCardType> = ({
  path,
  user,
  poster,
  title,
  views,
  date,
}) => {
  return (
    <Grid
      item
      sx={{ display: "flex", justifyContent: "center" }}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
    >
      <Card
        sx={{
          width: 1,
          maxWidth: 320,
          maxHeight: 400,
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          borderRadius: "0.8rem",
        }}
      >
        <CardActionArea
          // to={{ pathname: "/watch", search: `?v=${path}` }}
          href={`/watch?v=${path}`}
          component={Link}
        >
          <CardMedia
            component="img"
            height="194"
            width="100%"
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.08)",
              objectFit: "cover",
            }}
            image={poster ? `${baseURL}/${poster} ` : `${baseURL}/default.png`}
          />
        </CardActionArea>
        <CardContent
          display="grid"
          gridTemplateAreas="'avatar title title' 'name info time'"
          gridTemplateRows="1fr 1fr"
          gridTemplateColumns="1fr 1fr 1fr"
          component={Grid}
        >
          <Box gridArea="avatar">
            <Avatar
              sx={{ height: 50, width: 50 }}
              alt={user.name}
              src={`${baseURL}/${user.avatar}`}
            />
          </Box>
          <Box alignSelf="center" gridArea="title">
            <Typography variant="body1" color="textPrimary">
              {title}
            </Typography>
          </Box>

          <Box alignSelf="center" gridArea="name">
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              component="p"
              alignItems="center"
            >
              {user.name}
            </Typography>
          </Box>
          <Box alignSelf="center" gridArea="info">
            <Typography
              noWrap
              textAlign="center"
              variant="body2"
              alignItems="center"
              color="textSecondary"
            >
              {views} views
            </Typography>
          </Box>
          <Box alignSelf="center" gridArea="time">
            <Typography
              noWrap
              textAlign="end"
              variant="body2"
              alignItems="center"
              color="textSecondary"
            >
              <Circle sx={{ fontSize: "5px", height: 10 }} />
              &nbsp;
              {new Date(date).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoCard;
