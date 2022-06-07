import React from 'react'
import Link from "next/link";

function ShowsList(props) {
  return (
    <section className="listing-grid-area pt-115 pb-75">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-75">
                <h2>Shows List </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {props.list.map((show) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="listing-item listing-grid-one mb-45">
                    <div className="listing-thumbnail">
                      <img src={show.imgUrl} alt="Listing Image" style={{height : "300px", objectFit : "cover", width : "100%"}}/>
                      {show.featured ? (
                        <span className="featured-btn">Featured</span>
                      ) : (
                        <span className="featured-btn featured-btn-transparent"></span>
                      )}
                      <Link href="#">
                        <div className="thumbnail-meta d-flex justify-content-between align-items-center">
                          <div className="meta-icon-title d-flex align-items-center">
                            <div className="icon">
                              <i className="flaticon-chef"></i>
                            </div>
                            <div className="title">
                              <h6>{show.buttonName}</h6>
                            </div>
                          </div>
                          <img
                            src="assets/images/right-arrow.png"
                            style={{ height: "32px", width: "32px" }}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="listing-content">
                      <h3 className="title">
                        <Link href="/listing-details-1">
                          <a>{show.showName}</a>
                        </Link>
                      </h3>
                      <div className="ratings">
                        <ul className={`ratings ${show.reviews}`}>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li>
                            <span>
                              <a href="#">({show.reviewNumber} Reviews)</a>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <span className="price">{show.Price}</span>
                      {show.contactNumber ? (
                        <span
                          className="phone-meta"
                          style={{ margin: "0px 5px 12px 0px" }}
                        >
                          <i className="ti-tablet"></i>
                          <a href="tel:+982653652-05">{show.contactNumber}</a>
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <div className="listing-meta">
                        <ul>
                          {show.location ? (
                            <li>
                              <span>
                                <i className="ti-location-pin"></i>
                                {show.location}
                              </span>
                            </li>
                          ) : (
                            <li></li>
                          )}

                          <li>
                            <span>
                              <i className="ti-star"></i>
                              <a href="#">Rate Us</a>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
  )
}

export default ShowsList