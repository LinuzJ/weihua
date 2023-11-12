import { Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Pages } from "../context/PageContext";
import { View } from "../layouts/MainDrawerLayout";
import { Dispatch, SetStateAction } from "react";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
    top: "10px",
    left: 0,
    display: "flex",
    width: "100vw",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px",
    zIndex: "10",
  },
});

type DrawerProps = {
  view: Pages;
  setView: Dispatch<SetStateAction<View>>;
};

const Drawer = ({ view, setView }: DrawerProps) => {
  const theme = useTheme();
  const classes = useStyles({ view });

  return (
    <nav className={classes.nav}>
      <Button
        sx={{
          borderBottom: view === "home" ? "solid 3px #e43397" : "",
          backgroundColor: theme.palette.background.default,
        }}
        onClick={() => setView("home")}
      >
        Home
      </Button>
      <Button
        sx={{
          borderBottom: view === "leaderboard" ? "solid 3px #e43397" : "",
          backgroundColor: theme.palette.background.default,
        }}
        onClick={() => setView("leaderboard")}
      >
        Leaderboard
      </Button>
    </nav>
  );
};

export default Drawer;
