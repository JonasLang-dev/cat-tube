import React, { FC, useContext, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

import AvatarGroup from "@mui/material/AvatarGroup";
// @ts-ignore
import Image from "mui-image";
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface Home {
  loading?: boolean;
  colorMode: any;
  theme: any;
}

const HomePage: FC<Home> = ({ loading = false, colorMode, theme }) => {
  return (
    <main>
      <Box
        sx={
          theme.palette.mode === "dark"
            ? {
                pt: 8,
                pb: 6,
                background:
                  "url(src/assets/img/login-the-crown_2-1500x1000.jpg) no-repeat right #000",
              }
            : {
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
              }
        }
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            The Chrown
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Adapted from historical events, the play dramatically tells the
            story of Queen Elizabeth II, as well as the political events and
            personal experiences of her reign.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Watch Now</Button>
            <Button variant="outlined">Add to Library</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card
                sx={{
                  width: 320,
                  maxWidth: "100%",
                  boxShadow:
                    "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardActionArea
                  to={{ pathname: "/watch", search: `?v=${card}` }}
                  component={Link}
                >
                  <CardMedia
                    image={
                      "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    }
                    sx={{
                      width: "100%",
                      height: 0,
                      paddingBottom: "min(56.25%, 200px)",
                      bgcolor: "rgba(0, 0, 0, 0.08)",
                    }}
                  />
                </CardActionArea>
                <CardContent
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  component={Grid}
                >
                  <Box gridColumn="span 4">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.pravatar.cc/300?img=1"
                    />
                  </Box>
                  <Box gridColumn="span 8">Title</Box>
                  <Box gridColumn="span 8">Remy Sharp</Box>
                  <Box gridColumn="span 8">
                    {new Date().toLocaleDateString()}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};

export default HomePage;
