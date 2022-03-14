import React from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, PaletteMode } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SignInScreen from "./pages/signin/SignInScreen";
import SignUpScreen from "./pages/signup/SignUpScreen";
import Layout from "./layout/user/user";
import { Route, Routes } from "react-router-dom";
import DashbordScreen from "./pages/dashbard/DashbordPage";
import HomePage from "./pages/home/HomePage";
import Pricing from "./components/PricingContent";
import Watch from "./pages/watch/index";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleSuccess = () => {
    setSuccessOpen(true);
  };
  const handleError = () => {
    setErrorOpen(true);
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: localStorage.getItem("theme")
            ? (localStorage.getItem("theme") as PaletteMode)
            : prefersDarkMode
            ? "dark"
            : "light",
        },
      }),
    [prefersDarkMode, mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout theme={theme} setMode={setMode} />}>
          <Route index element={<HomePage />} />
          <Route path="/explore" element={<p>test</p>} />
          <Route path="/library" element={<p>test</p>} />
          <Route path="/history" element={<p>test</p>} />
          <Route path="/download" element={<p>test</p>} />
          <Route path="/settings" element={<p>test</p>} />
          <Route path="/subscriptions" element={<p>test</p>} />
          <Route path="/premium" element={<Pricing />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/profile" element={<p>test</p>} />
          <Route path="/studio" element={<p>test</p>} />
          <Route path="/dashbord" element={<DashbordScreen />} />
        </Route>
        <Route
          path="/signin"
          element={
            <SignInScreen
              theme={theme}
              setMode={setMode}
              handleError={handleError}
              handleSuccess={handleSuccess}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUpScreen theme={theme} setMode={setMode} />}
        />
      </Routes>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Sign In Success
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          Failed to sign in
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
