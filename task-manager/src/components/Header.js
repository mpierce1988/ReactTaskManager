import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

export function Header() {
    const navigate = useNavigate();
    const { userId, setUserId } = useUser();

    const handleLogout = () => {
        setUserId(null);
        navigate('/login');
    }

    return (
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {userId === null ? (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/tasks">
                    <Nav.Link>Tasks</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Nav.Link>About</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
}