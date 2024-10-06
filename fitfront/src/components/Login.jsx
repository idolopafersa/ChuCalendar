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
import { useNavigate } from 'react-router-dom';

export function Login() {
  // Variables of the component
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Handle error messages
  const navigate = useNavigate();

  // Function that handles login or registration based on the state of showRegister
  const handleSubmit = async () => {
    try {
      if (showRegister) {
        // If in registration mode
        await RegisterUser(user, email, password);
        localStorage.setItem('logged', 'true');
        navigate("/home");
      } else {
        // If in login mode
        await LoginUser(user, password);
        localStorage.setItem('logged', 'true'); // Save session state
        navigate("/home");
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
                style={{ width: '185px' }} 
                alt="logo" // Set the width of the logo
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
            <h4 className="mb-4">What's ChuCalendar</h4>
            <p className="small mb-0">
              <strong>ChuCalendar</strong> is your personal progress-tracking web service, designed to help you organize your fitness routines, exercises, and meals all in one place. You can easily select a day, add routines, log exercises, and track your meals to stay on top of your health and fitness goals. Whether you're focusing on a workout plan or building a balanced diet, ChuCalendar makes it simple to monitor your progress over time.
              <br /><br />
              This is <strong>Version 1</strong> of ChuCalendar, so if you encounter any issues or have suggestions for improvement, feel free to let me know on GitHub at <a href="https://github.com/idolopafersa/ChuCalendar" target="_blank" rel="noopener noreferrer">idolopafersa/ChuCalendar</a>. For more information about me and my projects, visit my personal webpage at <a href="https://fernandezpablo.es" target="_blank" rel="noopener noreferrer">fernandezpablo.es</a>.
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
