import { useContext, useEffect, useRef, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { Recording } from "react-record-webcam/dist/useRecording";
import Leaderboard from "../components/Leaderboard";
import Submit from "../Submit";
import "../Recording.css";
import { PageContext } from "../context/PageContext";
import { Button, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RefVideo, Tier } from "./home";
import { useSubscribe } from "../hooks/useSubscribe";
import Score from "./score";

const useStyles = makeStyles(() => ({
  backButton: {
    marginTop: "10px!important",
    zIndex: "10",
  },
  recordButton: {
    borderRadius: "150px!important",
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
  tier: number;
  goBack: (tier: Tier | null) => void;
  setConfetti: (c: boolean) => void;
}

const RecordingPage = ({
  refVideo,
  tier,
  goBack,
  setConfetti,
}: RecordingPageProps) => {
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
  const [showCountDown, setShowCountDown] = useState<boolean>(false);
  const { data, subscribe, unsubscribe, subscribed } = useSubscribe("videos");
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

  const countDown = () => {
    console.log('countdown start')
    setShowCountDown(true)
    setTimeout(() => {
      record()
      console.log('countdown end')
      setShowCountDown(false)
    }, 3000)
  }

  const record = async () => {
    console.log('record start')
    const { current: recording } = recordingRef;
    if (recording) {
      setShowVideo(VideoState.recording);
      await startRecording(recording.id);
      setTimeout(async () => {
        await stopRecording(recording.id);
        setShowVideo(VideoState.preview);
        console.log('record end')
      }, 7000);
    }
    console.log(recordingRef.current);
  };

  useEffect(() => {
    if (data?.score) {
      setConfetti(true)
      setTimeout(() => {
        setConfetti(false)
      }, 6000)
      unsubscribe();
    }
  }, [data, unsubscribe, setConfetti]);

  return (
    <div className={`App ${page === "leaderboard" ? "view-change" : ""}`}>
      <div className="view record-view">
        <header
          className={`App-header ${showVideo === "recording" ? "hide" : ""}`}
        >
          <Button className={classes.backButton} onClick={() => goBack(null)}>
            Back
          </Button>
          <div className="record-button">
            {showCountDown ? (
              <div className="countdown" />
            ) : (
              <Button
                onClick={recordingRef.current ? countDown : initCamera}
                variant="outlined"
                className={classes.recordButton}
                sx={{ backgroundColor: "rgba(1, 191, 200, 0.1)" }}
              >
                  <Typography variant="h2">
                    {recordingRef.current ? "Start" : "Get ready"}
                  </Typography>
              </Button>
            )}
          </div>
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
        <Leaderboard />
      </div>
      <footer className="footer">
        {page === "home" &&
          recordingRef.current &&
          hasRecording &&
          !subscribed &&
          !data?.score && (
            <Submit
              tier={tier}
              video={recordingRef.current}
              onSubmit={subscribe}
            />
          )}
        {page === "home" && recordingRef.current && hasRecording && (
          <Score score={data?.score} subscribed={subscribed} />
        )}
      </footer>
    </div>
  );
};

export default RecordingPage;
