import './index.css'

const Loading = () => (
  <div className="loader-view" data-testid="loader">
    <img
      src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712240724/1Spotify/Login/remix-logo-sm.png"
      alt="website app logo"
      className="website-logo-loading"
    />
    <h1 className="loading-text">Loading...</h1>
  </div>
)

export default Loading
