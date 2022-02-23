import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoginScreen from "./screen/LoginScreen";
import SignUpScreen from "./screen/SignUpScreen";
import Layout from "./screen/Layout";
import { Outlet, Route, Routes, Link } from "react-router-dom";

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
        <Route path="/" element={<Layout theme={theme} setMode={setMode} />}>
          <Route index element={<p>Home</p>} />
          <Route path="/explore" element={<p>test</p>} />
          <Route path="/library" element={<p>test</p>} />
          <Route path="/history" element={<p>test</p>} />
          <Route path="/download" element={<p>test</p>} />
          <Route path="/Settings" element={<p>test</p>} />
          <Route path="/subscriptions" element={<p>test</p>} />
          <Route path="/premium" element={<p>test</p>} />
        </Route>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
