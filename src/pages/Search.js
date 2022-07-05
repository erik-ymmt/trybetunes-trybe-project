import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isBtnDisabled: true,
      isSearchLoading: false,
      isSearchDone: false,
      searchInputHistory: '',
      albums: [],
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.searchValidation);
  };

  searchValidation = () => {
    const { searchInput } = this.state;
    const minSearchLength = 2;
    if (searchInput.length >= minSearchLength) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  };

  handleSearch = () => {
    const { searchInput } = this.state;
    this.setState({ searchInputHistory: searchInput });
    this.setState({ searchInput: '' }, this.fetchAlbums);
  }

  fetchAlbums = async () => {
    const { searchInputHistory } = this.state;
    this.setState({ isSearchLoading: true });
    const responseAlbums = await searchAlbumsAPI(searchInputHistory);
    this.setState({ isSearchLoading: false, isSearchDone: true, albums: responseAlbums });
  }

  showFoundAlbums = () => {
    const { albums } = this.state;
    if (albums.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    return albums.map((album) => (
      <Link
        to={ `album/${album.collectionId}` }
        key={ album.collectionId }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        { album.collectionName }
      </Link>
    ));
  }

  render() {
    const {
      searchInput, isBtnDisabled, isSearchLoading,
      searchInputHistory, isSearchDone } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        { isSearchLoading ? <p>Carregando...</p>
          : (
            <form>
              <label htmlFor="search-input">
                <input
                  type="text"
                  name="searchInput"
                  id="search-input"
                  data-testid="search-artist-input"
                  onChange={ this.handleInput }
                  value={ searchInput }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isBtnDisabled }
                onClick={ this.handleSearch }
              >
                Procurar
              </button>
            </form>)}
        { isSearchDone ? (
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              { searchInputHistory }
            </h2>
            {this.showFoundAlbums()}
          </div>
        )
          : <p>Procure por artistas e músicas!</p>}
      </div>
    );
  }
}

export default Search;
