import { Box, useTheme } from "@mui/material";
import Loader from "../components/Loader";

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
      {(!score || score === -1) && subscribed ? <Loader /> : score}
    </Box>
  );
};

export default MainScore;
