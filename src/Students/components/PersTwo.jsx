import React, { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import ReactPaginate from 'react-paginate';
const PersTwo = () => {
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getDoc(doc(db, 'student', auth?.currentUser?.uid)).then((docSnap) => {
      if (docSnap?.exists) {
        setUser(docSnap?.data());
      }
    });
  }, []);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 5;
  const pageCount = Math.ceil(
    (user?.purchasedCourses?.length || 0) / itemsPerPage
  );

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = user?.purchasedCourses?.slice(startIndex, endIndex) || [];

  return (
    <div>
      <div className="Purr">Purchase History</div>

      <div className="mt-5">
        <div className="forever22 ">
          <div className="fanta22 ">
            <table className="table  ">
              <thead className="parana22">
                <tr>
                  <th scope="col" className="trtr22">
                    S/N
                  </th>
                  <th scope="col" className="trtr22">
                    Course Image
                  </th>
                  <th scope="col" className="trtr22">
                    Course Name
                  </th>
                  {/* <th scope="col" className="trtr22">
                    Tutor Name
                  </th> */}
                  <th scope="col" className="trtr22">
                    Date Purchased
                  </th>
                  <th scope="col" className="trtr22">
                    Price
                  </th>
                  <th scope="col" className="trtr22">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="jola">
                {currentData?.map((paid, index) => {
                  // Check if all isWatched values are true
                  const allWatched = paid.sections.every((section) =>
                    section.segment.every((segment) => segment.isWatched)
                  );

                  // Check if any isWatched value is true
                  const anyWatched = paid.sections.some((section) =>
                    section.segment.some((segment) => segment.isWatched)
                  );

                  let statusTextColor;
                  let statusText;

                  if (allWatched) {
                    statusTextColor = '#00AB4F'; // Completed: Green color
                    statusText = 'Completed';
                  } else if (anyWatched) {
                    statusTextColor = '#84c1fa'; // In Progress: Blue color
                    statusText = 'In Progress';
                  } else {
                    statusTextColor = '#eeee'; // Not Started: #da4545 color
                    statusText = 'Not Started';
                  }

                  return (
                    <tr className="mt-3" key={paid.id}>
                      <td className="trtr22">
                        <div className="nhyu user-name">{index + 1}</div>
                      </td>
                      <td className="trtr22">
                        <div className="suka">
                          <img
                            src={paid.thumbnailURL}
                            alt=""
                            className="suka"
                          />
                        </div>
                      </td>
                      <td className="trtr22 user-name">
                        <div className="nhyu">
                          {' '}
                          {paid.nameOfCourse.length > 23
                            ? `${paid.nameOfCourse.slice(0, 23)}...`
                            : paid.nameOfCourse}
                        </div>
                      </td>
                      {/* <td className="trtr22 user-name">
                        <div className="nhyu">{paid.tutorName}</div>
                      </td> */}
                      <td className="trtr22 prices">
                        <div className="nhyu">
                          {' '}
                          {paid.datePurchased?.toDate()?.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="trtr22 prices">
                        <div className="nhyu">
                          {' '}
                          ₦ {parseFloat(paid.price).toLocaleString()}
                        </div>
                      </td>
                      <td className="trtr22 prices">
                        <div
                          className="nhyu"
                          style={{ color: statusTextColor }}
                        >
                          {statusText}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="brobernard mt-3">
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            previousLabel="<"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            nextLabel=">"
            disabledClassName="disabledd"
          />
        </div>
      </div>
    </div>
  );
};

export default PersTwo;
