import React,{useState,useEffect} from 'react';
import './HeadAndNav.css';
import b from '../image/ux.svg';
import { MdDashboard } from 'react-icons/md';
import { BsCreditCardFill } from 'react-icons/bs';

import {
  RiSettings4Fill,
  RiLogoutBoxLine,
  RiUploadCloudFill,
} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { onSnapshot,doc } from 'firebase/firestore';
import { db,auth } from '../../firebase';
const HeadAndNav = () => {
  const [user, setUser]=useState(null)
  const isAuth = auth.currentUser
  useEffect(() => {
    let unsubscribe;
    if (isAuth) {
      const studentDocRef = doc(db, 'Admin', auth.currentUser.uid);
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
  }, [isAuth]);
  return (
    <div>
      <div className="static">
        <div className="header-jam">
          <div className="container text-holder-header">
            <div className="flex-up-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="initials">{user?.fullName?.charAt(0)}</div>{' '}
                  <div className="name-itself">{user?.fullName}</div>
                </div>
              </div>

              <div></div>
            </div>
          </div>
          <div>
            <div className="for-admin">
              <RiLogoutBoxLine />
              <span> Logout</span>
            </div>
          </div>
        </div>

        <div className="side-bar">
          <div className="">
            <div className="logo-jolder mb-2">
              <img src={b} alt="picss" className="logo-style" />
            </div>
            <div className="cezer-roller">
              <div className="push-down-a-bit">
                <NavLink to="/admin-dash" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <MdDashboard className="color" />
                      <span className="link-name"> Dashboard</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink className="Link" to="/uploads">
                  <div className=" height">
                    <div className=" wko">
                      <RiUploadCloudFill className="color" />
                      <span className="link-name"> Upload</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink to="/purchase-History" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <BsCreditCardFill className="color" />
                      <span className="link-name"> Purchase History</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit">
                <NavLink to="/settings" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <RiSettings4Fill className="color" />
                      <span className="link-name"> Settings</span>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="push-down-a-bit" style={{ marginTop: '120px' }}>
                <NavLink to="/settings" className="Link">
                  <div className=" height">
                    <div className=" wko">
                      <RiLogoutBoxLine className="color" />
                      <span className="link-name"> Logout</span>
                    </div>
                  </div>
                </NavLink>
              </div>

              <div className="for-ads push-down-a-bit container"></div>
              <div className="push-down-a-bit logout-push"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadAndNav;
