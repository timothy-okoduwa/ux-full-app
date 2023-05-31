import React from 'react'
import './Dashboard2.css'
import PurchaseChart from './PurchaseChart';
import RecentPurchase from './RecentPurchase';
const Numbers = () => {
  return (
    <div className="bgi">
      <div className="container">
        <div className="dashname">Dashboard</div>

        <div className="mt-4">
          <div className="row">
            <div className="col-12 col-lg-4 mb-4">
              <div className="wikoko">
                <div className="total">Total No. of Courses</div>
                <div className="money">2000</div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <div className="wikoko">
                <div className="total">Number of Users</div>
                <div className="money">2000</div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <div className="wikoko">
                <div className="total">Number of Purchased Course</div>
                <div className="money">2000</div>
              </div>
            </div>
          </div>
        </div>
        <PurchaseChart/>
        <RecentPurchase/>
      </div>    
    </div>
  );
}

export default Numbers