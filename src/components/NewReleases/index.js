import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Loading from '../LoadingView'
import HomeItem from '../HomeItem'
import Failure from '../FailurePage'

const apiStateConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class NewReleases extends Component {
  state = {playList: [], fetchStatus: apiStateConst.initial}

  componentDidMount() {
    this.getNewReleases()
  }

  changeName = val => {
    const indx = val.indexOf('(')
    if (indx > 0) {
      return val.slice(0, indx)
    }
    return val
  }

  retry = () => {
    this.getNewReleases()
  }

  modifyData = data => ({
    id: data.id,
    name: this.changeName(data.name),
    imageUrl: data.images[0].url,
  })

  getNewReleases = async () => {
    this.setState({fetchStatus: apiStateConst.inProgress})

    const url = ' https://apis2.ccbp.in/spotify-clone/new-releases'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({fetchStatus: apiStateConst.success})

      const data = await response.json()
      const newData = data.albums.items.map(item => this.modifyData(item))

      this.setState({playList: newData})
      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiStateConst.failure})
      console.log('error')
    }
  }

  renderPlaylist = () => {
    const {playList} = this.state

    return (
      <>
        <h5 className="playlist-heading">New Releases</h5>

        <ul className="new-releases">
          {playList.map(item => (
            <HomeItem key={item.id} playListData={item} type="album" />
          ))}
        </ul>
      </>
    )
  }

  renderNewReleases = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiStateConst.inProgress:
        return <Loading />

      case apiStateConst.success:
        return <>{this.renderPlaylist()}</>

      case apiStateConst.failure:
        return <Failure method={this.retry} />

      default:
        return null
    }
  }

  render() {
    return <>{this.renderNewReleases()}</>
  }
}

export default NewReleases
