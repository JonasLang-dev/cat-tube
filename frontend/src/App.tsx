import React from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme, PaletteMode } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SignInScreen from "./screen/SignInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import Layout from "./screen/Layout";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import DashbordScreen from "./screen/DashbordScreen";

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
      <Routes>
        <Route path="/" element={<Layout theme={theme} setMode={setMode} />}>
          <Route index element={<HomeScreen />} />
          <Route path="/explore" element={<p>test</p>} />
          <Route path="/library" element={<p>test</p>} />
          <Route path="/history" element={<p>test</p>} />
          <Route path="/download" element={<p>test</p>} />
          <Route path="/settings" element={<p>test</p>} />
          <Route path="/subscriptions" element={<p>test</p>} />
          <Route path="/premium" element={<p>test</p>} />
          <Route path="/watch" element={<p>test</p>} />
          <Route path="/profile" element={<p>test</p>} />
          <Route path="/studio" element={<p>test</p>} />
          <Route path="/dashbord" element={<DashbordScreen />} />
        </Route>
        <Route
          path="/signin"
          element={<SignInScreen theme={theme} setMode={setMode} />}
        />
        <Route
          path="/signup"
          element={<SignUpScreen theme={theme} setMode={setMode} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
