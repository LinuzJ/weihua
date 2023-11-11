import {useState} from "react"
import Loader from "./Loader"

interface VideoData {
  id: string
  src: string
  user: string
}

function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [leaderBoardEntries, setLeaderBoardEntries] = useState<VideoData[]>([])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      {leaderBoardEntries.map((entry) => (
        <div key={entry.id}>
          {entry.user}
          <video preload="metadata">
            <source src={`${entry.src}#t=0.1`} type='video/mp4' />
          </video>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
