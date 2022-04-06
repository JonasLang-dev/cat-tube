import React from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Download, Favorite, Share } from "@mui/icons-material";
import Copyright from "../../components/Copyright";

function watch() {
  return (
    <main style={{ background: "background.main" }}>
      <Grid sx={{ p: "1rem" }} container gap={6}>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            sx={{
              maxWidth: "1000px",
            }}
          >
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
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Grid container gap={2} flexDirection="column">
            <Grid container gap={2} flexDirection="row">
              <Avatar>cat</Avatar>
              <Typography textAlign="center">This is title</Typography>
            </Grid>
            <Typography>{new Date().toISOString()}</Typography>
            <Typography>
              This is a long long long long long long description
            </Typography>
            <Stack direction="row">
              <IconButton aria-label="play">
                <Download fontSize="large" />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <Favorite color="error" fontSize="large" />
              </IconButton>
              <IconButton aria-label="share">
                <Share fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Copyright sx={{ pr: 10, pb: 1, textAlign: "right" }} />
    </main>
  );
}

export default watch;
