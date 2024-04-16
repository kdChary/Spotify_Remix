import './index.css'

const PlaylistItem = props => {
  const {songData} = props
  const {name, artist, duration} = songData

  return (
    <li className="playlist-item" data-testid="playlistItem">
      <div className="songs-data-sm">
        <p>{name}</p>
        <p>{artist}</p>
      </div>
      <div className="songs-data-lg">
        <p>{name}</p>
        <p>{artist}</p>
      </div>
      <p>{duration}</p>
    </li>
  )
}

export default PlaylistItem
