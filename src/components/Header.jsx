import React from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../images/Group_11.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({
        name: userName.name,
        loading: false,
      });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <section>
        <header
          data-testid="header-component"
        >
          <img src={ logo } alt="logo-trybe-tunes" className="logo" />
          <div className="header-menu">
            <h3 data-testid="header-user-name">
              { loading ? <Loading /> : name }
            </h3>
          </div>
        </header>
      </section>
    );
  }
}

export default Header;
