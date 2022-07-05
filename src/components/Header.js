import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
        <h2>TrybeTunes</h2>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        {isLoading
          ? <p>Carregando...</p> : <p data-testid="header-user-name">{ nameLogged }</p>}
      </header>
    );
  }
}

export default Header;
