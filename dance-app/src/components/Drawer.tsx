import { Button } from "@mui/material";
import "../Drawer.css";
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
    zIndex: "10",
  },
});

type DrawerProps = {
  view: Pages;
  setView: Dispatch<SetStateAction<View>>;
};

const Drawer = ({ view, setView }: DrawerProps) => {
  const classes = useStyles({ view });

  return (
    <nav className={classes.nav}>
      <Button
        sx={{ borderBottom: view === "home" ? "solid 2px white" : "" }}
        onClick={() => setView("home")}
      >
        Home
      </Button>
      <Button
        sx={{ borderBottom: view === "leaderboard" ? "solid 2px white" : "" }}
        onClick={() => setView("leaderboard")}
      >
        Leaderboard
      </Button>
    </nav>
  );
};

export default Drawer;
