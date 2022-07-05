import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import './Login.css';
import TunesLogo from '../images/trybe-tunes-logo.png';

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
    const { history } = this.props;
    const { loginName } = this.state;
    const createUserArgument = { name: loginName };
    this.setState({ isLoading: true });
    await createUser(createUserArgument);
    // this.setState({ loggedIn: true }); << isso cria um warning de leaking data.
    history.push('/search');
  }

  render() {
    const { isBtnDisabled, isLoading, loggedIn, loginName } = this.state;
    if (loggedIn) return <Redirect to="/search" />;
    if (isLoading) return <Loading />;
    return (
      <div className="login-container" data-testid="page-login">
        <img src={ TunesLogo } alt="trybe tunes logo" />
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
              placeholder="Nome do usuário"
              className="login-input"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isBtnDisabled }
            onClick={ this.handleLogin }
            className="main-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
      state: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

export default Login;
