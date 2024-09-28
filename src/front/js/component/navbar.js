import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { PersonCircle, List } from 'react-bootstrap-icons';

// Note: If you have the logo, uncomment the following line and update the path
// import koyoLogo from '../../img/koyologo.jpg';

export const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("You have been successfully logged out");
    navigate("/");
  }

  const isLoggedIn = !!sessionStorage.getItem("token");

  return (
    <Navbar bg="white" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* If you have the logo, uncomment the following block and comment out the text "Koyo" */}
          {/* <img
            src={koyoLogo}
            height="40"
            className="d-inline-block align-top"
            alt="Koyo Logo"
            style={{ objectFit: 'contain' }}
          /> */}
          Koyo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/net-worth" className="fw-bold me-4" style={{ color: '#222222' }}>Net Worth</Nav.Link>
            <Nav.Link as={Link} to="/savings-goal" className="text-dark me-4">Savings Goal</Nav.Link>
            <Nav.Link as={Link} to="/budget-tracker" className="text-dark">Budget Tracker</Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle as="div" id="dropdown-basic" className="d-flex align-items-center justify-content-between rounded-pill px-3 py-2" style={{width: '85px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white'}}>
              <List size={20} className="text-white" />
              <PersonCircle size={20} className="text-white" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              {isLoggedIn ? (
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              ) : (
                <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
