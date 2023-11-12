import { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Leaderboard from "../components/Leaderboard";
import HomeSection from "./home";

const LandingPage = () => {
  const page = useContext(PageContext);
  return page === "home" ? <HomeSection /> : <Leaderboard />;
};

export default LandingPage;
