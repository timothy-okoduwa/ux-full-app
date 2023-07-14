import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { RiSearchLine } from 'react-icons/ri';
import FullTable from './FullTable';

const ForAll = () => {
  const [searchValue, setSearchValue] = useState('');
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const studentQuerySnapshot = await getDocs(collection(db, 'student'));
    const studentData = studentQuerySnapshot.docs.map((doc) => {
      const student = doc.data();
      const purchasedCourses = student.purchasedCourses || [];
      const coursesData = purchasedCourses.map((course) => {
        return {
          email: student.email,
          nameOfCourse: course.nameOfCourse,
          datePurchased: course.datePurchased,
          price: course.price,
        };
      });
      return coursesData;
    });
    const flattenedData = studentData.flat();
    setStudents(flattenedData);
    setFilteredData(flattenedData);
  };

  const handleSearch = () => {
    const filteredData = students.filter((student) =>
      student.email.includes(searchValue)
    );
    setFilteredData(filteredData);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 6;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bgi">
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <button className="search-button" onClick={handleSearch}>
                search
              </button>
            </div>
          </div>
        </div>
        <FullTable
          data={currentData}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ForAll;
