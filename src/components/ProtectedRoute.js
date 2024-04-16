import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const SafeRoute = props => {
  const access = Cookies.get('jwt_token')

  if (access === undefined || access === null) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default SafeRoute
