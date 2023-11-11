import { useRef, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { Recording } from "react-record-webcam/dist/useRecording";
import Drawer from "../Drawer";
import Leaderboard from "../Leaderboard";
import Submit from "../Submit";
import "../Recording.css";

enum VideoState {
  recording = "recording",
  preview = "preview",
}

const options = {
  mimeType: "video/webm;codecs:vp9",
};

const RecordingPage = () => {
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
  });
  const [showVideo, setShowVideo] = useState<VideoState>(VideoState.preview);
  const [view, setView] = useState<"record" | "leaderboard">("record");
  const recordingRef = useRef<Recording | null>(null);

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
      }, 3000);
    }
    console.log(recordingRef.current);
  };
  return (
    <div className={`App ${view === "leaderboard" ? "view-change" : ""}`}>
      <Drawer
        onSwitch={() => setView(view === "record" ? "leaderboard" : "record")}
      />
      <div className="view record-view">
        <header
          className={`App-header ${showVideo === "recording" ? "hide" : ""}`}
        >
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
                className={showVideo === "preview" ? "hide" : ""}
                ref={recording.webcamRef}
                autoPlay
                muted
              />
              <video
                className={showVideo === "preview" ? "" : "hide"}
                ref={recording.previewRef}
                autoPlay
                muted
                loop
              />
            </div>
          ))}
        </div>
      </div>
      <div className="view leaderboard-view">
        <Leaderboard />
      </div>
      <footer className="footer">
        {recordingRef.current ? <Submit video={recordingRef.current} /> : null}
      </footer>
    </div>
  );
};

export default RecordingPage;