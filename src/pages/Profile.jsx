import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

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
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Meu perfil</h1>
        <img
          data-testid="profile-image"
          src={ image }
          alt="Foto de perfil"
        />
        <div>
          <h4>Nome: </h4>
          <p>{ name }</p>
        </div>
        <div>
          <h4>Email: </h4>
          <p>{ email }</p>
        </div>
        <div>
          <h4>Descrição: </h4>
          <p>{ description }</p>
        </div>
        <Link to="/profile/edit">
          <button type="button">
            Editar perfil
          </button>
        </Link>
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Profile;
