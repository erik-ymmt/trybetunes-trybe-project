import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      albumCover: '',
      tracksList: '',
      isFetchMusicDone: false,
      isFetchFavoriteDone: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
    this.fetchLocalFavoriteSongs();
  }

  fetchLocalFavoriteSongs = async () => {
    this.setState({ isFetchFavoriteDone: false });
    const favoriteSongsResponse = await getFavoriteSongs();
    this.setState({ favoriteSongs: favoriteSongsResponse, isFetchFavoriteDone: true });
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musicResponse = await getMusics(id);
    this.setState({
      artistName: musicResponse[0].artistName,
      albumName: musicResponse[0].collectionName,
      albumCover: musicResponse[0].artworkUrl100,
      tracksList: musicResponse.slice(1),
      isFetchMusicDone: true,
    });
  }

  render() {
    const { artistName, albumName, albumCover, tracksList,
      isFetchMusicDone, isFetchFavoriteDone, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="main-album-container">
          <section className="album-section">
            <img src={ albumCover } alt={ albumName } />
            <div data-testid="album-name">
              <strong>{ albumName }</strong>
            </div>
            <div data-testid="artist-name">
              { artistName }
            </div>
          </section>
          {isFetchMusicDone && isFetchFavoriteDone
            ? (
              <section className="album-tracks">
                {tracksList.map((track) => (
                  <MusicCard
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    trackId={ track.trackId }
                    trackImg={ track.artworkUrl100 }
                    key={ track.trackId }
                    favoriteSongsList={ favoriteSongs }
                    refreshFavoriteTracks={ this.fetchLocalFavoriteSongs }
                  />
                ))}
              </section>)
            : <Loading /> }
        </div>
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
