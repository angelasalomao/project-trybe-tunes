import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AlbumArtist.css';
import LinksFooter from './LinksFooter';

class AlbumArtist extends React.Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <section className="album">
        <div className="album-info">
          <div className="album-info-item">
            <p>
              <b>Name:</b>
              {' '}
              {artistName}
            </p>
          </div>
          <div className="album-info-item">
            <p>
              <b>Album:</b>
              {' '}
              {collectionName}
            </p>
          </div>
          <div className="album-info-item">
            <p>
              <b>Date:</b>
              {' '}
              {releaseDate}
              </p>
          </div>
          <div className="album-info-item">
            <p>
              <b>Tracks:</b>
              {' '}
              {trackCount}
              </p>
          </div>
          <div className="album-info-item">
            <p>
              <b>Price:</b>
              {' '}
              {collectionPrice}
              </p>
          </div>
          <div className="album-info-item">
            <p>
              <b>Artist ID:</b>
              {' '}
              {artistId}
              </p>
          </div>
        </div>
        <div className="album-image-container">
          <img src={ artworkUrl100 } alt={ artistName } className="img-album" />
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
            className="album-link"
          >
            <button className="btn-link-album">Listen album</button>
          </Link>
        </div>
        <LinksFooter />
      </section>
    );
  }
}

AlbumArtist.propTypes = {
  artistName: Proptypes.string.isRequired,
  artistId: Proptypes.number.isRequired,
  collectionId: Proptypes.number.isRequired,
  collectionName: Proptypes.string.isRequired,
  collectionPrice: Proptypes.number.isRequired,
  artworkUrl100: Proptypes.string.isRequired,
  releaseDate: Proptypes.string.isRequired,
  trackCount: Proptypes.string.isRequired,
};

export default AlbumArtist;
