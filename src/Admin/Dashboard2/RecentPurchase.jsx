import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const RecentPurchase = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const studentQuerySnapshot = await getDocs(collection(db, 'student'));
      const studentData = studentQuerySnapshot.docs.map((doc) => doc.data());
      setStudents(studentData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const navigateToPurchaseHistory = useNavigate();

  const navigateToPurchaseHistoryPage = () => {
    navigateToPurchaseHistory('/purchase-History');
  };

  const recentPurchases = students
    .flatMap((student) =>
      student.purchasedCourses.map((course) => ({
        fullName: student.fullName,
        email: student.email,
        ...course,
      }))
    )
    .slice(0, 6); // Display only 6 recent purchases

  return (
    <div>
      <div className="forever container">
        <div className="grew-up">
          <div className="rec">Recent Purchase</div>
          <div className="seeall" onClick={navigateToPurchaseHistoryPage}>
            See All
          </div>
        </div>
        <div className="fanta">
          <table className="table">
            <thead className="parana">
              <tr>
                <th scope="col" className="trtr">
                  Full Name
                </th>
                <th scope="col" className="trtr">
                  Email
                </th>
                <th scope="col" className="trtr">
                  Course Name
                </th>
                <th scope="col" className="trtr">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((purchase) => (
                <tr className="mt-3" key={purchase.courseId}>
                  <td className="trtr user-name">{purchase.fullName}</td>
                  <td className="trtr user-name">{purchase.email}</td>
                  <td className="trtr user-name">
                    {purchase.nameOfCourse.length > 23
                      ? `${purchase.nameOfCourse.slice(0, 23)}...`
                      : purchase.nameOfCourse}
                  </td>
                  <td className="trtr prices">
                    ₦{parseFloat(purchase.price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchase;
