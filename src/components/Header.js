import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import TunesLogo from '../images/trybe-tunes-logo-cropped.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      nameLogged: 'nenhum usuário',
    };
  }

  componentDidMount = async () => {
    const response = await getUser();
    this.setState({ nameLogged: response.name, isLoading: false });
  }

  render() {
    const { isLoading, nameLogged } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          <img src={ TunesLogo } alt="trybe tunes logo" />
          {isLoading
            ? <p>Carregando...</p>
            : (
              <div
                className="username"
                data-testid="header-user-name"
              >
                { nameLogged }

              </div>)}
        </div>
        <nav>
          <NavLink
            to="/search"
            activeClassName="selected"
            data-testid="link-to-search"
          >
            Pesquisar

          </NavLink>
          <NavLink
            to="/favorites"
            activeClassName="selected"
            data-testid="link-to-favorites"
          >
            Favoritas

          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="selected"
            data-testid="link-to-profile"
          >
            Perfil

          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
