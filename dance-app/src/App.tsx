import React, {useEffect, useRef, useState} from 'react';
import { useRecordWebcam } from 'react-record-webcam'
import logo from './logo.svg';
import './App.css';
import {Recording} from 'react-record-webcam/dist/useRecording';

function App() {
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
  } = useRecordWebcam()
  const [showVideo, setShowVideo] = useState<'recording' | 'preview' | null>(null)
  const recordingRef = useRef<Recording | null>(null)

  const initCamera = async () => {
    const newRecording = await createRecording()
    if (!newRecording) {
      console.error('Could not create recording')
      return
    }
    recordingRef.current = newRecording
    await openCamera(newRecording.id)
  }
  
  const record = async () => {
    const { current: recording } = recordingRef
    if (recording) {
      setShowVideo('recording')
      await startRecording(recording.id)
      await new Promise((resolve) => (
       setTimeout(() => {
          setShowVideo('preview')
          console.log('resolve')
          return resolve(true)
        }, 3000)))
      await stopRecording(recording.id)
    }
  }

  return (
    <div className="App">
      <header className={`App-header ${showVideo === 'recording' ? 'hide' : ''}`}>
        <button className='record-button' onClick={recordingRef.current ? record : initCamera}>
          {recordingRef.current ? 'Record' : 'Start'}
        </button>
      </header>
      <div className='container'>
        {activeRecordings.map((recording) => (
          <div className='video-container' key={recording.id}>
            <video className={showVideo === 'preview' ? 'hide' : ''} ref={recording.webcamRef} autoPlay muted />
            <video className={showVideo === 'preview' ? '' : 'hide'} ref={recording.previewRef} autoPlay muted loop />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
