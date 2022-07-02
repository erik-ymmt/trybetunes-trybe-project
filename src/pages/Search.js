import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isBtnDisabled: true,
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

  render() {
    const { searchInput, isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
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
            onClick={ this.handleLogin }
          >
            Procurar
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
