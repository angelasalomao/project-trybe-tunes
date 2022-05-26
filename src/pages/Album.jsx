import React from 'react';
import Proptypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      nameArtist: '',
      nameAlbum: '',
      loading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    await getMusics(id).then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        musics: response,
        nameArtist: response[0].artistName,
        nameAlbum: response[0].collectionName,
      }));
    });

    await getFavoriteSongs().then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        favorites: response,
      }));
    });
  }

  isMusicFavorite = (music) => {
    const { favorites } = this.state;

    return favorites.some((favorite) => favorite.trackName === music.trackName);
  }

  render() {
    const { musics, nameArtist, nameAlbum, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ nameArtist }</h2>
        <p data-testid="album-name">{ nameAlbum }</p>
        { musics.filter((music) => music.kind === 'song')
          .map((music, index) => (<MusicCard
            key={ index }
            music={ music }
            isFavorite={ this.isMusicFavorite(music) }
          />)) }
        { loading && <Loading /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: Proptypes.shape(
    { params: Proptypes.shape({ id: Proptypes.string.isRequired }) },
  ).isRequired,
};

export default Album;
