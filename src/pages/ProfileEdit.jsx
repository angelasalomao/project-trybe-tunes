import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Editar perfil</h1>
        <form>
          <label htmlFor="edit-input-name">
            Nome:
            <input
              type="text"
              id="edit-input-name"
              data-testid="edit-input-name"
              onChange={ this.handleChangeInfo }
              value={ name }
              name="name"
            />
          </label>
          <label htmlFor="edit-input-email">
            Email:
            <input
              type="email"
              id="edit-input-email"
              data-testid="edit-input-email"
              onChange={ this.handleChangeInfo }
              value={ email }
              name="email"
            />
          </label>
          <label htmlFor="edit-input-description">
            Descrição:
            <textarea
              type="text"
              id="edit-input-description"
              data-testid="edit-input-description"
              onChange={ this.handleChangeInfo }
              value={ description }
              name="description"
            />
          </label>
          <label htmlFor="edit-input-image">
            Foto de perfil:
            <input
              type="text"
              id="edit-input-image"
              data-testid="edit-input-image"
              onChange={ this.handleChangeInfo }
              value={ image }
              name="image"
            />
          </label>
          <Link to="/profile">
            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ buttonDisabled }
              onClick={ this.clickSubmit }
            >
              Salvar
            </button>
          </Link>
        </form>
        { loading && <Loading /> }
        { redirect && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
