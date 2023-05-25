import React, { useState, useEffect } from 'react';
import a from './images/gyg.png';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { db, auth } from '../firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
const PersonalInfo = () => {
const [studentInfo, setStudentInfo] = useState({
  fullName: '',
  email: '',
  gender: '',
  country: '',
  jobTitle: '',
  phone: '',
  loading: false,
});
const { email, loading } = studentInfo;

useEffect(() => {
  const fetchStudentInfo = async () => {
    const studentCollection = collection(db, 'student');
    const studentDocRef = doc(studentCollection, auth?.currentUser?.uid);
    const docSnap = await getDoc(studentDocRef);
    if (docSnap.exists()) {
      setStudentInfo(docSnap.data());
    }
  };

  fetchStudentInfo();
}, []);

const handleChange = (e) => {
  setStudentInfo((prevStudentInfo) => ({
    ...prevStudentInfo,
    [e.target.name]: e.target.value,
  }));
};

const reauthenticate = async (currentPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
};

const submitChange = async () => {
  setStudentInfo({ ...studentInfo, loading: true });

  const studentCollection = collection(db, 'student');
  const studentDocRef = doc(studentCollection, auth?.currentUser?.uid);
  await updateDoc(studentDocRef, studentInfo);

  const user = auth.currentUser;
  if (user && studentInfo.email !== user.email) {
    try {
      // Prompt user to enter current password and assign it to currentPassword variable
      const currentPassword = prompt('Please enter your current password:');
      await reauthenticate(currentPassword);
      await updateEmail(user, email);
    } catch (error) {
      // Handle re-authentication error
      console.log(error);
    }
  }

  setStudentInfo({ ...studentInfo, loading: false });
};


  return (
    <div>
      <div className="Settings">Settings</div>

      <div className="row mt-5">
        <div className="col-12 col-lg-3"></div>
        <div className="col-12 col-lg-9">
          <div>
            <div className="upopo">
              <div
                className="
              round-cheese"
              >
                <img
                  src={a}
                  alt=""
                  className="
              round-cheese"
                />
              </div>
              <div className="welcome">Welcome,{studentInfo?.fullName}</div>
            </div>
            <div className="pinfo">Personal Information</div>
            <div className="row mt-5">
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Fullname</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="fullName"
                      value={studentInfo?.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Email</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="email"
                      value={studentInfo?.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Gender</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="gender"
                      value={studentInfo?.gender}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Country</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="country"
                      value={studentInfo?.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Job Title</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="jobTitle"
                      value={studentInfo?.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <div className="ph">Phone Number</div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="alertd"
                      name="phone"
                      value={studentInfo?.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-5">
                <div>
                  <button className="fhfhfhfh" onClick={submitChange}>
                    {loading ? (
                      <CircularProgress
                        style={{
                          color: 'white',
                          height: '27px',
                          width: '27px',
                        }}
                      />
                    ) : (
                      'Update'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
