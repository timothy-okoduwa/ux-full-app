import React from 'react';

const Suggestions = () => {
  return (
    <div className="pass-na">
      <div className="backfi">
        <div className="container">
          <div className="pasr">
            <div className="row">
              <div className="col-12 col-lg-6 mb-5 eleke">
                <div className='tablee'>
                  <div className="ght">
                    Send us suggestions of courses or topics{' '}
                  </div>
                  <div className="in-my-mind">
                    Don’t see what you're looking for? No problem. Fill out this
                    form and let us know. We're always cooking up something new.
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div>
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-4">
                      <div className="fn">First Name</div>
                      <div className="mt-3">
                        <input
                          type="text"
                          className="puhh"
                          placeholder="First Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-4">
                      <div className="fn">Last Name</div>
                      <div className="mt-3">
                        <input
                          type="text"
                          className="puhh"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div className="fn">Email</div>
                      <div className="mt-3">
                        <input
                          type="email"
                          className="puhh"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="fn">What were you looking for?</div>
                      <div className="mt-3">
                        <textarea
                          type="email"
                          className="puhh"
                          placeholder="Message"
                          style={{ height: '170px', paddingTop: '30px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <button className='sub'>submit</button>
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

export default Suggestions;
