import React from 'react';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import logo from '../images/Group_11.png'
import './Favorites.css'
import LinksFooter from '../components/LinksFooter';

const favoriteTrue = true;

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoritesList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getFavoritesList();
  }

  getFavoritesList = async () => {
    this.setState({
      loading: true,
    });
    const favoriteMusicsList = await getFavoriteSongs();
    this.setState((prevState) => ({
      ...prevState,
      loading: false,
      favoritesList: favoriteMusicsList,
    }));
  }

  onUpdateFavorites = () => {
    this.getFavoritesList();
  }

  render() {
    const { favoritesList, loading } = this.state;
    return (
      <div data-testid="page-favorites" className="favorite-page">
        <div className="div-logo">
          <img src={ logo } alt="logo-trybe-tunes" className="logo-page-search" />
        </div>
        <section>
          <h1>Favorite Songs</h1>
          { favoritesList.length > 0 ? favoritesList.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              isFavorite={ favoriteTrue }
              callback={ this.onUpdateFavorites }
            />
          ))
            : (<h3>The list is empty.</h3>) }
        </section>
        { loading && <Loading /> }
        <LinksFooter />
      </div>
    );
  }
}

export default Favorites;
