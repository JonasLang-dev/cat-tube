import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
import SignUpScreen from "./screen/SignUpScreen";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState(prefersDarkMode ? "dark" : "light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // @ts-ignore
          mode: localStorage.getItem("theme")
            ? localStorage.getItem("theme")
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
        <Route
          path="/"
          element={<HomeScreen theme={theme} setMode={setMode} />}
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
