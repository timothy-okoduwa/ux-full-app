import React, { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import e from './empty.svg';
import { db, storage, auth } from '../../firebase';

import { MdOutlineDeleteOutline } from 'react-icons/md';

const ManageUpComing = () => {
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
        const comingSoonArray = adminData.upcomingWebinar || [];
        setComingSoonData(comingSoonArray);
      }
    } catch (error) {
      console.error('Error fetching coming soon webinar:', error);
    }
  };
  const handleDelete = async (item, upComingId, allId) => {
    try {
      const adminDocRef = doc(db, 'Admin', auth.currentUser.uid);
      const adminDocSnapshot = await getDoc(adminDocRef);
      const adminData = adminDocSnapshot.data();

      if (adminData) {
        const updatedComingSoon = adminData.upcomingWebinar.filter(
          (course) => course.upComingId !== item.upComingId
        );
        const updatedAdminData = {
          ...adminData,
          upcomingWebinar: updatedComingSoon,
        };

        // Delete the specific file for webinarImages
        const webinarFileRef = ref(
          storage,
          `webinarImages/${auth.currentUser.uid}/${upComingId}`
        );
        try {
          await deleteObject(webinarFileRef);
          console.log('Webinar file deleted successfully.');
        } catch (error) {
          console.log('Error deleting webinar file:', error);
        }

        // Delete the specific file for WebinartutorImages
        const tutorFileRef = ref(
          storage,
          `WebinartutorImages/${auth.currentUser.uid}/${upComingId}`
        );
        try {
          await deleteObject(tutorFileRef);
          console.log('Tutor file deleted successfully.');
        } catch (error) {
          console.log('Error deleting tutor file:', error);
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
            All Upcoming Webinar
          </div>
          <div className="mt-5">
            {comingSoonData.length === 0 ? (
              <div className="no-course-message">
                <div className="w-100 d-flex justify-content-center">
                  <img src={e} alt="" className="empty" />
                </div>
                <p className="mt-3" style={{ color: 'white' }}>
                  Sorry, no upcoming Webinar yet.
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
                            Webinar Name
                          </th>
                          <th scope="col" className="trtr">
                            Webinar Time
                          </th>
                          <th scope="col" className="trtr">
                            Webinar Date
                          </th>
                          <th scope="col" className="trtr">
                            Host Name
                          </th>
                          <th scope="col" className="trtr">
                            Host Occupation
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
                            <td className="trtr user-name">
                              {item?.WebinarTime}
                            </td>
                            <td className="trtr user-name">
                              {' '}
                              {item?.webinarDate}
                            </td>
                            <td className="trtr prices">{item.tutorName}</td>
                            <td className="trtr prices">
                              {item?.hostOccupation}
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

export default ManageUpComing;
