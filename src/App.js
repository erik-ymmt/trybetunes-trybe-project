import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      login: '',
      isLoading: false,
      loggedIn: false,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidation);
  };

  loginValidation = () => {
    const { login } = this.state;
    const minLoginLength = 3;
    if (login.length >= minLoginLength) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleLogin = async () => {
    const { login } = this.state;
    const createUserArgument = { name: login };
    this.setState({ isLoading: true });
    await createUser(createUserArgument);
    this.setState({ loggedIn: true });
  }

  render() {
    const { isBtnDisabled, login, isLoading, loggedIn } = this.state;
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
                handleClick={ this.handleLogin }
                handleChange={ this.handleInput }
                loginName={ login }
                isLoading={ isLoading }
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
