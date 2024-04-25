import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import BackBtn from '../BackBtn'
import Loading from '../LoadingView'
import Failure from '../FailurePage'
import AudioPlayer from '../AudioPlayer'

const apiStateConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Album extends Component {
  state = {album: {}, fetchStatus: apiStateConst.initial}

  componentDidMount() {
    this.getAlbumDetails()
  }

  // Modifying the tracks data of album.
  modifyData = data => ({
    songName: data.name,
    songId: data.id,
    previewUrl: data.preview_url,
  })

  // fetching the response from the "API".
  getAlbumDetails = async () => {
    this.setState({fetchStatus: apiStateConst.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const access = Cookies.get('jwt_token')

    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const newData = {
        name: data.name,
        artist: data.artists[0].name,
        image: data.images[0].url,
        tracks: data.tracks.items.map(track => this.modifyData(track)),
      }

      this.setState({fetchStatus: apiStateConst.success, album: newData})
      console.log(newData)
    } else {
      this.setState({fetchStatus: apiStateConst.failure})
    }
  }

  // rendering the jsx element with the received response.
  albumPage = () => {
    const {album} = this.state
    const {name, image, artist, tracks} = album

    return (
      <div>
        <div>
          <img src={image} alt="album" className="playlist-head-img" />
          <h2 className="album-title">{name}</h2>
          <p className="album-artist">{artist}</p>
        </div>
        <ul className="songs-list">
          {tracks.map(item => (
            <AudioPlayer key={item.songId} songData={tracks} />
          ))}
        </ul>
      </div>
    )
  }

  // Using fetch status to edit the display content.
  renderSuccessView = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiStateConst.inProgress:
        return <Loading />

      case apiStateConst.success:
        return <>{this.albumPage()}</>

      case apiStateConst.failure:
        return <Failure method={this.getAlbumDetails} />

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="album-page" data-testid="albumPage">
          <BackBtn />
          {this.renderSuccessView()}
        </div>
      </>
    )
  }
}

export default Album
