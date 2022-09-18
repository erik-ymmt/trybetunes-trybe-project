import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      nameLogged: 'nenhum usuário',
      email: '',
      description: '',
      image: '',
      isBtnDisabled: true,
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

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  validateInputs = () => {
    const { nameLogged, email, description, image } = this.state;
    if (
      nameLogged.length > 0
      && email.length > 0
      && description.length > 0
      && image.length > 0) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  saveUserChanges = async () => {
    const { history } = this.props;
    const { nameLogged, email, description, image } = this.state;
    const updatedUser = {
      name: nameLogged,
      email,
      image,
      description,
    };
    await updateUser(updatedUser);
    history.push('/profile');
  }

  render() {
    const { isLoading, nameLogged, email,
      description, image, isBtnDisabled } = this.state;
    return (
      <div>
        <Header />
        {isLoading ? <Loading />
          : (
            <div data-testid="page-profile-edit" className="profile-edit-container">
              <h3>Editar perfil</h3>
              <form>

                <label htmlFor="name">
                  Nome
                </label>
                <input
                  name="nameLogged"
                  type="text"
                  data-testid="edit-input-name"
                  value={ nameLogged }
                  onChange={ this.handleInput }
                />

                <label htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleInput }
                />

                <label htmlFor="description">
                  Descrição
                </label>
                <input
                  name="description"
                  type="text"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleInput }
                />

                <label htmlFor="image">
                  URL Imagem Perfil
                </label>
                <input
                  name="image"
                  type="text"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleInput }
                />

                <button
                  disabled={ isBtnDisabled }
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.saveUserChanges }
                >
                  Salvar
                </button>

              </form>
            </div>)}
      </div>

    );
  }
}

ProfileEdit.propTypes = {
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

export default ProfileEdit;
