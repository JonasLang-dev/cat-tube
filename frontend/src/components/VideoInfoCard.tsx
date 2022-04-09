import React, { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Circle } from "@mui/icons-material";
import { CardMedia } from "@mui/material";

interface VideoCardType {
  path: any;
  avatar: any;
  title: any;
  name: any;
  poster: any;
  loading?: boolean;
}

const VideoInfoCard: FC<VideoCardType> = ({
  path,
  avatar,
  poster,
  title,
  name,
  loading = false,
}) => {
  return (
    <Grid item sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: 1,
          maxWidth: 320,
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          borderRadius: "0.8rem",
        }}
      >
        <CardActionArea
          to={{ pathname: "/watch", search: `?v=${path}` }}
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
            image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
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
              alt="Remy Sharp"
              src={`https://i.pravatar.cc/300?img=${avatar}`}
            />
          </Box>
          <Box alignSelf="center" gridArea="title">
            <Typography variant="body1" color="textPrimary">
              This is the title
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
              Remy Sharp
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
              11 views
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
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoInfoCard;
