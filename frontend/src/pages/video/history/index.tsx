import React, { FC } from "react";
import { ExploreOutlined, HistoryOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux.hooks";
import { selectCurrentUserStatus } from "../../../features/auth/currentUserSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Input from "@mui/material/Input";
import { IconButton, List, ListItem } from "@mui/material";
import Box from "@mui/system/Box";
import ClearIcon from "@mui/icons-material/Clear";

interface HistoryType {
  theme: any;
}

const History: FC<HistoryType> = ({ theme }) => {
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectCurrentUserStatus);
  const matchSm = useMediaQuery("(min-width:600px)");
  const [value, setValue] = React.useState<"watch" | "search">("watch");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as "watch" | "search");
  };

  return (
    <>
      {userInfo ? (
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
      ) : (
        <Grid
          container
          spacing={3}
          direction={matchSm ? "row-reverse" : "row"}
          minHeight="94vh"
          maxWidth="100vw"
          width="100%"
          margin="0"
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            sx={{
              bgcolor: "background.paper",
              borderRadius: ".4rem",
            }}
          >
            <Stack sx={{ p: "2rem" }} gap={2}>
              <Input
                id="search-history"
                placeholder={t("Search watch history")}
                startAdornment={<SearchIcon fontSize="small" />}
              />
              <FormControl>
                <FormLabel
                  sx={{ pb: "1rem" }}
                  color="primary"
                  id="history-type-controlled-radio-buttons-group"
                >
                  {t("History Type")}
                </FormLabel>
                <Divider />
                <RadioGroup
                  aria-labelledby="hitory-type-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    label={t("Watch History")}
                    control={<Radio />}
                    value="watch"
                  />
                  <Divider />
                  <FormControlLabel
                    label={t("Search History")}
                    control={<Radio />}
                    value="search"
                  />
                </RadioGroup>
              </FormControl>
              <Box>
                <Button
                  color="inherit"
                  variant="text"
                  fullWidth={false}
                  startIcon={<DeleteIcon />}
                >
                  {t("Clear history")}
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
            <Container>
              <Box sx={{ pt: "1rem", pb: 2 }}>
                <Typography variant="h5">
                  {value === "watch" ? t("Watch History") : t("Search History")}
                </Typography>
              </Box>
              <Divider />
              <List sx={{ pt: 4 }}>
                <ListItem>
                  <Box height={138} width={246}>
                    <img
                      src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        objectFit: "cover",
                         width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: "1rem" }}>
                    <Stack gap={1}>
                      <Typography alignItems="center" variant="body1">
                        This is the post title
                      </Typography>
                      <Typography variant="body2">supercutcat</Typography>
                      <Typography variant="body2">10k views</Typography>
                      <Typography
                        sx={{
                          [theme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                        variant="body2"
                      >
                        This is desc
                      </Typography>
                    </Stack>
                  </Box>
                  <Box height="100px" sx={{ pl: "1rem" }}>
                    <IconButton>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box height={138} width={246}>
                    <img
                      src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: "1rem" }}>
                    <Stack gap={1}>
                      <Typography alignItems="center" variant="body1">
                        This is the post title
                      </Typography>
                      <Typography variant="body2">supercutcat</Typography>
                      <Typography variant="body2">10k views</Typography>
                      <Typography
                        sx={{
                          [theme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                        variant="body2"
                      >
                        This is desc
                      </Typography>
                    </Stack>
                  </Box>
                  <Box height="100px" sx={{ pl: "1rem" }}>
                    <IconButton>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.08)",
                      objectFit: "cover",
                      borderRadius: ".4rem",
                    }}
                    height={138}
                    width={246}
                  >
                    <img
                      src="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: "1rem" }}>
                    <Stack gap={1}>
                      <Typography alignItems="center" variant="body1">
                        This is the post title
                      </Typography>
                      <Typography variant="body2">supercutcat</Typography>
                      <Typography variant="body2">10k views</Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          [theme.breakpoints.down("md")]: {
                            display: "none",
                          },
                        }}
                      >
                        This is desc
                      </Typography>
                    </Stack>
                  </Box>
                  <Box height="100px" sx={{ pl: "1rem" }}>
                    <IconButton>
                      <ClearIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </List>
            </Container>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default History;
