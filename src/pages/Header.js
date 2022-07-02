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

  componentDidMount = async () => {
    const response = await getUser();
    this.setState({ nameLogged: response.name, isLoading: false });
  }

  render() {
    const { isLoading, nameLogged } = this.state;
    return (
      <header data-testid="header-component">
        <h2>TrybeTunes</h2>
        {isLoading
          ? <p>Carregando...</p> : <p data-testid="header-user-name">{ nameLogged }</p>}
      </header>
    );
  }
}

export default Header;
