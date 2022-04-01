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
import GameCard from "../../components/SolidGameCard";
import VideoCard from "../../components/VideoCard";

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
          borderRadius: "0.8rem",
        }}
      >
        <Grid
          container
          sx={{
            justifyItems: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={4}
        >
          <Grid item>
            <GameCard
              color={"#203f52"}
              title={"Dota 2"}
              subtitle={"Be a Legend!"}
              image={
                "https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png"
              }
            />
          </Grid>
          <Grid item>
            <GameCard
              color="#4d137f"
              title={"Fortnite"}
              subtitle={"Time to choose side!"}
              image={
                "https://static1.millenium.org/articles/0/31/21/20/@/713589-calamity-article_list_m-1.jpg"
              }
            />
          </Grid>
          <Grid item>
            <GameCard
              color="#ff9900"
              title={"Overwatch"}
              subtitle={"What are you waiting?"}
              image={
                "https://images5.alphacoders.com/690/thumb-1920-690653.png"
              }
            />
          </Grid>
          <Grid item>
            <GameCard
              color="#34241e"
              title={"PUBG"}
              subtitle={"Are you ready?"}
              image={
                "https://www.itp.net/public/styles/full_img_sml/public/images/2019/05/27/44485-pubg_base1.jpg?itok=EF911Xan"
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <VideoCard
              key={card}
              poster={card}
              path={card}
              avatar={card}
              title={card}
              name={card}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Explore;
