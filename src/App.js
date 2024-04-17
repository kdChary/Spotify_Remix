import {Redirect, Switch, Route} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginPage'
import SafeRoute from './components/ProtectedRoute'
import Home from './components/HomePage'
import NotFound from './components/NotFound'
import CategoryPlaylist from './components/GenreAndMoods'
import PlaylistDetails from './components/PlaylistDetails'
import Album from './components/AlbumDetails'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <SafeRoute exact path="/" component={Home} />
    <SafeRoute
      exact
      path="/category/:id/:playlists"
      component={CategoryPlaylist}
    />
    <SafeRoute exact path="/playlist/:id" component={PlaylistDetails} />
    <SafeRoute exact path="/album/:id" component={Album} />
    <SafeRoute exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
