import { useEffect, useState } from "react";
import Loader from "./Loader";
import PocketBase from "pocketbase";
import "../Leaderboard.css";
import {Card, CardContent, CardMedia, Stack, Typography} from "@mui/material";

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
interface LeaderboardProps {
  pb: PocketBase;
}

function Leaderboard({ pb }: LeaderboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const newVideos = await pb
        .collection("videos")
        .getFullList<VideoData>({ expand: "user" });
      console.log(newVideos);
      setVideos(newVideos);
      setIsLoading(false);
    };
    getVideos();
  }, [pb]);

  if (isLoading) {
    return <Loader />;
  }

  const scoredVideos = videos
    .filter((video) => video.expand?.user)
    .filter((video) => video.score !== 0)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="list">
      <Stack spacing={2} overflow="scroll">
        <div className="spacer">
          <Typography variant="h2" color="primary">
            Todays high scores
          </Typography>
        </div>
        {scoredVideos.map(({ id, collectionId, video, tier, score, expand }) => (
          <Card key={id} padding-top="10" >
            <CardMedia
              component="video"
              src={`https://junctionb.nyman.dev/api/files/${collectionId}/${id}/${video}`}
              width={120}
              autoPlay
              muted
              loop
             />
            <CardContent>
              <Typography gutterBottom variant="h4">Tier {tier}</Typography>
              <Typography variant="body2">
                {expand?.user?.name}
                {': '}
                <b>{score}</b>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}

export default Leaderboard;
