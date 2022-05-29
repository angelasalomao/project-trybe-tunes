import React from 'react';
import Proptypes from 'prop-types';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './Album.css';
import logo from '../images/Group_11.png'
import LinksFooter from '../components/LinksFooter';

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
      <div>
      <div className="div-logo">
        <img src={logo} alt="logo-trybe-tunes" className="logo-page-search" />
      </div>
      <div data-testid="page-album" className="album-page">
          <p data-testid="artist-name" className="name-artist-title">
            <b>Artist name:</b>
            {' '}
            {nameArtist}</p>
          <p data-testid="album-name" className="name-album-title">
            <b>Album name:</b>
            {' '}
            {nameAlbum}
          </p>
          </div>
          <div className="card-music-container">
          {musics.filter((music) => music.kind === 'song')
            .map((music, index) => (<MusicCard
              key={index}
              music={music}
              isFavorite={this.isMusicFavorite(music)} />))}
          {loading && <Loading />}
          </div>
        <LinksFooter />
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
