import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GameCard from "../../components/SolidGameCard";
import VideoCard from "../../components/VideoCard";
import { Stack } from "@mui/material";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Explore = () => {
  return (
    <main>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "background.paper",
          pt: 2,
          display: "grid",
          placeItems: "center",
          borderRadius: "0.8rem",
        }}
      >
        <Stack
          spacing={4}
          direction="row"
          sx={{
            p: 4,
            justifyItems: "center",
            alignItems: "center",
            overflow: "auto",
            minWidth: "100%",
            maxWidth: "80vw",
          }}
        >
          <GameCard
            color={"#203f52"}
            title={"Dota 2"}
            subtitle={"Be a Legend!"}
            image={
              "https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png"
            }
          />

          <GameCard
            color="#4d137f"
            title={"Fortnite"}
            subtitle={"Time to choose side!"}
            image={
              "https://static1.millenium.org/articles/0/31/21/20/@/713589-calamity-article_list_m-1.jpg"
            }
          />

          <GameCard
            color="#ff9900"
            title={"Overwatch"}
            subtitle={"What are you waiting?"}
            image={"https://images5.alphacoders.com/690/thumb-1920-690653.png"}
          />

          <GameCard
            color="#34241e"
            title={"PUBG"}
            subtitle={"Are you ready?"}
            image={
              "https://www.itp.net/public/styles/full_img_sml/public/images/2019/05/27/44485-pubg_base1.jpg?itok=EF911Xan"
            }
          />
        </Stack>
      </Container>

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
};

export default Explore;
