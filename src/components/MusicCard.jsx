import React from 'react';
import Proptypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { isFavorite } = this.props;
    this.setState({
      loading: false,
      checked: isFavorite,
    });
  }

  componentDidUpdate(prevProps) {
    const { isFavorite } = this.props;
    if (prevProps.isFavorite !== isFavorite) {
      this.setState({
        loading: false,
        checked: isFavorite,
      });
    }
  }

  addFavorite = async () => {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
      checked: true,
    }));
    const { music } = this.props;

    await addSong(music).then(() => this.setState((prevState) => ({
      ...prevState,
      loading: false,
    })));
  }

  removeFavorite = async () => {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
      checked: false,
    }));

    const { music } = this.props;
    await removeSong(music).then(() => this.setState((estadoAnterior) => ({
      ...estadoAnterior,
      loading: false,
    })));
  }

  onChange = ({ target }) => {
    const { callback } = this.props;
    if (target.checked) {
      this.addFavorite();
    } else {
      this.removeFavorite();
    }
    if (callback !== undefined && typeof callback === 'function') {
      callback();
    }
  }

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        <p>{ music.trackName }</p>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="input-checkbox">
          Favorita
          <input
            type="checkbox"
            id="input-checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.onChange }
            checked={ checked }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: Proptypes.string.isRequired,
  isFavorite: Proptypes.bool.isRequired,
  callback: Proptypes.func.isRequired,
};

export default MusicCard;
