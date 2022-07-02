import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isBtnDisabled: true,
      isSearchLoading: false,
      isSearchDone: true,
      searchInputHistory: '',
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
    this.setState({ searchInput: '' });
    // chamar um state resultado da fetchAlbums();
  }

  fetchAlbums = async () => {
    const { searchInput } = this.state;
    this.setState({ isSearchLoading: true });
    await searchAlbumsAPI(searchInput);
  }

  render() {
    const {
      searchInput, isBtnDisabled, isSearchLoading, searchInputHistory, isSearchDone,
    } = this.state;
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
          <h2>
            Resultado de álbuns de:
            {' '}
            { searchInputHistory }
          </h2>)
          : <p>Else</p>}
      </div>
    );
  }
}

export default Search;
