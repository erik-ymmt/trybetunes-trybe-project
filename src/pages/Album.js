import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      tracksList: '',
      isFetchMusicDone: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musicResponse = await getMusics(id);
    this.setState({
      artistName: musicResponse[0].artistName,
      albumName: musicResponse[0].collectionName,
      tracksList: musicResponse.slice(1),
      isFetchMusicDone: true,
    });
  }

  render() {
    const { artistName, albumName, tracksList, isFetchMusicDone } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">
          Artista:
          {' '}
          { artistName }
        </div>
        <div data-testid="album-name">
          Album:
          {' '}
          { albumName }
        </div>
        {isFetchMusicDone
          ? (
            <div>
              {tracksList.map((track) => (
                <MusicCard
                  trackName={ track.trackName }
                  previewUrl={ track.previewUrl }
                  trackId={ track.trackId }
                  trackImg={ track.artworkUrl100 }
                  key={ track.trackId }
                />
              ))}
            </div>)
          : <p>Carregando...</p>}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
