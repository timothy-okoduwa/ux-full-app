import React, { useState } from 'react';
import { doc, getDoc, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import { RiUploadCloudFill } from 'react-icons/ri';
import { TiTimes } from 'react-icons/ti';
import { db, auth, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const UpcomingForm = () => {
  const [courseName, setCourseName] = useState('');
  const [webinarDate, setWebinarDate] = useState('');
  const [WebinarTime, setWebinarTime] = useState('');
  const [description, setDescription] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [hostOccupation, setHostOccupation] = useState('');
  const [aboutHost, setAboutHost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTutorImages, setSelectedTutorImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const disabled =
    !courseName ||
    !webinarDate ||
    !WebinarTime ||
    !aboutHost ||
    !hostOccupation ||
    !description ||
    !tutorName ||
    !selectedTutorImages ||
    loading ||
    !selectedImage;
  const allId = uuidv4();
  const move = async () => {
    setLoading(true);
    try {
      const adminRef = doc(db, 'Admin', auth.currentUser.uid);
      const adminSnapshot = await getDoc(adminRef);
      let TutorImage = '';
      if (selectedTutorImages) {
        const storageRef = ref(
          storage,
          `WebinartutorImages/${auth.currentUser.uid}/${allId}`
        );
        const uploadSnapshot = await uploadBytes(
          storageRef,
          selectedTutorImages
        );
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        TutorImage = downloadURL;
      }

      let comingImage = '';
      if (selectedImage) {
        const storageRef = ref(
          storage,
          `webinarImages/${auth.currentUser.uid}/${allId}`
        );
        const uploadSnapshot = await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(uploadSnapshot.ref);
        comingImage = downloadURL;
      }

      const formattedDate = new Date(webinarDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const formattedTime = new Date(
        `1970-01-01T${WebinarTime}:00`
      ).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      });

      const postObject = {
        courseName,
        hostOccupation,
        aboutHost,
        webinarDate: formattedDate,
        WebinarTime: formattedTime,
        description,
        tutorName,
        upComingId: allId,
        selectedWebinarBanner: comingImage,
        selectedTutorImage: TutorImage,
        createdAt: Timestamp.fromDate(new Date()),
      };

      if (adminSnapshot.exists()) {
        // Update the existing document
        const currentComingSoon = adminSnapshot.data().upcomingWebinar || [];
        await updateDoc(adminRef, {
          upcomingWebinar: [...currentComingSoon, postObject],
        });
      } else {
        // Create a new document
        await setDoc(adminRef, {
          upcomingWebinar: [postObject],
        });
      }

      // Clear the form
      setCourseName('');
      setHostOccupation('');
      setWebinarDate('');
      setAboutHost('');
      setWebinarTime('');
      setDescription('');
      setTutorName('');
      setSelectedImage(null);
      setSelectedTutorImages(null);
    } catch (error) {
      console.log('Error uploading the post:', error);
    }
    navigate('/webinarr');
    setLoading(false);
  };

  const handleTutorUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedTutorImages(file);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="bgi">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Webinar Name</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Webinar Date</div>
              <div>
                <input
                  type="date"
                  className="feeelz"
                  value={webinarDate}
                  onChange={(e) => setWebinarDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Webinar Time</div>
              <div>
                <input
                  type="time"
                  className="feeelz"
                  value={WebinarTime}
                  onChange={(e) => setWebinarTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Host Name</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">Host Occupation</div>
              <div>
                <input
                  type="text"
                  className="feeelz"
                  value={hostOccupation}
                  onChange={(e) => setHostOccupation(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <div>
              <div className="cacus">About Host</div>
              <div>
                <textarea
                  type="text"
                  className="feeelz pt-3"
                  value={aboutHost}
                  onChange={(e) => setAboutHost(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Webinar Description</div>
              <div>
                <textarea
                  type="text"
                  className="feeelz2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Host Images </div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    {selectedTutorImages ? (
                      <div className="uploaded-image-container">
                        <div
                          className="close-button"
                          onClick={() => setSelectedTutorImages(null)}
                        >
                          <TiTimes />
                        </div>
                        <img
                          src={URL.createObjectURL(selectedTutorImages)}
                          alt="Thumbnail"
                          className="uploaded-image"
                        />
                      </div>
                    ) : (
                      <div className="flips">
                        {' '}
                        <div className="cloudesx mt-5">
                          <RiUploadCloudFill />
                        </div>
                        <div className="click">
                          Click “Upload” to upload Host Images
                        </div>
                        <label className="upload-Button" htmlFor="HostImages">
                          Upload
                        </label>
                        <input
                          type="file"
                          id="HostImages"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleTutorUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mb-4">
            <div>
              <div className="cacus">Webinar ThumbNail </div>
              <div>
                <div className="forImahe ">
                  <div className="broken-line">
                    {selectedImage ? (
                      <div className="uploaded-image-container">
                        <div
                          className="close-button"
                          onClick={() => setSelectedImage(null)}
                        >
                          <TiTimes />
                        </div>
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Thumbnail"
                          className="uploaded-image"
                        />
                      </div>
                    ) : (
                      <div className="flips">
                        {' '}
                        <div className="cloudesx mt-5">
                          <RiUploadCloudFill />
                        </div>
                        <div className="click">
                          Click “Upload” to upload Webinar thumbnail
                        </div>
                        <label
                          className="upload-Button"
                          htmlFor="thumbNailUpload"
                        >
                          Upload
                        </label>
                        <input
                          type="file"
                          id="thumbNailUpload"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="next-button" onClick={move} disabled={disabled}>
              {loading ? (
                <CircularProgress
                  style={{ color: 'white', height: '30px', width: '30px' }}
                />
              ) : (
                'Upload'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingForm;
