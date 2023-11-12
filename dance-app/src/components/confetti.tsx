import { useWindowSize } from "@uidotdev/usehooks";
import ReactConfetti from "react-confetti";

const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      style={{ position: "absolute", top: "0" }}
      width={width}
      height={height}
    />
  );
};

export default Confetti;
