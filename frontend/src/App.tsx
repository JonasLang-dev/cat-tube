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
import Explore from "./pages/explore";
import Subscriptions from "./pages/subscriptions";
import AdminLayout from "./layout/admin";
import StudioLayout from "./layout/studio";
import Settings from "./pages/settings";
import Profile from "./pages/users/profile";
import History from "./pages/video/history";
import Library from "./pages/video/library";
import Download from "./pages/video/download";
import StudioVideo from "./pages/studio/video";
import AdminVideo from "./pages/admin/video";
import AdminAuth from "./pages/admin/auth";
import AdminUser from "./pages/admin/user";

export const AppContext = createContext<any>(null);

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");
  const theme = useMemo(
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

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AppContext.Provider
          value={{ setMode, theme, prefersDarkMode, colorMode }}
        >
          <Routes>
            <Route
              path="/"
              element={<Layout theme={theme} colorMode={colorMode} />}
            >
              <Route
                index
                element={<HomePage theme={theme} colorMode={colorMode} />}
              />
              <Route path="/explore" element={<Explore />} />
              <Route path="/library" element={<Library />} />
              <Route path="/history" element={<History theme={theme} />} />
              <Route path="/download" element={<Download />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/premium" element={<Pricing />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route
              path="/admin"
              element={<AdminLayout theme={theme} colorMode={colorMode} />}
            >
              <Route index element={<AdminUser />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="/admin/copyright" element={<DashboardPage />} />
              <Route path="/admin/video" element={<AdminVideo />} />
              <Route path="/admin/price" element={<DashboardPage />} />
              <Route path="/admin/ad" element={<DashboardPage />} />
            </Route>
            <Route
              path="/studio"
              element={<StudioLayout theme={theme} colorMode={colorMode} />}
            >
              <Route index element={<DashboardPage />} />
              <Route path="/studio/video" element={<StudioVideo />} />
            </Route>
            <Route
              path="/users/signin"
              element={<SignInPage theme={theme} colorMode={colorMode} />}
            />
            <Route
              path="/users/signup"
              element={<SignUpPage theme={theme} colorMode={colorMode} />}
            />
            <Route
              path="/users/password/new"
              element={<RestPassword theme={theme} colorMode={colorMode} />}
            />
          </Routes>
        </AppContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
