import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.satate = {
  //     isLogged: false;
  //   }
  // }

  // logUserIn() {
  //   this.setState({ isLogged: true });
  // }

  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
              />
            ) }
          />
          {/* <Route exact path="/">
            <Login />
          </Route> */}
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
