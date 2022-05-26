import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

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
      <div data-testid="page-favorites">
        <Header />
        <section>
          { favoritesList.length > 0 ? favoritesList.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              isFavorite={ favoriteTrue }
              callback={ this.onUpdateFavorites }
            />
          ))
            : (<h3>A lista está vazia.</h3>) }
        </section>
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Favorites;
