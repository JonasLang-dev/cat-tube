import React, { FC, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../../../components/Copyright";
import { Link as Links, useNavigate } from "react-router-dom";
import { Autocomplete, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSnackbar } from "notistack";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux.hooks";
import { clearSignUpState } from "../../../../features/auth/signUpSlice";
import { LoadingButton } from "@mui/lab";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as locales from "../../../../../locales";
import { useTranslation } from "react-i18next";
import {
  resetPassword,
  selectResetPasswordErrors,
  selectResetPasswordStatus,
} from "../../../../features/users/resetPasswordSlice";

type SupportedLocales = keyof typeof locales;

const resetPasswordSchema = object({
  password: string()
    .nonempty({
      message: "Password is required",
    })
    .min(6, "Password is too short - should be min 6 chars"),
  passwordConfirmation: string().nonempty({
    message: "Password confirmation is required",
  }),
  id: string().nonempty({ message: "Id is required" }),
  passwordResetCode: string().nonempty({
    message: "password reset code is required",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Password do not match",
  path: ["passwordConfirmation"],
});

type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

interface RestPasswordInput {
  theme: any;
  colorMode: any;
}

const RestPassword: FC<RestPasswordInput> = ({ theme, colorMode }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const resetPasswordStatus = useAppSelector(selectResetPasswordStatus);
  const resetPasswordError = useAppSelector(selectResetPasswordErrors);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const changeLanguageHandler = (lang: SupportedLocales) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (resetPasswordStatus === "failed") {
      enqueueSnackbar(resetPasswordError?.message, { variant: "error" });
      dispatch(clearSignUpState());
    }
    if (resetPasswordStatus === "success") {
      reset();
      enqueueSnackbar("Reset password success", { variant: "success" });
      dispatch(clearSignUpState());
      navigate("/users/signin", { replace: true });
    }
  }, [resetPasswordStatus]);

  const onSubmit = (value: ResetPasswordInput) => {
    dispatch(resetPassword(value));
  };
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
        <Autocomplete
          sx={{ position: "absolute", right: "4vw", top: "4vh" }}
          options={Object.keys(locales)}
          getOptionLabel={(key) =>
            `${key.substring(0, 2)}-${key.substring(2, 4)}`
          }
          style={{ width: 140 }}
          value={i18n.language.replace(/\-/, "") || window.localStorage.i18n}
          disableClearable
          onChange={(_event: any, newValue: string | null) => {
            changeLanguageHandler(newValue as SupportedLocales);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Locale" fullWidth />
          )}
        />
        <IconButton
          sx={{ position: "absolute", left: "4vw", top: "4vh" }}
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
          {t("resetPassword")}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="id"
                label={t("id")}
                autoFocus
                autoComplete="id"
                {...register("id")}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="resetPasswordCode"
                label={t("resetPasswordCode")}
                autoComplete="reset-password-code"
                {...register("passwordResetCode")}
                error={errors.hasOwnProperty("passwordResetCode")}
                helperText={errors.passwordResetCode?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t("password")}
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
                error={errors.hasOwnProperty("password")}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label={t("confirmPassword")}
                id="passwordConfirmation"
                autoComplete="confirm-password"
                {...register("passwordConfirmation")}
                error={errors.hasOwnProperty("passwordConfirmation")}
                helperText={errors.passwordConfirmation?.message}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={resetPasswordStatus === "loading"}
          >
            {t("reset")}
          </LoadingButton>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link component={Links} to="/users/signin" variant="body2">
                {t("signInDirectly")}
              </Link>
            </Grid>
            <Grid item>
              <Link component={Links} to="/users/signup" variant="body2">
                {t("signUpNew")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Container>
  );
};

export default RestPassword;
