import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'

const apiStateConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Album extends Component {
  state = {album: [], fetchStatus: apiStateConst.initial}

  componentDidMount() {
    this.getAlbumDetails()
  }

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
      console.log(data)
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="album-page" data-testid="albumPage">
          Album
        </div>
      </>
    )
  }
}

export default Album
