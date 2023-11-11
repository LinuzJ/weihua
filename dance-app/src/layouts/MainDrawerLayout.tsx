import { makeStyles } from "@mui/styles";
import Drawer from "../components/Drawer";
import { useContext, useState } from "react";
import { defaultPageContext, PageContext } from "../context/PageContext";
import { AuthContext } from "../context/AuthContext";
import Login from "../sections/login";

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
  const { user } = useContext(AuthContext);
  const [view, setView] = useState<"home" | "leaderboard">(defaultPageContext);
  const classes = useStyles();

  if (user?.token === undefined || user?.token === "") {
    return <Login />;
  }

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
