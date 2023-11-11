import { useEffect, useState } from "react";
import Loader from "./Loader";
import PocketBase from "pocketbase";
import "./Leaderboard.css";

interface VideoData {
  id: string;
  video: string;
  created: string;
  collectionId: string;
}

interface Score {
  id: string;
  score: number;
  tier: string;
  expand: {
    video: VideoData;
    user: User;
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
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const getVideos = async () => {
      const newScores = await pb
        .collection("scores")
        .getFullList<Score>({ expand: "video, user" });
      console.log(newScores);
      setScores(newScores);
      setIsLoading(false);
    };
    getVideos();
  }, [pb]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="leaderboard-list">
      <div className="spacer" />
      {scores.map(({ score, tier, expand: { video: entry, user } }) => (
        <div className="card" key={entry.id}>
          <video
            src={`https://junctionb.nyman.dev/api/files/${entry.collectionId}/${entry.id}/${entry.video}`}
            preload="metadata"
            autoPlay
            muted
            loop
          />
          <div className="text-container">
            <h4>{tier}</h4>
            <p>
              {user.name}: {score}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
