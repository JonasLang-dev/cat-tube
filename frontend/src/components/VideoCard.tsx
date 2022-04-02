import React, { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Image from "mui-image";
import Skeleton from "@mui/material/Skeleton";

interface VideoCardType {
  path: any;
  avatar: any;
  title: any;
  name: any;
  poster: any;
  loading?: boolean;
}

const VideoCard: FC<VideoCardType> = ({
  path,
  avatar,
  poster,
  title,
  name,
  loading = false,
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
          boxShadow:
            "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
          borderRadius: "0.8rem",
        }}
      >
        <CardActionArea
          to={{ pathname: "/watch", search: `?v=${path}` }}
          component={Link}
        >
          <Image
            src={
              "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
            }
            sx={{
              width: "100%",
              height: 0,
              bgcolor: "rgba(0, 0, 0, 0.08)",
              objectFit: "cover",
            }}
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
          />
        </CardActionArea>
        <CardContent
          display="grid"
          gridTemplateAreas="'avatar title' 'avatar info'"
          gridTemplateRows="1fr 1fr"
          gridTemplateColumns="1fr 2fr"
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
            <Typography>Title</Typography>
          </Box>
          <Box
            gridArea="info"
            sx={{
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              paddingTop: "0.5rem",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              alignItems="center"
            >
              Remy Sharp
            </Typography>
            <Typography
              textAlign="end"
              variant="body2"
              alignItems="center"
              color="textSecondary"
            >
              {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoCard;
