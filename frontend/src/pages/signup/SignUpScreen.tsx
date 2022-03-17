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
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as locales from "../../../locales";
import { useTranslation } from "react-i18next";

type SupportedLocales = keyof typeof locales;

const createUserSchema = object({
  password: string()
    .nonempty({
      message: "Password is required",
    })
    .min(6, "Password is too short - should be min 6 chars"),
  passwordConfirmation: string().nonempty({
    message: "Password confirmation is required",
  }),
  email: string()
    .nonempty({
      message: "Email is required",
    })
    .email("Not a valid email"),
  name: string().nonempty({
    message: "User name is required",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password do not match",
  path: ["passwordConfirmation"],
});

type CreateSessionInput = TypeOf<typeof createUserSchema>;

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
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = React.useState<SupportedLocales>("zhCN");
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = (value: CreateSessionInput) => {
    dispatch(signUp(value));
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
      enqueueSnackbar("User successfully created", { variant: "success" });
      enqueueSnackbar("Please verify your account", { variant: "warning" });
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
          {t("signUp")}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                label={t("userName")}
                autoFocus
                {...register("name")}
                error={errors.hasOwnProperty("name")}
                helperText={errors.name?.message}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label={t("email")}
                {...register("email")}
                error={errors.hasOwnProperty("email")}
                helperText={errors.email?.message}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("password")}
                label={t("password")}
                type="password"
                error={errors.hasOwnProperty("password")}
                helperText={errors.password?.message}
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("passwordConfirmation")}
                error={errors.hasOwnProperty("passwordConfirmation")}
                helperText={errors.passwordConfirmation?.message}
                name="passwordConfirmation"
                label={t("confirmPassword")}
                type="password"
                id="passwordConfirmation"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={t("sub") as string}
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
            {t("signUp")}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={Links} to="/signin" variant="body2">
                {t("login")}
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
