import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { PersonCircle, List } from 'react-bootstrap-icons';

import koyoLogo from '../../img/koyologo.jpg';

export const NavbarComponent = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    alert("You have been successfully logged out");
    navigate("/");
    setShowDropdown(false);
  }

  const isLoggedIn = !!sessionStorage.getItem("token");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownStyle = {
    position: 'absolute',
    end: 0,
    marginTop: '8px',
    backgroundColor: 'white',
    border: '1px solid #ced4da',
    borderRadius: '0.25rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    minWidth: '120px',
    zIndex: 1000,
    overflow: 'hidden',
  };

  const dropdownItemStyle = {
    padding: '10px 15px',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    color: '#212529',
    textDecoration: 'none',
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={koyoLogo}
            height="40"
            className="d-inline-block align-top"
            alt="Koyo Logo"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="fw-bold me-4" style={{ color: '#222222' }}>Net Worth</Nav.Link>
            <Nav.Link as={Link} to="/savings-goal" className="text-dark me-4">Savings Goal</Nav.Link>
            <Nav.Link as={Link} to="/budget-tracker" className="text-dark">Budget Tracker</Nav.Link>
          </Nav>

          <div className="position-relative" ref={dropdownRef}>
            <button 
              className="d-flex align-items-center justify-content-between border rounded-pill px-3 py-2"
              style={{width: '85px', cursor: 'pointer', background: 'none', border: '1px solid #ced4da'}}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <List size={20} className="text-dark" />
              <PersonCircle size={20} className="text-dark" />
            </button>
            {showDropdown && (
              <div style={dropdownStyle}>
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/profile" 
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                )}
              </div>

//           <div className="d-flex align-items-center">
//             <div className="d-flex align-items-center justify-content-between border rounded-pill px-3 py-2 me-3 shadow-sm" style={{width: '85px'}}>
//               <List size={20} className="text-dark" />
//               <PersonCircle size={25} className="text-dark" />
//             </div>
//             {isLoggedIn ? (
//               <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//             ) : (
//               <Link to="/login">
//                 <button className="btn btn-primary">Login</button>
//               </Link>

            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;