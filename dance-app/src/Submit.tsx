import { useState } from "react";
import { Recording } from "react-record-webcam/dist/useRecording";
import "./Submit.css";
import Loader from "./components/Loader";
import { Button } from "@mui/material";
import pb from "./pocketBase";

interface SubmitProps {
  tier: number;
  video: Recording;
  onSubmit?: (id: string) => void;
}

const Submit = ({ tier, video, onSubmit }: SubmitProps) => {
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

      const videoRecord = await pb.collection("videos").create(formData);
      onSubmit?.(videoRecord.id);
      setIsLoading(false);
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
