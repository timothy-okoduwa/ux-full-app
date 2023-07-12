import React, { useState, useEffect } from 'react';
import '../pages/SignPage/Sign.css';
import p from '../pages/images/perdor.png';
import { BsCheckAll } from 'react-icons/bs';
import { usePaystackPayment } from 'react-paystack';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  query,
  getDocs,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  p: 3,
};
const PurchaseCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState(null);
  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: course?.price * 100,
    publicKey: 'pk_test_89aaa353160cbf6c9c97b5efb14e4e0ff3f5f5eb',
  };

  const initializePayment = usePaystackPayment(config);
  const isAuth = auth.currentUser;
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  useEffect(() => {
    // Check if user is logged in or has an account
    const userRole = localStorage.getItem('userRole');
    setIsUserLoggedIn(userRole === 'student');
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (isAuth) {
      const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);
      unsubscribe = onSnapshot(studentDocRef, (docSnap) => {
        if (docSnap?.exists()) {
          setUser(docSnap?.data());
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

  useEffect(() => {
    const fetchCourse = async () => {
      const adminQuery = query(collection(db, 'Admin'));
      const adminSnapshot = await getDocs(adminQuery);

      if (!adminSnapshot.empty) {
        const allCourses = adminSnapshot.docs.reduce((accumulator, doc) => {
          const data = doc.data();
          const categoryCourses = data.Allcourses || {};

          Object.values(categoryCourses).forEach((coursesArray) => {
            const matchingCourse = coursesArray.find(
              (course) => course.courseId === courseId
            );

            if (matchingCourse) {
              accumulator.push(matchingCourse);
            }
          });

          return accumulator;
        }, []);

        if (allCourses.length > 0) {
          setCourse(allCourses[0]);
        }
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return null;
  }
  // console.log(user);

  const handleSuccessfulPayment = async (reference) => {
    // console.log(reference);
    const purchasedCourse = {
      ...course,
      datePurchased: Timestamp.fromDate(new Date()),
    };

    try {
      // Get the student document reference
      const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);

      // Fetch the existing student data
      const studentDoc = await getDoc(studentDocRef);
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        const purchasedCourses = Array.isArray(studentData.purchasedCourses)
          ? studentData.purchasedCourses
          : [];

        // Update the 'purchasedCourses' array with the purchased course
        const updatedCourses = [...purchasedCourses, purchasedCourse];

        // Update the 'purchasedCourses' array in the student document
        await updateDoc(studentDocRef, { purchasedCourses: updatedCourses });
      } else {
        // Create the 'purchasedCourses' array in the student document
        await setDoc(studentDocRef, { purchasedCourses: [purchasedCourse] });
      }
    } catch (error) {
      console.error('Error purshing this course:', error);
    }

    // console.log(purchasedCourse);
  };

  const onSuccess = (reference) => {
    handleSuccessfulPayment(reference);
    navigate('/dashboard');
  };

  const onClose = () => {
    alert('something went wrong');
  };

  const checkCourseAlreadyPurchased = async () => {
    try {
      const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);
      const studentDoc = await getDoc(studentDocRef);
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        const purchasedCourses = Array.isArray(studentData.purchasedCourses)
          ? studentData.purchasedCourses
          : [];

        const isCoursePurchased = purchasedCourses.some(
          (purchasedCourse) => purchasedCourse.courseId === courseId
        );

        if (isCoursePurchased) {
          setOpen2(true);
        } else {
          initializePayment(onSuccess, onClose);
        }
      }
    } catch (error) {
      console.error('Error checking purchased courses:', error);
    }
  };

  const PaystackHookExample = () => {
    const handlePayment = () => {
      if (isUserLoggedIn) {
        checkCourseAlreadyPurchased();
      } else {
        setOpen(true);
      }
    };
    return (
      <div>
        <button className="no-plie" onClick={handlePayment}>
          PAY WITH PAYSTACK
        </button>
        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="shaking-modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Sorry ⚠️
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                you need to sign in or create an account before you can purchase
                this course.
              </Typography>
            </Box>
          </Modal>
        )}
        {open2 && (
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="shaking-modal"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Dear {user?.fullName} ⚠️
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You have already purchased this course,You can view this course
                in your dashboard 🙂
              </Typography>
            </Box>
          </Modal>
        )}
      </div>
    );
  };
  return (
    <div className="purr mt-5">
      <div className="container">
        <div className="commp">Complete Purchase</div>
        <div className="moc-to">
          <div className="yawa">
            <div className="one">1</div>
            <div className="purc">Purchase</div>
          </div>
          <div className="shror">
            <div className="takee">
              <span className="expen"></span>
            </div>
          </div>
          <div className="yawa">
            <div className="one2">
              <BsCheckAll />
            </div>
            <div className="purc">Yours for Life !</div>
          </div>
        </div>

        <div className="dey-for">
          <div className="learn-more">
            <div className="row fluffy">
              <div className="col-12 col-lg-6 mb-5">
                <div className="mt-5 ">
                  <div className="anita">{course.tutorName}</div>
                  <div className="felo">{course.nameOfCourse}</div>
                  <div className="price">
                    ₦{parseFloat(course.price).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="gat-u">
                  <img
                    src={course.thumbnailURL || p}
                    alt=""
                    style={{ objectFit: 'cover', width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="all-refresh">
            <div className="container">
              <div className="tp">Total Price</div>
              <div className="hot">
                ₦{parseFloat(course.price).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <PaystackHookExample />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCourse;
