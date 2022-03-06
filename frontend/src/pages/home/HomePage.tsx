import * as React from "react";
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
import { Avatar, CardActionArea, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { Download, Favorite, PlayCircle, Share } from "@mui/icons-material";


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function HomePage() {
  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Album layout
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Main call to action</Button>
            <Button variant="outlined">Secondary action</Button>
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
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>}
                  action={
                    <IconButton aria-label="settings">
                      <GridMoreVertIcon />
                    </IconButton>
                  }
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016" />

                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                    sx={{ maxHeight: "320px", maxWidth: "auto" }}
                  />
                </CardActionArea>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
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
  );
}

export default HomePage;
