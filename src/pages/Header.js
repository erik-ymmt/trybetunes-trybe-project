import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      nameLogged: 'nenhum usuário',
    };
  }

  fetchUser = async () => {
    const response = await getUser();
    this.setState({ nameLogged: response.name, isLoading: false });
    // leaking function
  }

  render() {
    const { isLoading, nameLogged } = this.state;
    this.fetchUser();
    return (
      <header data-testid="header-component">
        <h2>TrybeTunes</h2>
        {isLoading ? <p>Carregando...</p> : <p>{ nameLogged }</p>}
      </header>
    );
  }
}

export default Header;
