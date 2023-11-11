import { useContext, useRef, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { Recording } from "react-record-webcam/dist/useRecording";
import Leaderboard from "../components/Leaderboard";
import Submit from "../Submit";
import "../Recording.css";
import { RefVideo, Tier } from "./landing";
import Pocketbase from "pocketbase";
import { PageContext } from "../context/PageContext";
import { Button, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  backButton: {
    zIndex: "10",
  },
}));

enum VideoState {
  recording = "recording",
  preview = "preview",
}

const options = {
  mimeType: "video/webm;codecs:vp9",
};

interface RecordingPageProps {
  refVideo: RefVideo | undefined;
  pb: Pocketbase;
  goBack: (tier: Tier | null) => void;
}

const RecordingPage = ({ refVideo, pb, goBack }: RecordingPageProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const constraints: { aspectRatio: number; height: number; width: number } = {
    aspectRatio: 2.33,
    height: 200,
    width: 100,
  };
  const {
    applyConstraints,
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam({
    recorderOptions: options,
    constraints,
  });
  const page = useContext(PageContext);
  const [showVideo, setShowVideo] = useState<VideoState>(VideoState.preview);
  const recordingRef = useRef<Recording | null>(null);
  const hasRecording = recordingRef.current?.previewRef.current?.src;

  const initCamera = async () => {
    const newRecording = await createRecording();
    if (!newRecording) {
      console.error("Could not create recording");
      return;
    }
    recordingRef.current = newRecording;
    applyConstraints(newRecording.id, constraints);
    await openCamera(newRecording.id);
  };

  const record = async () => {
    const { current: recording } = recordingRef;
    if (recording) {
      setShowVideo(VideoState.recording);
      await startRecording(recording.id);
      setTimeout(async () => {
        await stopRecording(recording.id);
        setShowVideo(VideoState.preview);
      }, 7000);
    }
    console.log(recordingRef.current);
  };
  return (
    <div className={`App ${page === "leaderboard" ? "view-change" : ""}`}>
      <div className="view record-view">
        <header
          className={`App-header ${showVideo === "recording" ? "hide" : ""}`}
        >
          <Button className={classes.backButton} onClick={() => goBack(null)}>
            Back
          </Button>
          <button
            className="record-button"
            onClick={recordingRef.current ? record : initCamera}
          >
            <span>{recordingRef.current ? "Record" : "Start"}</span>
          </button>
        </header>
        <div className="container">
          {activeRecordings.map((recording) => (
            <div className="video-container" key={recording.id}>
              <video
                className={hasRecording ? "hide" : ""}
                ref={recording.webcamRef}
                autoPlay
                muted
              />
              <video
                className={hasRecording ? "" : "hide"}
                ref={recording.previewRef}
                autoPlay
                muted
                loop
              />
            </div>
          ))}
          {recordingRef.current
            ? null
            : refVideo && (
                <video
                  src={`https://junctionb.nyman.dev/api/files/${refVideo.collectionId}/${refVideo.id}/${refVideo.video}`}
                  autoPlay
                  muted
                  loop
                />
              )}
        </div>
      </div>
      <div className="view leaderboard-view">
        <Leaderboard pb={pb} />
      </div>
      <footer className="footer">
        {recordingRef.current && hasRecording && page === "home" ? (
          <Submit tier={1} video={recordingRef.current} pb={pb} />
        ) : null}
      </footer>
    </div>
  );
};

export default RecordingPage;
