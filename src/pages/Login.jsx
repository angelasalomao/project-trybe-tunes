import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import logo from '../images/Group_11.png';
import statusBar from '../images/dark.png';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      buttonDisabled: true,
      loginOk: false,
    };
  }

   inputName = (event) => {
     const minLengthName = 3;
     const { value } = event.target;
     const isButtonEnabled = value.length >= minLengthName;

     this.setState((prevState) => ({
       ...prevState,
       name: value,
       buttonDisabled: !isButtonEnabled,
     }));
   }

   enableButton = async (event) => {
     const { name } = this.state;
     event.preventDefault();
     this.setState({
       loading: true,
     });
     await createUser({ name }).then(() => this.setState(
       (prevState) => ({ ...prevState, loginOk: true }),
     ));
   }

   render() {
     const { loading, buttonDisabled, loginOk } = this.state;

     return (
       <>
         <img src={ statusBar } alt="Status-Bar" className="status-bar" />
         <div>
           <img src="https://images.wallpaperscraft.com/image/single/headphones_bw_headset_120277_240x320.jpg" alt="logo-music" className="headphone" />
         </div>
         <div data-testid="page-login" className="login-page">
           <img src={ logo } alt="logo-trybe-tunes" className="logo" />
           {loading
             ? <Loading />
             : (
               <form className="form-login">
                 <h3 className="title-songs1">Millions of Songs.</h3>
                 <h3 className="title-songs2">Free on Trybe Tunes.</h3>
                 <label htmlFor="login-name-input">
                   <input
                     type="text"
                     data-testid="login-name-input"
                     onChange={ (event) => this.inputName(event) }
                     placeholder="Name"
                     className="input-name"
                   />
                 </label>
                 <button
                   type="submit"
                   data-testid="login-submit-button"
                   onClick={ (event) => this.enableButton(event) }
                   disabled={ buttonDisabled }
                   className="btn-login"
                 >
                   Log in
                 </button>
               </form>
             )}
           {loginOk && <Redirect to="/search" />}
         </div>
       </>
     );
   }
}

export default Login;
