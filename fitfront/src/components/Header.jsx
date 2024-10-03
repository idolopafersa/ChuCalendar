import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../services/ApiLogin';

export function Header() {
  // Get username from localStorage
  const username = localStorage.getItem('username') || 'PLEASE SIGN IN';
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate('/login');
    try {
      await Logout();
     
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand>ChuCalendar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
