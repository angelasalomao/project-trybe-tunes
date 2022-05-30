import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import logo from '../images/Group_11.png';
import './Profile.css';
import LinksFooter from '../components/LinksFooter';
import {CgProfile} from 'react-icons/cg';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.userProfile();
  }

  userProfile = async () => {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    await getUser().then((response) => this.setState({
      loading: false,
      name: response.name,
      email: response.email,
      description: response.description,
      image: response.image,
    }));
  }

  render() {
    const { name, email, description, loading } = this.state;
    return (
      <div data-testid="page-profile">
       <div className="div-logo">
          <img src={ logo } alt="logo-trybe-tunes" className="logo-page-search" />
        </div>
        <h1>My profile</h1>
        <div className="profile-page">
          <div className="foto-container">
            <CgProfile size={100}/>
        </div>
        <p className="info-profile"><b>Name: </b>
          { name }
          </p>
          <p className="info-profile"><b>Email: </b>
            { email }
          </p>
          <p className="info-profile"><b>Description: </b>
          { description }
          </p>
        <Link to="/profile/edit">
          <button type="button" className="btn-edit-profile">
          Edit profile
          </button>
        </Link>
        { loading && <Loading /> }
        <LinksFooter />
        </div>
      </div>
    );
  }
}

export default Profile;
