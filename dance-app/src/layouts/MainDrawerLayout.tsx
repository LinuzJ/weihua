import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Drawer from "../components/Drawer";
import { useState } from "react";
import { defaultPageContext, PageContext } from "../context/PageContext";

type MainDrawerLayoutProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    marginTop: "0.5rem",
    // justifyContent: "center",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    height: "12vh", // 10% of the screen height
  },
}));

const MainDrawerLayout = ({ children }: MainDrawerLayoutProps) => {
  const [view, setView] = useState<"home" | "leaderboard">(defaultPageContext);
  const classes = useStyles();

  return (
    <PageContext.Provider value={view}>
      <div className={classes.root}>
        <Drawer
          onSwitch={() => setView(view === "home" ? "leaderboard" : "home")}
        />
        <main>{children}</main>
      </div>
    </PageContext.Provider>
  );
};

export default MainDrawerLayout;
