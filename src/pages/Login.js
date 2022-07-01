import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
      loginName: '',
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
    const { loginName } = this.state;
    const minLoginLength = 3;
    if (loginName.length >= minLoginLength) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleLogin = async () => {
    const { loginName } = this.state;
    const createUserArgument = { name: loginName };
    this.setState({ isLoading: true });
    await createUser(createUserArgument);
    this.setState({ isLoading: false });
    this.setState({ loggedIn: true });
  }

  render() {
    const { isBtnDisabled, isLoading, loggedIn, loginName } = this.state;
    if (isLoading) {
      return <Loading />;
    } if (loggedIn) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="login">
            <input
              type="text"
              name="loginName"
              id="login"
              data-testid="login-name-input"
              onChange={ this.handleInput }
              value={ loginName }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isBtnDisabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
