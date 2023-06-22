import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ReactPaginate from 'react-paginate';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const CourseList = () => {
  const top100Films = [
    { label: 'UI Design' },
    { label: 'UX Design' },
    { label: 'Wireframe' },
    { label: 'Typography' },
    { label: 'Prototyping' },
    { label: 'UX Writing' },
    { label: 'High Fidelity' },
    { label: 'UX Research' },
    { label: 'Colour Theory' },
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
const navigate=useNavigate()
  const move =()=>{
navigate('/edit');
  }

  useEffect(() => {
    const fetchCourses = async () => {
      // Query the Admin collection to retrieve all documents
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const categoryCourses = data.Allcourses
            ? Object.values(data.Allcourses)
            : [];
          return [...accumulator, ...categoryCourses];
        }, []);

        // Set the courses state with the retrieved array
        setCourses(allCourses);
      }
    };

    fetchCourses();
  }, []);
  console.log(courses);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const itemsPerPage = 6;
  const pageCount = Math.ceil(courses?.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = courses?.slice(startIndex, endIndex);
  return (
    <div className="mt-5">
      <div className="course_list_tab">
        <div className="corses_added">COURSE LIST</div>

        <div className="select_and_button_holder">
          <div className="row">
            <div className="col-12 col-lg-6 mb-4 ">
              <Autocomplete
                variant="filled"
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.label}
                sx={{
                  width: '90%',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="filled" />
                )}
                onChange={(event, value) => {
                  setSelectedCategory(value ? value.label : '');
                }}
              />
            </div>
            {/* <div className="col-12 col-lg-6 mb-4">
              <div className="filter_button_holder">
                <Button variant="contained" className="filter_button">
                  Filter
                </Button>
              </div>
            </div> */}
          </div>

          <div className="searchBar_holder">
            <div className="search_and_name_holder">
              <div className="search_label">Search</div>{' '}
              <input
                placeholder="Search by course name"
                className="feeelz3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <hr />

          <div>
            <div className="mt-5">
              <div>
                <div className="forever container">
                  <div className="fanta">
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
                            Sections
                          </th>
                          <th scope="col" className="trtr">
                            Price
                          </th>
                          <th scope="col" className="trtr">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentData
                          .filter((category) => {
                            if (selectedCategory) {
                              return (
                                Object.values(category).some((course) =>
                                  course.nameOfCourse
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                ) &&
                                category[0]?.category?.toLowerCase() ===
                                  selectedCategory.toLowerCase()
                              );
                            } else {
                              return Object.values(category).some((course) =>
                                course.nameOfCourse
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              );
                            }
                          })
                          .map((category) =>
                            Object.values(category).map((course) => (
                              <tr className="mt-3" key={course.courseId}>
                                <td className="trtr user-name">
                                  {course.nameOfCourse}
                                </td>
                                <td className="trtr user-name">
                                  {course.category}
                                </td>
                                <td className="trtr user-name">
                                  {course.dateAdded
                                    ?.toDate()
                                    ?.toLocaleDateString()}
                                </td>
                                <td className="trtr prices">
                                  {course.sections.length}{' '}
                                  {course.sections.length > 1
                                    ? 'sections'
                                    : 'section'}
                                </td>
                                <td className="trtr prices">
                                  ₦ {parseFloat(course.price).toLocaleString()}
                                </td>
                                <td className="trtr prices">
                                  <Tooltip
                                    disableHoverListener
                                    style={{ color: 'white' }}
                                    onClick={move}
                                  >
                                    <IconButton>
                                      <FiEdit3 />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            ))
                          )}
                      </tbody>
                    </table>
                  </div>

                  <div className="brobernard">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
