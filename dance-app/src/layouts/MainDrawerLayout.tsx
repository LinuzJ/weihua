import { makeStyles } from "@mui/styles";
import Drawer from "../components/Drawer";
import { useState } from "react";
import { defaultPageContext, PageContext } from "../context/PageContext";

type MainDrawerLayoutProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    display: "flex",
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
  },
}));

const MainDrawerLayout = ({ children }: MainDrawerLayoutProps) => {
  const [view, setView] = useState<"home" | "leaderboard">(defaultPageContext);
  const classes = useStyles();
  return (
    <PageContext.Provider value={view}>
      <div className={classes.root}>
        <Drawer view={view} setView={setView} />
        <main>{children}</main>
      </div>
    </PageContext.Provider>
  );
};

export default MainDrawerLayout;
