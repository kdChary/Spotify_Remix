import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import BackBtn from '../BackBtn'

const apiStateConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PlaylistDetails extends Component {
  state = {playListData: {}, fetchStatus: apiStateConst.initial}

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  retry = () => {
    this.getSpecificPlaylist()
  }

  convertDuration = val => {
    const minutes = Math.floor(val / 60000)
    const seconds = ((val % 60000) / 6000).toFixed(0)

    const time = `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`
    return time
  }

  changeName = val => {
    const indx = val.indexOf('(')
    return val.slice(0, indx)
  }

  modifyTracks = item => ({
    id: item.track.id,
    name: this.changeName(item.track.name),
    duration: this.convertDuration(item.track.duration_ms),
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
        name: data.name,
        followers: data.followers.total,
        image: data.images[0].url,
        tracks: data.tracks.items.map(track => this.modifyTracks(track)),
      }

      this.setState({
        playListData: modifyData,
        fetchStatus: apiStateConst.success,
      })
      console.log(data)
    } else {
      this.setState({fetchStatus: apiStateConst.failure})
    }
  }

  render() {
    const {playListData} = this.state
    const {name, image} = playListData
    return (
      <>
        <Header />
        <div
          className="specific-playlist-details"
          data-testid="specificPlaylistDetails"
        >
          <BackBtn />
          <div className="playlist-header">
            <img
              src={image}
              alt="featured playlist"
              className="playlist-head-img"
            />
            <h3 className="playlist-title">{name}</h3>
            <div className="playlist-details-lg">
              <p className="playlist-head-text"> Editor&#39;s Picks</p>
              <h1 className="playlist-title-lg">{name}</h1>
              <p className="playlist-head-text"> KSD </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PlaylistDetails
