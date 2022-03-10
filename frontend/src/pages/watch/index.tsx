import React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { CssBaseline, Grid, Paper } from "@mui/material";

function watch() {
  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap={2}
      sx={{ p: 1 }}
    >
      <Grid gridColumn="span 8">
        <Plyr
          crossOrigin="true"
          source={{
            type: "video",
            title: "test",
            poster:
              "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
            sources: [
              {
                size: 576,
                src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
                type: "video/mp4",
              },
              {
                size: 720,
                src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
                type: "video/mp4",
              },
              {
                size: 1080,
                src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
                type: "video/mp4",
              },
            ],
            tracks: [
              {
                default: true,
                kind: "captions",
                label: "English captions",
                src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
                srcLang: "en",
              },
              {
                kind: "captions",
                label: "Légendes en français",
                src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
                srcLang: "fr",
              },
            ],
          }}
        />
      </Grid>
      <Grid gridColumn="span 4">
        <Paper>xs=4</Paper>
      </Grid>
      <Grid gridColumn="span 8">
        <Paper>xs=4</Paper>
      </Grid>
    </Grid>
  );
}

export default watch;
