import React from 'react';
import './HeadAndNav.css';
import { MdDashboard } from 'react-icons/md';
import { RiSettings4Fill, RiUploadCloudFill } from 'react-icons/ri';
import { BsCreditCardFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
function MobileNav() {
  return (
    <div className="badddd">
      <div className="wibdow">
        <div className="truss">
          <NavLink to="/admin-dash" className="Link">
            <div>
              <MdDashboard className="color22 mb-2" />
            </div>
            <div className="textd">Dashboard</div>
          </NavLink>
        </div>
        <div className="truss">
          {' '}
          <NavLink to="/uploads" className="Link">
            <div>
              {' '}
              <RiUploadCloudFill className="color22 mb-2" />
            </div>
            <div className="textd">Upload</div>
          </NavLink>
        </div>
        <div className="truss">
          {' '}
          <NavLink to="/purchase-History" className="Link">
            <div>
              {' '}
              <BsCreditCardFill className="color22 mb-2" />
            </div>
            <div className="textd">Purchase History</div>
          </NavLink>
        </div>
        <div className="truss">
          <NavLink to="/settings" className="Link">
            {' '}
            <div>
              <RiSettings4Fill className="color22 mb-2" />
            </div>
            <div className="textd">Settings</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
