import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorite: false,
    };
  }

  createFavoriteMusic = () => {
    const { trackName, previewUrl, trackId, trackImg } = this.props;
    return {
      trackName, previewUrl, trackId, trackImg,
    };
  }

  saveFavorite = async ({ target }) => {
    this.setState({ isLoading: true });
    const favoriteMusic = this.createFavoriteMusic();
    if (target.checked) await addSong(favoriteMusic);
    this.setState({ isLoading: false, favorite: true });
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
          ? <p>Carregando...</p>
          : (
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor={ trackId }
            >
              {' '}
              <input
                type="checkbox"
                id={ trackId }
                onChange={ this.saveFavorite }
                checked={ favorite }
              />
              Favoritar Música
            </label>)}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackImg: PropTypes.string.isRequired,
};

export default MusicCard;
