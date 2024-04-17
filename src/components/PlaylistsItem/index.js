import moment from 'moment'
import './index.css'

const PlaylistItem = props => {
  const {songData, playSong} = props
  const {id, songName, artist, duration, album, addedAt} = songData

  const onClickSong = () => {
    playSong(id)
  }

  const newDate = new Date(addedAt)
  const added = moment(newDate).fromNow()
  //   console.log(added)

  const convertDuration = val => {
    const minutes = Math.floor(val / 60000)
    const seconds = ((val % 60000) / 6000).toFixed(0)

    const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
    return time
  }

  return (
    <>
      <li
        className="playlist-item"
        onClick={onClickSong}
        data-testid="playlistItem"
      >
        <div className="songs-data-sm">
          <p className="song-name">{songName}</p>
          <p className="song-artist">{artist}</p>
        </div>
        <p className="song-details">{convertDuration(duration)}</p>
      </li>

      <li className="playlist-item-lg" onClick={onClickSong}>
        <div className="song-text">
          <p className="song-details">{songName}</p>
        </div>
        <div className="song-text">
          <p className="song-details">{album}</p>
        </div>
        <div className="song-text">
          <p className="song-details">{artist}</p>
        </div>
        <div className="song-text">
          <p className="song-details">{added}</p>
        </div>

        <div className="last">
          <p className="song-details">{convertDuration(duration)}</p>
        </div>
      </li>
    </>
  )
}

export default PlaylistItem
