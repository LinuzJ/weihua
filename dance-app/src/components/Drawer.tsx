import { Box, Button, useTheme } from "@mui/material";
import { FC } from "react";
import "../Drawer.css";
import { makeStyles } from "@mui/styles";
import { Pages } from "../context/PageContext";

interface DrawerProps {
  view: Pages;
  setView: (view: Pages) => void;
}

const useStyles = makeStyles(() => ({
  box: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    width: "100vw",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    zIndex: "9",
  },
  buttons: {
    backgroundColor: "white",
    margin: "0.3rem",
  },
  drawerItems: {
    marginTop: 10,
    flexBasis: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Drawer: FC<DrawerProps> = ({ view, setView }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const toggle = (item: Pages) => {
    setView(item);
  };

  return (
    <Box className={classes.box}>
      <div className="drawer">
        <div className={classes.drawerItems}>
          <Button className={classes.buttons} onClick={() => toggle("home")}>
            home
          </Button>
          <Button
            className={classes.buttons}
            onClick={() => toggle("leaderboard")}
          >
            leaderboard
          </Button>
        </div>
        <div
          className={`drawer-slider  ${view === "leaderboard" ? "right" : ""}`}
        />
      </div>
    </Box>
  );
};

export default Drawer;
