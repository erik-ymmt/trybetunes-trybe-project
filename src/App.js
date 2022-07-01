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
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      login: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  loginValidation = () => {};

  handleClick = () => {}

  render() {
    const { isBtnDisabled, login } = this.state;
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
                name="login"
                isBtnDisabled={ isBtnDisabled }
                handleClick={ this.handleClick }
                onChange={ this.handleInput }
                value={ login }
                { ...props }
              />
            ) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
