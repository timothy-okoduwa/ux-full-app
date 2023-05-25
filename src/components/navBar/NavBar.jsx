import React from 'react';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import t from '../images/TEXT.png';
import { Link, useLocation } from 'react-router-dom';
const NavBar = () => {
  const location = useLocation();
  const hideAllHeader =
    location.pathname === '/signup' ||
    location.pathname === '/signin' ||
    location.pathname === '/verify' ||
    location.pathname === '/confirm' ||
    location.pathname === '/purchase-course' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/start-watching' ||
    location.pathname === '/setting' ||
    location.pathname === '/forget';
  return (
    <>
      {hideAllHeader ? null : (
        <div>
          <Navbar
            expand="lg"
            className="pt-3 pb-3 fixed-top"
            style={{ background: 'black' }}
          >
            <Container>
              <div className=" d-flex justify-content-start">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <img src={t} alt="" />
                </Link>
              </div>

              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="bg-light"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <div className="hello">
                  <Nav className="me-auto  d-flex justify-content-end">
                    <Link to="/course" style={{ textDecoration: 'none' }}>
                      <div className="emb ">Courses</div>
                    </Link>

                    <div className="emb">About</div>
                    <div className="emb">Contact</div>
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                      <div className="emb red">Login</div>
                    </Link>
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default NavBar;
