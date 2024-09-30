import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { useNavigate } from 'react-router-dom';


export function Header() {
  // Get username from localStorage
  const username = localStorage.getItem('username') || 'User'; // Default to 'User' if not found
  const navigate = useNavigate()

  
  const handleSignOut = () => {
    localStorage.setItem("logged", "false"); 
    navigate("/login");
};

  return (
    <Navbar expand="lg" className="custom-navbar"> {/* Apply the custom class */}
      <Container>
        <Navbar.Brand href="#home">ChuCalendar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleSignOut} href="#action/3.1">Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
