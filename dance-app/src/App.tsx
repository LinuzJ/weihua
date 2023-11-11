import { useState } from "react";

import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import { AuthContext, defaultAuthContext } from "./context/AuthContext";

import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import Login from "./sections/login";
import RecordingPage from "./sections/recording";

const theme = createTheme({
  // Customize your theme here
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF4081",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  const pb = new PocketBase("https://junctionb.nyman.dev");

  const [auth, setAuth] =
    useState<RecordAuthResponse<RecordModel>>(defaultAuthContext);

  console.log(auth);
  return (
    <AuthContext.Provider value={auth}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          {auth.token !== "" ? (
            <RecordingPage />
          ) : (
            <Login setAuth={setAuth} pb={pb} />
          )}
        </Box>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
