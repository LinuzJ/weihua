import { Box, Button, useTheme } from "@mui/material";
import { FC, useState } from "react";
import "../Drawer.css";
import { makeStyles } from "@mui/styles";

interface DrawerProps {
  onSwitch: () => void;
}

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
  },
  buttons: {
    backgroundColor: "white",
    margin: "0.3rem",
  },
  drawerItems: {
    flexBasis: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const MenuItems = {
  Home: "Home",
  Leaderboard: "Leaderboard",
} as const;

const Drawer: FC<DrawerProps> = ({ onSwitch }) => {
  const [selected, setSelected] = useState<keyof typeof MenuItems>(
    MenuItems.Home,
  );
  const theme = useTheme();
  const classes = useStyles(theme);

  const toggle = (item: keyof typeof MenuItems) => {
    onSwitch();
    setSelected(item);
  };

  return (
    <Box className={classes.box}>
      <div className="drawer">
        <div className={classes.drawerItems}>
          <Button
            className={classes.buttons}
            onClick={() => toggle(MenuItems.Home)}
          >
            {MenuItems.Home}
          </Button>
          <Button
            className={classes.buttons}
            onClick={() => toggle(MenuItems.Leaderboard)}
          >
            {MenuItems.Leaderboard}
          </Button>
        </div>
        <div
          className={`drawer-slider  ${
            selected === MenuItems.Leaderboard ? "right" : ""
          }`}
        />
      </div>
    </Box>
  );
};

export default Drawer;
