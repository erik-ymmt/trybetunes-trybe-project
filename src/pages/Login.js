import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const { isBtnDisabled, handleClick, handleChange, loginName, isLoading } = this.props;
    return isLoading
      ? <Loading />
      : (
        <div data-testid="page-login">
          <h2>Login</h2>
          <form>
            <label htmlFor="login">
              <input
                type="text"
                name="login"
                id="login"
                data-testid="login-name-input"
                onChange={ handleChange }
                value={ loginName }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isBtnDisabled }
              onClick={ handleClick }
            >
              Entrar
            </button>
          </form>

        </div>
      );
  }
}

Login.propTypes = {
  isBtnDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  loginName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
