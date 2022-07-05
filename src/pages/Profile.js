import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      nameLogged: 'nenhum usuário',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount = async () => {
    const response = await getUser();
    this.setState({
      nameLogged: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, nameLogged, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <h2>Profile</h2>
              <h3>{ nameLogged }</h3>
              <img data-testid="profile-image" src={ image } alt={ nameLogged } />
              <h4>
                email:
                {' '}
              </h4>
              <p>
                { email }
              </p>
              <h4>
                descrição:
                {' '}
              </h4>
              <p>
                { description }
              </p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>)}
      </div>
    );
  }
}

export default Profile;
