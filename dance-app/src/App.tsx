import { useState } from "react";

import PocketBase, { RecordAuthResponse } from "pocketbase";
import { AuthProvider } from "./context/AuthContext";

import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import Login from "./sections/login";
import LandingPage from "./sections/landing";
import MainDrawerLayout from "./layouts/MainDrawerLayout";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, 'Montserrat Classic', sans-serif",
  },
  palette: {
    background: {
      default: "#121640",
    },
    primary: {
      main: "#00c4cc", // big text
    },
    secondary: {
      main: "#e43397", // small text
    },
    error: {
      main: "#ee3ec9",
    },
    warning: {
      main: "#4c0bd1",
    },
    info: {
      main: "#7900ff",
    },
    success: {
      main: "#cb88ff",
    },
  },
});

function App() {
  const pb = new PocketBase("https://junctionb.nyman.dev");

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <MainDrawerLayout>
            <LandingPage />
          </MainDrawerLayout>
        </Box>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
