import './index.css'

const Failure = props => {
  const tryAgain = () => {
    const {method} = props
    method()
  }
  return (
    <div className="failure-view" data-testid="failureView">
      <img
        src="https://res.cloudinary.com/dgga8cymk/image/upload/v1712921765/1Spotify/alert.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-btn" type="button" onClick={tryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default Failure
