import React from 'react';
import Proptypes from 'prop-types';
import AlbumArtist from './AlbumArtist';
import './ListAlbum.css';

class ListAlbum extends React.Component {
  render() {
    const { nameArtist, data } = this.props;
    const text = `Resultado de álbuns de: ${nameArtist}`;
    return data.length === 0 ? <span>Nenhum álbum foi encontrado</span>
      : (
        <>
          <h2 className="title-search-albuns">
            { text }
          </h2>
          {
            data.map((item) => (<AlbumArtist
              key={ item.collectionId }
              artistId={ item.artistId }
              artistName={ item.artistName }
              collectionId={ item.collectionId }
              collectionName={ item.collectionName }
              collectionPrice={ item.collectionPrice }
              artworkUrl100={ item.artworkUrl100 }
              releaseDate={ item.releaseDate }
              trackCount={ item.trackCount }
            />))
          }
        </>
      );
  }
}

ListAlbum.propTypes = {
  nameArtist: Proptypes.string.isRequired,
  data: Proptypes.arrayOf.isRequired,
};

export default ListAlbum;
