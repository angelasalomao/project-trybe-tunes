/* eslint-disable react/jsx-max-depth */
import React from 'react';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ListAlbum from '../components/ListAlbum';
import logo from '../images/Group_11.png';
import './Search.css';
import LinksFooter from '../components/LinksFooter';
import searchIcon from '../images/Search-black.png';
import { Button } from '../components/Button/Button';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      nameArtist: '',
      buttonDisabled: true,
      loading: false,
      data: [],
      searched: false,
    };
  }

  inputNameArtist = (event) => {
    const minNameArtist = 2;
    const { value } = event.target;
    const buttonEnabled = value.length >= minNameArtist;

    this.setState((prevState) => ({
      ...prevState,
      inputValue: value,
      nameArtist: value,
      buttonDisabled: !buttonEnabled,
    }));
  }

  submitForm = async (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const { nameArtist } = this.state;
    await searchAlbumsAPI(nameArtist).then((response) => {
      this.setState((prevState) => ({
        ...prevState,
        inputValue: '',
        loading: false,
        data: response,
      }));
    });
  }

  render() {
    const { buttonDisabled, data, loading, nameArtist, inputValue } = this.state;
    return (
      <div data-testid="page-search" className="search-page">
        <div className="div-logo">
          <img src={ logo } alt="logo-trybe-tunes" className="logo-page-search" />
        </div>
        <div className="search-bar-container">
          <h1 id="title">Search</h1>
          <div>
            <form onSubmit={ this.submitForm } className="form-search">
              <div className="label-input-search">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  onChange={ (event) => this.inputNameArtist(event) }
                  value={ inputValue }
                  placeholder="Artists or songs"
                  className="input-search"
                />
                <img
                  src={ searchIcon }
                  alt="Search"
                  className="search-input-image"
                />
              </div>
              <Button
                type="submit"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
              >
                Search
              </Button>
            </form>
          </div>
        </div>
        <div className="music-container">
          { loading ? <Loading /> : <ListAlbum
            nameArtist={ nameArtist }
            data={ data }
          /> }
        </div>
        <LinksFooter />
      </div>

    );
  }
}

export default Search;
