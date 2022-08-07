import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';
import ProfilePlaceHolder from '../images/profile-placeholder.png';

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

  handleError = () => {
    const profileImg = document.getElementById('profile-image');
    profileImg.src = ProfilePlaceHolder;
  }

  render() {
    const { isLoading, nameLogged, email, description, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-container">
          {isLoading ? <Loading />
            : (
              <div className="profile-card">
                <img
                  data-testid="profile-image"
                  src={ image || ProfilePlaceHolder }
                  alt={ nameLogged }
                  id="profile-image"
                  onError={ this.handleError }
                />
                <div>
                  <h3>{ nameLogged || 'Nome' }</h3>
                  <h4>
                    email:
                    {' '}
                  </h4>
                  <p>
                    { email || 'sem email' }
                  </p>
                  <h4>
                    descrição:
                    {' '}
                  </h4>
                  <p>
                    { description || 'sem descrição' }
                  </p>
                </div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Profile;
