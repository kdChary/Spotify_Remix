import {Link} from 'react-router-dom'

import './index.css'
import BackBtn from '../BackBtn'
import Header from '../Header'

const NotFound = props => {
  const {history} = props
  return (
    <>
      <Header />
      <div className="not-found-bg" data-testid="notFoundBg">
        <BackBtn history={history} />
        <img
          src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712285974/1Spotify/404-sm.png"
          alt="page not found"
          className="not-found-img"
        />
        <h1 className="not-found-title">Page Not Found</h1>
        <Link to="/" className="link-item">
          <button className="not-found-btn" type="button">
            Home Page
          </button>
        </Link>
      </div>
    </>
  )
}

export default NotFound
