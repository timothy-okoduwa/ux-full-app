import React, { useState, useEffect, useRef, useCallback } from 'react';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import t from '../images/TEXT.png';
import g from '../images/gyg.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import Menu from '@mui/base/Menu';
import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';

import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';

import { AiOutlineSetting } from 'react-icons/ai';
import { TbLogout } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
const StyledListbox = styled('ul')(
  ({ theme }) => `
  box-sizing: border-box;
  padding: 6px;

  min-width: 150px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #191919;
  color: white;
 margin-top:10px;
  `
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
 color: white;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover:not(.${menuItemClasses.disabled}) { 
    color: #ffffff;
    background:black;
  }
  `
);
const StyledPopper = styled(Popper)`
  z-index: 1;
`;
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [buttonElement, setButtonElement] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const menuActions = useRef(null);
  const preventReopen = useRef(false);

  const updateAnchor = useCallback((node) => {
    setButtonElement(node);
  }, []);

  const handleButtonClick = (event) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    setOpen((open) => !open);
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      preventReopen.current = true;
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (event.key === 'ArrowUp') {
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    }
  };

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
  const profile = () => {
    navigate('/dashboard');
  };
  const setting = () => {
    navigate('/setting');
  };

  const handleLogOut = async () => {
    if (user) {
      const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);
      await updateDoc(studentDocRef, { isOnLine: false });
    }

    // Clear the userRole from local storage
    localStorage.setItem('userRole', '');

    auth.signOut();
    navigate('/');
  };

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
    location.pathname === '/coming-soon' ||
    location.pathname === '/admin-signin' ||
    location.pathname === '/courses' ||
    location.pathname === '/upcomingwebinar' ||
    location.pathname === '/uploadpast' ||
    location.pathname === '/webinarr' ||
    location.pathname === '/rsvpwaitlist' ||
    location.pathname === '/seeall' ||
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
                  <Nav className="me-auto better">
                    <Link to="/course" style={{ textDecoration: 'none' }}>
                      <div className="emb33 ">Courses</div>
                    </Link>
                    <Link to="/webinars" style={{ textDecoration: 'none' }}>
                      <div className="emb33">Webinars</div>
                    </Link>

                    {isAuthenticated && userRole !== 'admin' && (
                      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <div className="niboo">My Courses</div>
                      </Link>
                    )}

                    {(!isAuthenticated || userRole === 'admin') && (
                      <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <div className="emb33 ">Login</div>
                      </Link>
                    )}
                    {(!isAuthenticated || userRole === 'admin') && (
                      <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <div className="niboo22">Get Started</div>
                      </Link>
                    )}

                    <div>
                      {isAuthenticated && userRole !== 'admin' && (
                        <div
                          className="emb "
                          onClick={handleButtonClick}
                          onKeyDown={handleButtonKeyDown}
                          onMouseDown={handleButtonMouseDown}
                          ref={updateAnchor}
                          aria-controls={isOpen ? 'simple-menu' : undefined}
                          aria-expanded={isOpen || undefined}
                          aria-haspopup="menu"
                        >
                          {user && (
                            <div className="swing">
                              <img
                                src={user.avatarURL || g}
                                alt=""
                                className="circle"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <div>
                        <Menu
                          actions={menuActions}
                          open={isOpen}
                          onOpenChange={(open) => {
                            setOpen(open);
                          }}
                          style={{ zIndex: '99999' }}
                          className="steez"
                          anchorEl={buttonElement}
                          slots={{ root: StyledPopper, listbox: StyledListbox }}
                          slotProps={{ listbox: { id: 'simple-menu' } }}
                        >
                          <StyledMenuItem
                            onClick={() => {
                              profile();
                              handleButtonClick();
                            }}
                            className="relax"
                          >
                            <CgProfile style={{ marginRight: '10px' }} />
                            Profile
                          </StyledMenuItem>
                          <StyledMenuItem
                            onClick={() => {
                              setting();
                              handleButtonClick();
                            }}
                            className="relax"
                          >
                            <AiOutlineSetting style={{ marginRight: '10px' }} />
                            Settings
                          </StyledMenuItem>
                          <StyledMenuItem
                            onClick={() => {
                              handleLogOut();
                              handleButtonClick();
                            }}
                            className="relax"
                          >
                            <TbLogout style={{ marginRight: '10px' }} />
                            Logout
                          </StyledMenuItem>
                        </Menu>
                      </div>
                    </div>
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
