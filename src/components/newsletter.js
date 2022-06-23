import React from 'react'

function Newsletter() {
  return (
    <section className="newsletter-area">
        <div className="container">
          <div
            className="newsletter-wrapper newsletter-wrapper-one bg_cover"
            style={{
              backgroundImage: `url(assets/images/bg/newsletter-bg-1.jpg)`,
            }}
          >
            <div className="row">
              <div className="col-lg-5">
                <div className="newsletter-content-box-one">
                  <div className="icon">
                    <i className="flaticon-email"></i>
                  </div>
                  <div className="content">
                    <h2>Get Whatsapp Updates</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Whatsapp Number"
                      name="email"
                      required
                    />
                    {/* <i className="ti-location-pin"></i> */}
                    <button className="main-btn">Subscribe +</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Newsletter