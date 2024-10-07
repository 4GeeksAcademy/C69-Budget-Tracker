import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
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
    <Navbar bg="white" expand="lg" className="border-bottom shadow">
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
            <Nav.Link as={Link} to="/" className="fw-bold me-4" style={{ color: '#222222' }}>Net Worth</Nav.Link>
            <Nav.Link as={Link} to="/savings-goal" className="text-dark me-4">Savings Goal</Nav.Link>
            <Nav.Link as={Link} to="/budget-tracker" className="text-dark">Budget Tracker</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between border rounded-pill px-3 py-2 me-3 shadow-sm" style={{width: '85px'}}>
              <List size={20} className="text-dark" />
              <PersonCircle size={25} className="text-dark" />
            </div>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
