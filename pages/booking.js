import React, { useState } from "react";
import Link from "next/link";
import Layout from "../src/layouts/Layout";
import VideoPopup from "../src/components/VideoPopup";
import Ratings from '../src/components/ratings'
import TicketIssueModal from "../src/components/ticketIssueModal";
import GiveReviewModal from "../src/components/giveReviewModal";

const Booking=()=> {
  const [video, setVideo] = useState(false);
  const [activeModalThree, setActiveModalThree] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(false);

  const bookingDetails = [
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
    },
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
    },
  ];

  const activeModalFunctionThree = () => {
    setActiveModalThree(!activeModalThree);
  }

  const activeModalFunctionReview = () => {
    setActiveModalReview(!activeModalReview);
  }

  return (
    <Layout>
      {/* <Ratings/> */}
      {video && <VideoPopup close={setVideo} />}
      <div className="service">
        <div className="container-fluid light-bg pt-4 pb-4">
          {bookingDetails.map((bookings,index) => {
            return (
              <div className="row" key={index}>
                <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                  <div className="booking-card p-3">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row booking-card-left">
                          <div className="col-lg-4 d-flex justify-content-center">
                            <img
                              src={bookings.bookingImgUrl}
                              alt="bookedshow"
                              className="bookingImage"
                            />
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="ticket-details">
                              <h4>{bookings.showName}</h4>
                              <p className="m-0">{bookings.hallName}</p>
                              <p className="m-0">
                                <i className="ti-time mr-2"></i>
                                {bookings.time}
                              </p>
                              <p className="m-0 mb-2">
                                <i className="ti-calendar mr-2"></i>
                                {bookings.date}
                              </p>
                              <h6>
                                <i className="ti-ticket mr-2"></i>
                                <b>Number of Tickets :</b>
                                <span>{bookings.count}</span>
                              </h6>
                              <h6>
                                <b>seatNumber</b>
                              </h6>
                              <div className="row d-flex justify-content-between">
                                <span className="p-0">Ticket Price</span>
                                <span className="p-0">
                                  Rs. {bookings.ticketPrice}
                                </span>
                              </div>
                              <div className="row d-flex justify-content-between">
                                <span className="p-0">Convenience Price</span>
                                <span className="p-0">
                                  Rs. {bookings.conveniencePrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="booking-card-left" />
                        <div
                          className="d-flex justify-content-between"
                          style={{ padding: "20px 0px 0px 30px" }}
                        >
                          <h5>
                            <b>Total Price</b>
                          </h5>
                          <span>
                            <b>Rs. {bookings.totalPrice}</b>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 qr-section">
                        <img src="assets/images/qrcode.jpg" />
                        <hr />
                        <span>Still Available</span>
                        <h5 className="text-center">
                          <b>T2ADRTY</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 d-flex flex-column justify-content-center">
                  <h4 className="text-center mt-4 mb-6">Rate Us</h4>
                  <Ratings size='50' align='center' rating={5} canHover='false'/>
                  <div className="review-link">
                    <button onClick={() => activeModalFunctionReview()}>Give a small review</button>
                  </div>
                  <div className="review-link">
                    <button onClick={() => activeModalFunctionThree()}>Having issue with this ticket?</button>
                  </div>

                </div>
                  <TicketIssueModal activeThree={activeModalThree} />
                  <GiveReviewModal activeReview={activeModalReview} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Booking;
