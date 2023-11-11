import { useState } from "react";

import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import { AuthContext, defaultAuthContext } from "./context/AuthContext";

import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import Login from "./sections/login";
import LandingPage from "./sections/landing";

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

  const [auth, setAuth] =
    useState<RecordAuthResponse<RecordModel>>(defaultAuthContext);

  return (
    <AuthContext.Provider value={auth}>
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
          {auth.token !== "" ? (
            <LandingPage />
          ) : (
            <Login setAuth={setAuth} pb={pb} />
          )}
        </Box>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
