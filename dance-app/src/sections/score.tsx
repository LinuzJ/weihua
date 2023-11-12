import { Box, useTheme } from "@mui/material";
import Loader from "../components/Loader";

const Score = ({
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
      {!score && subscribed ? <Loader /> : score}
    </Box>
  );
};

export default Score;
