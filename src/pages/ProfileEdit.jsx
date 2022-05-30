import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import LinksFooter from '../components/LinksFooter';
import logo from '../images/Group_11.png';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      buttonDisabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const { name, email, image, description } = await getUser();
    this.setState((prevState) => ({
      ...prevState,
      loading: false,
      name,
      email,
      description,
      image,
    }), this.enableButton);
  }

  clickSubmit = async (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const { name, email, description, image } = this.state;
    this.setState({ loading: false, redirect: true }, async () => {
      await updateUser({
        name,
        email,
        description,
        image,
      });
    });
  }

  handleChangeInfo = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.enableButton);
  }

  enableButton = () => {
    const { name, email, description, image } = this.state;
    if (name.length > 0 && email.length > 0 && description.length > 0
      && image.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      buttonDisabled,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-profile-edit" className="edit-profile-page">
        <div className="div-logo">
          <img src={ logo } alt="logo-trybe-tunes" className="logo-page-search" />
        </div>
        <h1>Edit profile</h1>
        <form className="edit-container">
          <label htmlFor="edit-input-name">
            <b>Name:</b>
            <input
              type="text"
              id="edit-input-name"
              data-testid="edit-input-name"
              onChange={ this.handleChangeInfo }
              value={ name }
              name="name"
              placeholder="name"
              className="input-edit-profile"
            />
          </label>
          <label htmlFor="edit-input-email">
            <b>Email:</b>
            <input
              type="email"
              id="edit-input-email"
              data-testid="edit-input-email"
              onChange={ this.handleChangeInfo }
              value={ email }
              name="email"
              placeholder="email"
              className="input-edit-profile"
            />
          </label>
          <label htmlFor="edit-input-description" className="description-container">
            <b>Description:</b>
            <textarea
              type="text"
              id="edit-input-description"
              data-testid="edit-input-description"
              onChange={ this.handleChangeInfo }
              value={ description }
              name="description"
              placeholder="about me"
              className="input-edit-description"
            />
          </label>
          <label htmlFor="edit-input-image">
            <b>Profile picture:</b>
            <input
              type="text"
              id="edit-input-image"
              data-testid="edit-input-image"
              onChange={ this.handleChangeInfo }
              value={ image }
              name="image"
              placeholder="image url"
              className="input-edit-profile"
            />
          </label>
          <Link to="/profile">
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.clickSubmit }
              className="btn-save"
            >
              Save
            </button>
          </Link>
        </form>
        { loading && <Loading /> }
        { redirect && <Redirect to="/profile" /> }
        <div className="footer-links">
        <LinksFooter />
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
