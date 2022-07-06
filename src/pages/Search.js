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

  shortenName = (name) => name.replace(',', '').split(' ').slice(0, 6).join(' ');

  showFoundAlbums = () => {
    const { albums } = this.state; console.log(albums);
    if (albums.length === 0) return <p>Nenhum álbum foi encontrado</p>;
    return albums.map((album) => (
      <Link
        to={ `album/${album.collectionId}` }
        key={ album.collectionId }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        <div className="album-card">
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <div>
            <h3>{ this.shortenName(album.collectionName) }</h3>
            <span>{ this.shortenName(album.artistName) }</span>
          </div>

        </div>
      </Link>
    ));
  }

  render() {
    const {
      searchInput, isBtnDisabled, isSearchLoading,
      searchInputHistory, isSearchDone } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="search-container">
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
                    placeholder="Nome do Artista"
                    className="search-input"
                  />
                </label>
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ isBtnDisabled }
                  onClick={ this.handleSearch }
                  className="main-btn"
                >
                  Procurar
                </button>
              </form>)}
          { isSearchDone ? (
            <div className="results-container">
              <h2>
                Resultado para álbuns de:
                {' '}
                <em>{ searchInputHistory }</em>
              </h2>
              <div className="album-container">
                {this.showFoundAlbums()}
              </div>
            </div>
          )
            : <p>Procure por artistas e músicas!</p>}
        </div>
      </>
    );
  }
}

export default Search;
