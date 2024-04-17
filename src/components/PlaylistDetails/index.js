import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import BackBtn from '../BackBtn'
import Loading from '../LoadingView'
import Failure from '../FailurePage'
import PlaylistItem from '../PlaylistsItem'
import AudioPlayer from '../AudioPlayer'

const apiStateConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PlaylistDetails extends Component {
  state = {
    playListData: {},
    tracks: [],
    songData: {},
    playSong: false,
    fetchStatus: apiStateConst.initial,
  }

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  retry = () => {
    this.getSpecificPlaylist()
  }

  playSong = id => {
    const {tracks} = this.state

    const song = tracks.filter(item => item.id === id)

    this.setState({songData: song[0], playSong: true})
    // console.log(song)
    // console.log('clicked')
  }

  modifyTracks = item => ({
    id: item.track.id,
    songName: this.changeName(item.track.name),
    album: this.changeName(item.track.album.name),
    songImage: item.track.album.images[0].url,
    artist: this.changeName(item.track.album.artists[0].name),
    duration: item.track.duration_ms,
    addedAt: item.added_at,
    previewUrl: item.track.preview_url,
    popularity: item.track.popularity,
  })

  getSpecificPlaylist = async () => {
    this.setState({fetchStatus: apiStateConst.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const modifyData = {
        id: data.id,
        name: this.changeName(data.name),
        followers: data.followers.total,
        image: data.images[0].url,
        tracks: data.tracks.items.map(track => this.modifyTracks(track)),
      }

      const songsList = modifyData.tracks

      this.setState({
        playListData: modifyData,
        fetchStatus: apiStateConst.success,
        tracks: songsList,
      })

      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiStateConst.failure})
    }
  }

  renderSuccessView = () => {
    const {playListData, tracks, songData, playSong} = this.state
    const {name, image} = playListData

    // console.log(songData)

    return (
      <>
        <div className="playlist-header">
          <img
            src={image}
            alt="featured playlist"
            className="playlist-head-img"
          />
          <h3 className="playlist-title">{name}</h3>
          <p className="playlist-head-text-sm"> KSD </p>

          <div className="playlist-details-lg">
            <p className="playlist-head-text"> Editor&#39;s Picks</p>

            <h1 className="playlist-title-lg">{name}</h1>

            <p className="playlist-head-text"> KSD </p>
          </div>
        </div>

        <div className="songs-container">
          <div className="song-headings" data-testid="songHeadings">
            <div>
              <p className="song-heading">Track</p>
            </div>
            <div>
              <p className="song-heading">Album</p>
            </div>
            <div>
              <p className="song-heading">Artist</p>
            </div>
            <div>
              <p className="song-heading">Time</p>
            </div>
            <div>
              <p className="song-heading">Time</p>
            </div>
          </div>
          <hr className="line" />
          <ul className="songs-list">
            {tracks.map(track => (
              <PlaylistItem
                key={track.id}
                songData={track}
                playSong={this.playSong}
              />
            ))}
          </ul>
        </div>

        {playSong && <AudioPlayer songData={songData} />}
      </>
    )
  }

  renderPlaylistDetails = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiStateConst.inProgress:
        return <Loading />

      case apiStateConst.success:
        return <>{this.renderSuccessView()}</>

      case apiStateConst.failure:
        return <Failure method={this.retry} />

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div
          className="specific-playlist-details"
          data-testid="specificPlaylistDetails"
        >
          <BackBtn />
          {this.renderPlaylistDetails()}
        </div>
      </>
    )
  }
}

export default PlaylistDetails
