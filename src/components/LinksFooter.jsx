import React from 'react';
import { Link } from 'react-router-dom';
import './LinksFooter.css';
import homeIcon from '../images/Home.png';
import favoriteIcon from '../images/favorite.png';
import profileIcon from '../images/profile-icon.png';

class LinksFooter extends React.Component {
  render() {
    return (
      <div className="nav-links">
        <div className="icon-home">
          <Link
            data-testid="link-to-search"
            to="/search"
            className="link-search"
          >
            <img src={ homeIcon } alt="Search" className="home-icon" />
          </Link>
          Home
        </div>
        <div className="icon-fav">
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="link-favorites"
          >
            <img src={ favoriteIcon } alt="Favorite" className="fav-icon" />
          </Link>
          Favorites
        </div>
        <div className="icon-profile">
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="link-profile"
          >
            <img src={ profileIcon } alt="Profile" className="profile-icon" />
          </Link>
          Profile
        </div>
      </div>
    );
  }
}

export default LinksFooter;
