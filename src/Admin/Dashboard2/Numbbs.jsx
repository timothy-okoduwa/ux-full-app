import React, { useState, useEffect } from 'react';
import './Dashboard2.css';
import PurchaseChart from './PurchaseChart';
import RecentPurchase from './RecentPurchase';
import { onSnapshot, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

const Numbers = () => {
  const [user, setUser] = useState(null);
  const isAuth = auth.currentUser;

  useEffect(() => {
    let unsubscribe;
    if (isAuth) {
      const studentDocRef = doc(db, 'Admin', auth?.currentUser?.uid);
      unsubscribe = onSnapshot(studentDocRef, (docSnap) => {
        if (docSnap?.exists()) {
          setUser(docSnap?.data()?.Allcourses);
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

  const numberOfArrays = user ? Object.keys(user).length : 0;
  let totalObjects = 0;

  if (user) {
    Object.keys(user).forEach((key) => {
      const array = user[key];
      const numberOfObjects = array ? array.length : 0;
      totalObjects += numberOfObjects;
    });
  }

  return (
    <div className="bgi">
      <div className="container">
        <div className="dashname">Dashboard</div>

        <div className="mt-4">
          <div className="row">
            <div className="col-12 col-lg-3 mb-4">
              <div className="wikoko">
                <div className="total">Total No. of Courses</div>
                <div className="money">{totalObjects}</div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="wikoko">
                <div className="total">No. of Categories</div>
                <div className="money">{numberOfArrays}</div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="wikoko">
                <div className="total">Number of Users</div>
                <div className="money">2000</div>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4">
              <div className="wikoko">
                <div className="total">No. of Purchased Course</div>
                <div className="money">2000</div>
              </div>
            </div>
          </div>
        </div>
        <PurchaseChart />
        <RecentPurchase />
      </div>
    </div>
  );
};

export default Numbers;
