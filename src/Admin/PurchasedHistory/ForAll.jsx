import React from 'react';
import './PurHist.css';
import { RiSearchLine } from 'react-icons/ri';
import FullTable from './FullTable';
const ForAll = () => {
  return (
    <div className="bgi ">
      <div className="container">
        <div className="budg">
          <div className="dashname mb-3">Purchase History</div>
          <div>
            <div className="d-flex container coll-lage">
              <div className="d-flex align-items-center">
                <div className="iconss">
                  <RiSearchLine />
                </div>
                <input
                  type="text"
                  className="search_input"
                  placeholder="Search by Email"
                />
              </div>

              <button className="search-button">search</button>
            </div>
          </div>
        </div>
        <FullTable/>
      </div>
    </div>
  );
};

export default ForAll;
