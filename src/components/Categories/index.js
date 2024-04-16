import {Component} from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'

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

class Categories extends Component {
  state = {playList: [], fetchStatus: apiStateConst.initial}

  componentDidMount() {
    this.getEditorPicks()
  }

  modifyData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.icons[0].url,
  })

  retry = () => {
    this.getEditorPicks()
  }

  getEditorPicks = async () => {
    this.setState({fetchStatus: apiStateConst.inProgress})
    const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')

    const url = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timestamp}`
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
      const newData = data.categories.items.map(item => this.modifyData(item))

      this.setState({playList: newData})
      //   console.log(newData)
    } else {
      this.setState({fetchStatus: apiStateConst.failure})
      console.log('error')
    }
  }

  renderPlaylist = () => {
    const {playList} = this.state

    return (
      <>
        <h5 className="playlist-heading">Genres & Moods</h5>

        <ul className="editors-pick">
          {playList.map(item => (
            <HomeItem key={item.id} playListData={item} type="category" />
          ))}
        </ul>
      </>
    )
  }

  renderEditorPicks = () => {
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
    return <>{this.renderEditorPicks()}</>
  }
}

export default Categories
