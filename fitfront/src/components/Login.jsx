import { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import './login.css';
import { LoginUser, RegisterUser } from '../services/ApiLogin'; // Make sure to import your services
import logo from '../assets/icono.png'; // Import the logo image

export function Login() {
  // Variables of the component
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Handle error messages

  // Function that handles login or registration based on the state of showRegister
  const handleSubmit = async () => {
    try {
      if (showRegister) {
        // If in registration mode
        await RegisterUser(user, email, password);
        alert('Registration successful!');
      } else {
        // If in login mode
        await LoginUser(user, password);
        alert('Login successful!');
        localStorage.setItem('logged', 'true'); // Save session state
      }
    } catch (error) {
      setErrorMessage(error.message); // Handle errors
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form" fluid>
      <MDBRow>
        <MDBCol md='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src={logo} // Use the imported logo
                style={{ width: '185px' }} alt="logo" // Set the width of the logo
              />
              <h4 className="mt-1 mb-5 pb-1">Welcome to ChuCalendar</h4>
            </div>

            <p>Please {showRegister ? 'register' : 'login'} to your account</p>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <MDBInput
              wrapperClass='mb-4'
              label='User'
              id='form1'
              type='text'
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            
            {showRegister && (
              <MDBInput
                wrapperClass='mb-4'
                label='Email'
                id='formEmail'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='form2'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={handleSubmit} // Call the handleSubmit function
              >
                {showRegister ? 'Register' : 'Sign In'}
              </MDBBtn>
              <a className="text-muted" href="#!" onClick={() => setShowRegister(!showRegister)}>
                {!showRegister ? 'Forgot password?' : ''}
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">{showRegister ? 'Do you have an account?' : 'New here?'}</p>
              <MDBBtn outline className='mx-2' color='danger' onClick={() => setShowRegister(!showRegister)}>
                {showRegister ? 'Sign In' : 'Sign Up'}
              </MDBBtn>
            </div>
          </div>
        </MDBCol>

        <MDBCol md='6' className="mb-5 d-none d-md-flex align-items-center gradient-custom-2">
          <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <h4 className="mb-4">What we offer</h4>
            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </MDBCol>

      </MDBRow>
    </MDBContainer>
  );
}
