import React, { FC, useCallback, useEffect, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../../components/Copyright";
import { Link as Links, useNavigate } from "react-router-dom";
import { IconButton, PaletteMode } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hooks";
import {
  clearAuthState,
  selectAuthError,
  selectAuthStatus,
  signIn,
} from "../../features/auth/authSlice";
import { currentUser } from "../../features/auth/currentUserSlice";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";

const createSessionSchema = object({
  email: string()
    .nonempty({ message: "Email is required" })
    .email("No a valid email"),
  password: string()
    .nonempty({ message: "Password is required" })
    .min(6, "Invalid email or password"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

interface SignIn {
  theme:
    | {
        palette: {
          mode: PaletteMode;
        };
      }
    | any;
  setMode: Function;
}

const SignInScreen: FC<SignIn> = ({ theme, setMode }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const authStatus = useAppSelector(selectAuthStatus);
  const authError = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });


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
    }),
    [prefersDarkMode]
  );
  const onSubmit = (value: CreateSessionInput) => {
    dispatch(clearAuthState());
    dispatch(
      signIn({
        email: value.email,
        password: value.password,
      })
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "failed") {
      if (Array.isArray(authError)) {
        authError.map((item) => {
          enqueueSnackbar(item.message, { variant: "error" });
        });
      }
      dispatch(clearAuthState());
    }
    if (authStatus === "success") {
      enqueueSnackbar("I love hooks", { variant: "success" });
      dispatch(clearAuthState());
      navigate("/", { replace: true });
    }
  }, [authStatus]);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              error={errors.hasOwnProperty("email")}
              id="email"
              label="Email Address"
              autoComplete="email"
              helperText={errors.email?.message}
              autoFocus
              {...register("email")}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              error={errors.hasOwnProperty("password")}
              helperText={errors.password?.message}
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <LoadingButton
              type="submit"
              fullWidth
              loading={authStatus === "loading"}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // component={Links}
              // to="/"
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={Links} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInScreen;
