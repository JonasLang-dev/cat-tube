import React, { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, PaletteMode } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Layout from "./layout/user/user";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import Pricing from "./components/PricingContent";
import Watch from "./pages/watch/index";
import { SnackbarProvider } from "notistack";
import RestPassword from "./pages/users/password/new";
import SignInPage from "./pages/users/signin/SignInPage";
import SignUpPage from "./pages/users/signup/SignUpPage";

export const AppContext = createContext<any>(null);

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
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

  const colorMode = React.useMemo(
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

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AppContext.Provider
          value={{ setMode, theme, prefersDarkMode, colorMode }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
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
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="/users/signin" element={<SignInPage />} />
            <Route path="/users/signup" element={<SignUpPage />} />
            <Route path="/users/password/new" element={<RestPassword />} />
          </Routes>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
