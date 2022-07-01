import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { isBtnDisabled, handleClick } = this.props;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <label htmlFor="login">
          <input type="text" id="login" data-testid="login-name-input" />
        </label>
        <button
          type="button"
          testid="login-submit-button"
          disabled={ isBtnDisabled }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  isBtnDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Login;
