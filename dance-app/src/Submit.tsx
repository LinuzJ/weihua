import { FC, useState } from 'react';
import PocketBase from 'pocketbase'
import {Recording} from 'react-record-webcam/dist/useRecording';
import './Submit.css'
import Loader from './Loader';

const pb = new PocketBase('https://junctionb.nyman.dev')

interface SubmitProps {
  tier: number
  video: Recording
}

const Submit: FC<SubmitProps> = ({ tier, video }) => {
  const [isLoading, setIsLoading] = useState(false)

  const upload = async () => {
    const src = video.previewRef.current?.src
    const fileType = video.fileType
    if (src) {
      setIsLoading(true)
      const formData = new FormData()
      console.log(video.previewRef.current?.src)
      const blob = await fetch(src).then(r => r.blob());
      console.log(blob)
      formData.append('video', blob, `${src}.${fileType}`)
      formData.append('tier', tier.toString())
      await pb.collection('videos').create(formData)
      setTimeout(() => setIsLoading((state) => !state), 1000)
    }
  }
  return (
    <div className='submit-container'>
      <button onClick={upload}>
        {isLoading ? <Loader /> : 'Analyze'}
      </button>
    </div>
  )
}

export default Submit
