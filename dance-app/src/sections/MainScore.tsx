import { Box, useTheme } from "@mui/material";
import Loader from "../components/Loader";

const formatter = Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
});

// eslint-disable-next-line
export const formatScore = (score?: number | null) =>
  score ? formatter.format(score) : score;

const MainScore = ({
  score,
  subscribed,
}: {
  score: number | null | undefined;
  subscribed: boolean;
}) => {
  const theme = useTheme();
  if (!score && !subscribed) return null;

  return (
    <Box
      className="submit-container"
      sx={{ fontSize: "4rem", color: theme.palette.success.main }}
    >
      {subscribed && (!score || score === -1) ? <Loader /> : formatScore(score)}
    </Box>
  );
};

export default MainScore;
