import {FaArrowLeft} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'

import './index.css'

const BackBtn = props => {
  const {history} = props
  const onClickBtn = () => {
    history.push('/')
  }

  return (
    <button type="button" className="back-btn" onClick={onClickBtn}>
      <FaArrowLeft /> Back
    </button>
  )
}

export default withRouter(BackBtn)
