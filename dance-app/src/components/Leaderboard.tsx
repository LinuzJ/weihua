import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import "../Leaderboard.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import pb from "../pocketBase";
import { formatScore } from "../sections/MainScore";
import { AuthContext } from "../context/AuthContext";

interface VideoData {
  id: string;
  video: string;
  created: string;
  tier: string;
  score: number;
  collectionId: string;
  expand?: {
    user: User | undefined;
  };
}

interface User {
  email: string;
  name: string;
}

function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const theme = useTheme();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    pb.collection("videos")
      .getFullList<VideoData>({ expand: "user" })
      .then((newVideos) => setVideos(newVideos))
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const scoredVideos = videos
    .filter((video) => video.expand?.user)
    .filter((video) => video.score !== 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="list">
      <Button
        sx={{
          backgroundColor: theme.palette.background.default,
          zIndex: 20,
          marginTop: "10px",
          marginLeft: "5px",
          "@media (max-width: 400px)": {
            display: "none !important",
          },
        }}
        onClick={() => logout()}
      >
        Sign Out
      </Button>
      <Stack spacing={2} overflow="scroll" alignItems="center">
        <div className="spacer">
          <Typography variant="h2" color="primary">
            Today's high scores
          </Typography>
        </div>
        {scoredVideos.map(
          ({ id, collectionId, video, tier, score, expand }) => (
            <Card
              key={id}
              padding-top="10"
              sx={{ width: "100%", maxWidth: "600px" }}
            >
              <CardMedia
                component="video"
                src={`https://junctionb.nyman.dev/api/files/${collectionId}/${id}/${video}`}
                width={120}
                autoPlay
                muted
                loop
              />
              <CardContent>
                <Typography gutterBottom variant="h4">
                  Tier {tier}
                </Typography>
                <Typography variant="body2">
                  {expand?.user?.name}
                  {": "}
                  <b>{formatScore(score)}</b>
                </Typography>
              </CardContent>
            </Card>
          ),
        )}
      </Stack>
    </div>
  );
}

export default Leaderboard;
