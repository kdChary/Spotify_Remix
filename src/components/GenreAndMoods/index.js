import {Component} from 'react'
import Cookies from 'js-cookie'
// import moment from 'moment'

import './index.css'
import Header from '../Header'
import BackBtn from '../BackBtn'
import CategoryItem from '../GenreItem'
import Loading from '../LoadingView'
import Failure from '../FailurePage'

const apiStatConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CategoryPlaylist extends Component {
  state = {playLists: [], fetchStatus: apiStatConst.initial}

  componentDidMount() {
    this.getCategoryPlaylist()
  }

  getCategoryPlaylist = async () => {
    this.setState({fetchStatus: apiStatConst.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`

    // const timestamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
    // const url1 = `https://apis2.ccbp.in/spotify-clone/categories?country=IN&timestamp=${timestamp}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      this.setState({fetchStatus: apiStatConst.success})
      const data = await response.json()
      const lists = data.playlists.items.filter(item => item !== null)

      const modifyCategories = lists.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.images[0].url,
        tracks: eachItem.tracks.total,
      }))

      this.setState({playLists: modifyCategories})

      //   console.log(data)
    } else {
      this.setState({fetchStatus: apiStatConst.failure})
    }
  }

  renderCategoriesList = () => {
    const {playLists} = this.state
    const {location} = this.props
    const {pathname} = location
    const title = pathname.split('/')[3]

    return (
      <>
        <BackBtn />
        <div
          data-testid="categoryPlayListContainer"
          className="category-playList-container"
        >
          <h5 className="title">{title}</h5>
          <ul className="category-playList">
            {playLists.map(item => (
              <CategoryItem key={item.id} itemData={item} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case apiStatConst.inProgress:
        return <Loading />

      case apiStatConst.success:
        return <>{this.renderCategoriesList()}</>

      case apiStatConst.failure:
        return <Failure />

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="category-playlist-bg" data-testid="categoryPlaylistBg">
          <BackBtn />
          {this.renderSuccessView()}
        </div>
      </>
    )
  }
}

export default CategoryPlaylist
