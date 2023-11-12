import { FC, useState } from "react";
import PocketBase from "pocketbase";
import { Recording } from "react-record-webcam/dist/useRecording";
import "./Submit.css";
import Loader from "./components/Loader";
import { Button } from "@mui/material";

interface SubmitProps {
  tier: number;
  video: Recording;
  pb: PocketBase;
  setConfetti: (c: boolean) => void;
}

const Submit: FC<SubmitProps> = ({ tier, video, pb, setConfetti }) => {
  const [isLoading, setIsLoading] = useState(false);

  const upload = async () => {
    const src = video.previewRef.current?.src;
    const fileType = video.fileType;
    if (src) {
      setIsLoading(true);
      const formData = new FormData();
      console.log(video.previewRef.current?.src);
      const blob = await fetch(src).then((r) => r.blob());
      console.log(blob);
      formData.append("video", blob, `${src}.${fileType}`);
      formData.append("tier", tier.toString());
      formData.append("try", "1");
      formData.append("score", "-1");
      await pb.collection("videos").create(formData);
      setTimeout(() => setIsLoading((state) => !state), 1000);
      console.log("confetti on");
      setConfetti(true);
    }
  };

  return (
    <div className="submit-container">
      <Button
        onClick={upload}
        sx={{ backgroundColor: "rgba(1, 191, 200, 0.2)", borderRadius: "15px" }}
      >
        {isLoading ? <Loader /> : "Analyze"}
      </Button>
    </div>
  );
};

export default Submit;
