import React, { useState, useEffect } from 'react';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import t from '../images/TEXT.png';
import g from '../images/gyg.png';
import { Link, useLocation } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

const NavBar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const isAuthenticated = auth.currentUser;
  const userRole = localStorage.getItem('userRole');
  useEffect(() => {
    let unsubscribe;

    if (isAuthenticated) {
      const studentDocRef = doc(db, 'student', auth.currentUser.uid);
      unsubscribe = onSnapshot(studentDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          setUser(null);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isAuthenticated]);

  const hideAllHeader =
    location.pathname === '/signup' ||
    location.pathname === '/signin' ||
    location.pathname === '/verify' ||
    location.pathname === '/confirm' ||
    location.pathname === '/admin-dash' ||
    location.pathname === '/purchase-History' ||
    location.pathname === '/uploads' ||
    location.pathname === '/chh' ||
    location.pathname === '/admin-signup' ||
    location.pathname === '/admin-signin' ||
    location.pathname === '/courses' ||
    location.pathname.startsWith('/edit') ||
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
                    {(!isAuthenticated || userRole === 'admin') && (
                      <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <div className="emb red">Login</div>
                      </Link>
                    )}

                    {isAuthenticated && userRole !== 'admin' && (
                      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <div className="emb circle">
                          {user && (
                            <img
                              src={user.avatarURL || g}
                              alt=""
                              className="circle"
                            />
                          )}
                        </div>
                      </Link>
                    )}
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
