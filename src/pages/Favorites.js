import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetchFavoriteDone: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchLocalFavoriteSongs();
  }

  componentDidUpdate() {
    // this.fetchLocalFavoriteSongs();
    console.log('update');
  }

  fetchLocalFavoriteSongs = async () => {
    this.setState({ isFetchFavoriteDone: false });
    const favoriteSongsResponse = await getFavoriteSongs();
    this.setState({ favoriteSongs: favoriteSongsResponse, isFetchFavoriteDone: true });
  }

  renderFavorites = () => {
    const { favoriteSongs } = this.state;
    return (favoriteSongs && favoriteSongs.lenght) > 0
      ? <h3>Nenhum Favorito</h3>
      : (
        <div>
          {favoriteSongs.map((track) => (
            <MusicCard
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              trackImg={ track.trackImg }
              key={ track.trackId }
              favoriteSongsList={ favoriteSongs }
              refreshFavoriteTracks={ this.fetchLocalFavoriteSongs }
            />
          ))}
        </div>);
  }

  render() {
    const { isFetchFavoriteDone } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="favorites-container">
          {isFetchFavoriteDone
            ? this.renderFavorites()
            : <Loading />}
        </section>
      </div>
    );
  }
}

export default Favorites;
