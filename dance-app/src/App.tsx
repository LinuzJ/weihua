import { useRef, useState } from "react";
import { useRecordWebcam } from "react-record-webcam";
import "./App.css";
import { Recording } from "react-record-webcam/dist/useRecording";

enum VideoState {
  recording = "recording",
  preview = "preview",
}

const options = {
  mimeType: "video/webm;codecs:vp9",
};

function App() {
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam({
    recorderOptions: options,
  });
  const [showVideo, setShowVideo] = useState<VideoState>(VideoState.preview);
  const recordingRef = useRef<Recording | null>(null);

  const initCamera = async () => {
    const newRecording = await createRecording();
    if (!newRecording) {
      console.error("Could not create recording");
      return;
    }
    recordingRef.current = newRecording;
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
  };

  return (
    <div className="App">
      <header
        className={`App-header ${showVideo === "recording" ? "hide" : ""}`}
      >
        <button
          className="record-button"
          onClick={recordingRef.current ? record : initCamera}
        >
          {recordingRef.current ? "Record" : "Start"}
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
  );
}

export default App;
