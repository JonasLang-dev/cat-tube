import React from "react";
import { ExploreOutlined, HistoryOutlined } from "@mui/icons-material";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function History() {
  const { t } = useTranslation();
  return (
    <main
      style={{
        height: "93vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={1}>
          <Typography variant="h1" align="center">
            <HistoryOutlined fontSize="large" />
          </Typography>
          <Typography variant="h5" align="center">
            There are no historical videos yet.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Explore more videos now
          </Typography>
          <Grid sx={{ display: "grid", placeItems: "center" }}>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<ExploreOutlined />}
              to={`/explore`}
              component={Link}
              sx={{ width: "200px" }}
            >
              {t("exploer")}
            </Button>
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}

export default History;
