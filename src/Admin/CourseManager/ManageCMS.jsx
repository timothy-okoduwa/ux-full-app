import React, { useEffect, useState } from 'react';
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, getDownloadURL } from 'firebase/storage';
import e from './empty.svg';
import { db, storage, auth } from '../../firebase';

import { MdOutlineDeleteOutline } from 'react-icons/md';

const ManageCMS = () => {
  const [comingSoonData, setComingSoonData] = useState([]);

  useEffect(() => {
    fetchComingSoonData();
  }, []);

  const fetchComingSoonData = async () => {
    try {
      const adminDocRef = doc(db, 'Admin', auth.currentUser.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
      const adminData = adminDocSnapshot.data();

      if (adminData) {
        const comingSoonArray = adminData.comingSoon || [];
        setComingSoonData(comingSoonArray);
      }
    } catch (error) {
      console.error('Error fetching coming soon data:', error);
    }
  };

  const handleDelete = async (item, upComingId) => {
    try {
      const adminDocRef = doc(db, 'Admin', auth.currentUser.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
      const adminData = adminDocSnapshot.data();

      if (adminData) {
        const updatedComingSoon = adminData.comingSoon.filter(
          (course) => course.upComingId !== item.upComingId
        );
        const updatedAdminData = {
          ...adminData,
          comingSoon: updatedComingSoon,
        };

        // Get the download URL of the file
        const storageRef = ref(
          storage,
          `comingSoon/${auth.currentUser.uid}/${upComingId}`
        );
        const downloadURL = await getDownloadURL(storageRef);

        // Delete the specific file
        try {
          const fileRef = ref(storage, downloadURL);
          await deleteObject(fileRef);
          console.log('File deleted successfully.');
        } catch (error) {
          console.log('Error deleting file:', error);
        }

        // Update the Admin document in Firestore
        await updateDoc(adminDocRef, updatedAdminData);
        setComingSoonData(updatedComingSoon);
      }
    } catch (error) {
      console.error('Error deleting the object:', error);
    }
  };

  return (
    <div className="bgi">
      <div className="container">
        <div>
          <div className="mt-4 corses_added" style={{ color: 'white' }}>
            All Upcoming Courses
          </div>
          <div className="mt-5">
            {comingSoonData.length === 0 ? (
              <div className="no-course-message">
                <div className="w-100 d-flex justify-content-center">
                  <img src={e} alt="" className="empty" />
                </div>
                <p className="mt-3" style={{ color: 'white' }}>
                  Sorry, no upcoming courses yet.
                </p>
              </div>
            ) : (
              <div>
                <div className="forever container">
                  <div className="fanta pt-3">
                    <table className="table">
                      <thead className="parana">
                        <tr>
                          <th scope="col" className="trtr">
                            Course Name
                          </th>
                          <th scope="col" className="trtr">
                            Category
                          </th>
                          <th scope="col" className="trtr">
                            Date created
                          </th>
                          <th scope="col" className="trtr">
                            Tutor name
                          </th>
                          <th scope="col" className="trtr">
                            Price
                          </th>
                          <th scope="col" className="trtr">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comingSoonData.map((item) => (
                          <tr className="mt-3" key={item?.upComingId}>
                            <td className="trtr user-name">
                              {item?.courseName}
                            </td>
                            <td className="trtr user-name">{item?.category}</td>
                            <td className="trtr user-name">
                              {' '}
                              {item?.createdAt?.toDate()?.toLocaleDateString()}
                            </td>
                            <td className="trtr prices">{item.tutorName}</td>
                            <td className="trtr prices">
                              ₦ {parseFloat(item.price).toLocaleString()}
                            </td>
                            <td className="trtr prices">
                              <MdOutlineDeleteOutline
                                style={{
                                  color: 'white',
                                  fontSize: '22px',
                                  cursor: 'pointer',
                                }}
                                onClick={() =>
                                  handleDelete(item, item.upComingId)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCMS;
