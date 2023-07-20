import React, { useRef, useState } from 'react';
import y from '../pages/Webinars/yng.png';
import UpcomingWebinar from './UpcomingWebinar';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
const DetailsDownPart = ({ course }) => {
  const [emaill, setEmaill] = useState('');
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendConfirmationEmail();
    emailjs
      .sendForm(
        'service_y5895d8',
        'template_4zjam5h',
        form.current,
        'bcyUUGHEE-8frwK2g'
      )
      .then(
        (result) => {
          toast.success(`🎊 RSVP Sucessful please check you mail`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setEmaill('');
          setLoading(false);
        },
        (error) => {
          toast.error(`😞 Error RSVPing`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setEmaill('');
          setLoading(false);
        }
      );
  };
  const isButtonDisabled = !emaill;
  const sendConfirmationEmail = async () => {
    try {
      await emailjs.send(
        'service_y5895d8',
        'template_tex7dqr',
        {
          to_email: emaill,
          from_name: course?.courseName,
        },
        'bcyUUGHEE-8frwK2g'
      );
      console.log('Confirmation email sent');
    } catch (error) {
      console.log('Failed to send confirmation email:', error);
    }
  };
  return (
    <div className="hayze ">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 mb-5">
            <div>
              <div className="webDesc">Webinar Description</div>
              <div className="qurd">{course?.description}</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-5">
            <div>
              <div className="webDesc">Book this webinar</div>
              <div className="wie">
                <div className="gki">
                  <form ref={form} onSubmit={sendEmail}>
                    <div>
                      <div className="ewhat">Email</div>
                      <input
                        type="email"
                        className="dotnet"
                        name="email"
                        value={emaill}
                        onChange={(e) => setEmaill(e.target.value)}
                      />
                      <input
                        type="name"
                        className="dotnet mt-4"
                        name="to_name"
                        value={course?.courseName}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        className={`rsvp_button ${
                          isButtonDisabled ? 'disabledcvf' : ''
                        }`}
                        disabled={isButtonDisabled}
                        type="submit"
                        value="Send"
                      >
                        {loading ? (
                          <CircularProgress
                            style={{
                              color: 'white',
                              height: '30px',
                              width: '30px',
                            }}
                          />
                        ) : (
                          ' RSVP this Webinar'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-5 mt-4">
            <div>
              <div className="webDesc mb-4">About Host</div>
              <div className="mb-4">
                <div className="yemi">
                  <div className="cirue">
                    <img
                      src={course?.selectedTutorImage || y}
                      alt=""
                      className="cirue"
                    />
                  </div>
                  <div className="left">
                    <div className="sly">{course?.tutorName}</div>
                    <div className="pot">{course?.hostOccupation}</div>
                  </div>
                </div>
              </div>
              <div className="qurd">{course?.aboutHost}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <UpcomingWebinar />
      </div>
    </div>
  );
};

export default DetailsDownPart;
