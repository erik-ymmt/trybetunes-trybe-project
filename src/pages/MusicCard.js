import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.loadFavorite();
  }

  createFavoriteMusic = () => {
    const { trackName, previewUrl, trackId, trackImg } = this.props;
    return {
      trackName, previewUrl, trackId, trackImg,
    };
  }

  loadFavorite = () => {
    const { favoriteSongsList, trackId } = this.props;
    const isFavorite = favoriteSongsList.some((song) => song.trackId === trackId);
    this.setState({ isLoading: false, favorite: isFavorite });
  }

  handleFavorite = async ({ target }) => {
    const { refreshFavoriteTracks } = this.props;
    this.setState({ isLoading: true });
    const favoriteMusic = this.createFavoriteMusic();
    if (target.checked) {
      await addSong(favoriteMusic);
      await refreshFavoriteTracks();
      this.setState({ isLoading: false, favorite: true });
    } else {
      await removeSong(favoriteMusic);
      this.setState({ isLoading: false, favorite: false });
      await refreshFavoriteTracks();
    }
  }

  render() {
    const { trackName, previewUrl, trackId, trackImg } = this.props;
    const { isLoading, favorite } = this.state;
    return (
      <div>
        <img src={ trackImg } alt={ trackName } />
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {isLoading
          ? <Loading />
          : (
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ trackId }
            >
              {' '}
              <input
                type="checkbox"
                id={ trackId }
                onChange={ this.handleFavorite }
                checked={ favorite }
              />
              Favorita
            </label>)}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackImg: PropTypes.string.isRequired,
  refreshFavoriteTracks: PropTypes.func.isRequired,
  favoriteSongsList: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.string,
    trackImg: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
