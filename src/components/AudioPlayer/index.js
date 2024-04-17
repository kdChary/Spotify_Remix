/* eslint-disable jsx-a11y/media-has-caption */
import {useState, useRef, useEffect} from 'react'
import {FaPlay, FaPause, FaVolumeUp} from 'react-icons/fa'

import './index.css'

const AudioPlayer = props => {
  const [isPlaying, playSong] = useState(true)
  const {songData} = props
  const {songName, songImage, artist, previewUrl, duration} = songData

  const audioPlayer = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

  //   const convertDuration = val => {
  //     const minutes = Math.floor(val / 60000)
  //     const seconds = ((val % 60000) / 6000).toFixed(0)

  //     const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
  //     return time
  //   }

  const toggleIsPlaying = () => {
    const play = isPlaying

    const whilePlaying = () => {
      progressBar.current.value = audioPlayer.current.currentTime
      progressBar.current.style.setProperty(
        '#12f911',
        `${(progressBar.current.value / duration) * 100}%`,
      )
      animationRef.current = requestAnimationFrame(whilePlaying)
    }

    playSong(!play)
    if (!play) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  useEffect(() => {
    progressBar.current.max = duration
  }, [progressBar, duration])

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    progressBar.current.style.setProperty(
      '#12f911',
      `${(progressBar.current.value / duration) * 100}%`,
    )
  }

  return (
    <div className="playlist-footer">
      <div className="song-header">
        <img src={songImage} alt={songName} className="song-img" />

        <div className="playing-song-details">
          <h5 className="footer-song-name">{songName}</h5>

          <p className="song-artist">{artist}</p>
        </div>
      </div>
      <div className="media-player">
        <div className="song-controls">
          <audio
            ref={audioPlayer}
            src={previewUrl}
            preload="metadata"
            autoPlay
          />
          <button
            type="button"
            onClick={toggleIsPlaying}
            className="play-pause-btn"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="play" />}
          </button>
          <input
            type="range"
            id="song"
            className="song progress"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <div className="volume-controls">
          <FaVolumeUp color="#ffff" />
          <input type="range" id="volume" className="volume progress" />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
