import React, { useState, useEffect } from 'react';
import a from './images/gyg.png';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import CircularProgress from '@mui/material/CircularProgress';
import { db, auth, storage } from '../../firebase';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth';
import LeftSettings from './LeftSettings';

const PersOne = () => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [avatarURL, setAvatarURL] = useState('');
  const navigate = useNavigate();
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
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
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
    navigate('/dashboard');
  };
  useEffect(() => {
    // Fetch the avatar URL from the document on initial load
    const fetchAvatarURL = async () => {
      const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);
      const studentDocSnapshot = await studentDocRef?.get();
      if (studentDocSnapshot?.exists()) {
        const studentData = studentDocSnapshot?.data();
        setAvatarURL(studentData?.avatarURL || '');
      }
    };

    fetchAvatarURL();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Delete the old image if it exists
      if (avatarURL) {
        const storageRef = ref(storage, avatarURL);
        await deleteObject(storageRef);
      }

      // Create a reference to the storage location where you want to upload the image
      const storageRef = ref(
        storage,
        `avatar/${auth?.currentUser?.uid}/${file.name}`
      );

      try {
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot?.ref);

        // Update the student collection document with the new image URL
        const studentDocRef = doc(db, 'student', auth?.currentUser?.uid);
        await updateDoc(studentDocRef, {
          avatarURL: downloadURL,
        });

        toast.success('🎊 Image Uploaded ', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setAvatarURL(downloadURL);
      } catch (error) {
        toast.error(`😞 Error uploading image: ${error}`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row ">
        <div className="col-12">
          <div>
            <div className="upopo">
              <div className="round-cheese">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt=""
                    className="round-cheese"
                  />
                ) : (
                  <img
                    src={studentInfo?.avatarURL || a}
                    alt=""
                    className="round-cheese"
                  />
                )}

                <input
                  type="file"
                  id="upload-avatar"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>
              <div>
                <div className="welcome">Welcome,{studentInfo?.fullName}</div>
                <label className="upim" htmlFor="upload-avatar">
                  Upload image
                </label>
              </div>
            </div>
            <div className="pinfo ">Personal Information</div>
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

export default PersOne;
