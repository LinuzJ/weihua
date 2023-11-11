import { useEffect, useState } from "react";
import Loader from "./Loader";
import PocketBase from "pocketbase";
import "./Leaderboard.css";

interface VideoData {
  id: string;
  video: string;
  created: string;
  tier: string
  score: number
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pb = new PocketBase("https://junctionb.nyman.dev");
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const newVideos = await pb
        .collection("videos")
        .getFullList<VideoData>({ expand: "user" });
      console.log(newVideos)
      setVideos(newVideos);
      setIsLoading(false);
    };
    getVideos();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const scoredVideos = videos
    .filter((video) => video.expand?.user)
    .filter((video) => video.score !== 0)
    .sort((a, b) => a.score - b.score)

  return (
    <div className="leaderboard-list">
      <div className="spacer" />
      {scoredVideos.map(({ id, collectionId, video, tier, score, expand }) => (
        <div className="card" key={id}>
          <video
            src={`https://junctionb.nyman.dev/api/files/${collectionId}/${id}/${video}`}
            preload="metadata"
            autoPlay
            muted
            loop
          />
          <div className="text-container">
            <h4>{tier}</h4>
            <p>
              {expand?.user?.name}: {score}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
