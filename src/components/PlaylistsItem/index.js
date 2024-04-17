import './index.css'

const PlaylistItem = props => {
  const {songData, playSong} = props
  const {id, songName, artist, duration, album} = songData

  const onClickSong = () => {
    playSong(id)
  }

  return (
    <>
      <li className="playlist-item" onClick={onClickSong}>
        <div className="songs-data-sm">
          <p className="song-name">{songName}</p>
          <p className="song-artist">{artist}</p>
        </div>
        <p className="song-details">{duration}</p>
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

        <div className="last">
          <p className="song-details">{duration}</p>
        </div>
      </li>
    </>
  )
}

export default PlaylistItem
