import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
// import { MdOutlineDeleteOutline } from 'react-icons/md';

const AllRSVP = () => {
  const [webinarData, setWebinarData] = useState([]);

  useEffect(() => {
    // Fetch data from the Admin collection
    const fetchWebinarData = async () => {
      try {
        const adminQuery = collection(db, 'Admin');
        const adminSnapshot = await getDocs(adminQuery);

        // Extract the webinarRSVP object from the first admin document
        if (!adminSnapshot.empty) {
          const firstAdminDocData = adminSnapshot.docs[0].data();
          const webinarRSVPData = firstAdminDocData.webinarRSVP || {};

          // Convert webinarRSVP object into an array of objects with name and emails properties
          const webinarDataArray = Object.entries(webinarRSVPData).map(
            ([name, emails]) => {
              return { name, emails };
            }
          );

          setWebinarData(webinarDataArray);
        }
      } catch (error) {
        console.error('Error fetching webinar data:', error);
      }
    };

    fetchWebinarData();
  }, []);

  return (
    <div className="bgi">
      <div className="container ">
        {webinarData.map((webinar) => (
          <div key={webinar.name}>
            <div className="mt-5 corses_added" style={{ color: 'white' }}>
              {webinar.name} {/* Display the webinar name */}
            </div>
            <div className="mt-5 ">
              <div>
                <div className="forever container">
                  <div className="fanta pt-3">
                    <table className="table">
                      <thead className="parana">
                        <tr>
                          <th scope="col" className="trtr">
                            waitList Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Map through the emails for the current webinar */}
                        {webinar.emails.map((email, index) => (
                          <tr key={index} className="mt-3">
                            {/* <td className="trtr user-name">{webinar.name}</td> */}
                            <td className="trtr user-name">{email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRSVP;
