import React, { FC, useEffect, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";
import { Link as Links } from "react-router-dom";
import { IconButton, PaletteMode } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import {
  selectSignUpError,
  selectSignUpStatus,
  signUp,
} from "../../features/auth/signUpSlice";
import { LoadingButton } from "@mui/lab";

interface SignUp {
  theme:
    | {
        palette: {
          mode: PaletteMode;
        };
      }
    | any;
  setMode: Function;
}

const SignUpScreen: FC<SignUp> = ({ theme, setMode }) => {
  const dispatch = useAppDispatch();
  const signUpStatus = useAppSelector(selectSignUpStatus);
  const signUpError = useAppSelector(selectSignUpError);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.getItem("theme")
          ? localStorage.getItem("theme") === "dark"
            ? localStorage.setItem("theme", "light")
            : localStorage.setItem("theme", "dark")
          : prefersDarkMode
          ? localStorage.setItem("theme", "light")
          : localStorage.setItem("theme", "dark");
      },
      switchDarkMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.setItem("theme", "dark");
      },
      switchLightMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.setItem("theme", "light");
      },
      switchDefault: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        );
        localStorage.removeItem("theme");
      },
    }),
    [prefersDarkMode]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      signUp({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        passwordConfirmation: data.get("passwordConfirmation"),
      })
    );
  };

  useEffect(() => {
    if (signUpStatus === "failed") {
      if (Array.isArray(signUpError)) {
        signUpError.map((item) => {
          enqueueSnackbar(item.message, { variant: "error" });
        });
      }
    }
    if (signUpStatus === "success") {
      enqueueSnackbar("Sign up successfull", { variant: "success" });
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: "4vw", top: "4vh" }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon fontSize="small" />
          ) : (
            <Brightness4Icon fontSize="small" />
          )}
        </IconButton>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                label="Confirm Password"
                type="passwordConfirmation"
                id="passwordConfirmation"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={signUpStatus === "loading"}
            // component={Links}
            // to="/"
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={Links} to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default SignUpScreen;
