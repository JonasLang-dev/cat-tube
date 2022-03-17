import React from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, PaletteMode } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "./layout/user/user";
import { Route, Routes } from "react-router-dom";
import DashbordPage from "./pages/dashbard/DashbordPage";
import HomePage from "./pages/home/HomePage";
import Pricing from "./components/PricingContent";
import Watch from "./pages/watch/index";
import { SnackbarProvider } from "notistack";
import RestPassword from "./pages/users/password/new";
import SuccessSignUp from "./pages/users/signup/successPage";
import SignInPage from "./pages/users/signin/SignInPage";
import SignUpPage from "./pages/users/signup/SignUpPage";

function App() {
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
      <SnackbarProvider>
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
            <Route path="/dashbord" element={<DashbordPage />} />
          </Route>
          <Route
            path="/users/signin"
            element={<SignInPage theme={theme} setMode={setMode} />}
          />
          <Route
            path="/users/signup"
            element={<SignUpPage theme={theme} setMode={setMode} />}
          />
          <Route path="/users/signup/success" element={<SuccessSignUp />} />
          <Route path="/users/password/new" element={<RestPassword />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
