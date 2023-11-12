import { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Leaderboard from "../components/Leaderboard";
import HomeSection from "./home";

interface LandingPageProps {
  setConfetti: (c: boolean) => void;
}

const LandingPage = ({ setConfetti }: LandingPageProps) => {
  const page = useContext(PageContext);
  return page === "home" ? (
    <HomeSection setConfetti={setConfetti} />
  ) : (
    <Leaderboard />
  );
};

export default LandingPage;
