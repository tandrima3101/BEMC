import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../src/layouts/Layout";
import VideoPopup from "../../src/components/VideoPopup";
import Ratings from '../../src/components/ratings'
import TicketIssueModal from "../../src/components/ticketIssueModal";
import GiveReviewModal from "../../src/components/giveReviewModal";
import { callApi } from "../../src/apiHandlers/callApi";

const Booking = () => {

  const [video, setVideo] = useState(false);
  const [activeModalThree, setActiveModalThree] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(false);
  const [bookingList, setBookingLiast] = useState([])
  const [ramlingamData, setRamlingamData] = useState([])

  let temp =[];
  const getBookingRequest = async () => {
    let getBookingData = {
      method: 'get',
      url: "ramalingampark/booking/getAllBookingPopulated",
    }
    let response = await callApi(getBookingData)
    console.log(response.data.data, 'responseeeeeeee')
    if (response.status == 200) {
      setBookingLiast(response.data.data)
      response.data.data.map(async (x) => {
        let getBookingData = {
          method: 'post',
          url: "ramalingampark/event/getEventByEventId",
          data: {
            eventId: x.bookingRequest.eventId
          }
        }
        let response = await callApi(getBookingData)
        console.log(response,'response')
        setRamlingamData([...ramlingamData,{image:response.data.data.banner.bannerImageUrl,eventId:response.data.data.eventId}])
      })
    }
  }
  console.log(ramlingamData)

  useEffect(() => {
    getBookingRequest()
  }, [])
  console.log(bookingList, 'listt')
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
          {bookingList.map((bookings, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                  <div className="booking-card p-3">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row booking-card-left">
                          <div className="col-lg-4 d-flex justify-content-center">
                            <img
                              src={ramlingamData[0]?.image}
                              alt="bookedshow"
                              className="bookingImage"
                            />
                          </div>
                          <div className="col-lg-8 pl-0">
                            <div className="ticket-details">
                              <h4>{bookings.bookingRequest.eventName}</h4>
                              <p className="m-0">{bookings.bookingRequest.ticketSource} BOOKING</p>
                              <p className="m-0">
                                <i className="ti-time mr-2"></i>
                                {bookings.bookingRequest.selectedTime}
                              </p>
                              <p className="m-0 mb-2">
                                <i className="ti-calendar mr-2"></i>
                                {bookings.bookingRequest.selectedDate}
                              </p>
                              <h6>
                                <i className="ti-ticket mr-2"></i>
                                <b>Number of Tickets :</b>
                                <span>{bookings.bookingRequest.adultNum} Adults & {bookings.bookingRequest.childNum} Child</span>
                              </h6>
                              <h6>
                                <i className="ti-ticket mr-2"></i>
                                <b>Seat Category :</b>
                                <span>{bookings.bookingRequest.selectedSeatCategory} </span>
                              </h6>
                              <div className="row d-flex justify-content-between">
                                <span className="p-0">Ticket Price</span>
                                <span className="p-0">
                                  Rs. {bookings.account.netAmount}
                                </span>
                              </div>
                              <div className="row d-flex justify-content-between">
                                <span className="p-0">Convenience Price</span>
                                <span className="p-0">
                                  Rs. {bookings.account.amount}
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
                            <b>Rs. {bookings.account.amount}</b>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 qr-section">
                        <img src={bookings.bookingRequest.qrUrl} />
                        <hr />
                        <span>{bookings.bankTransaction.status}</span>
                        <h5 className="text-center">
                          <b>{bookings.account.bookingId}</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 d-flex flex-column justify-content-center">
                  <h4 className="text-center mt-4 mb-6">Rate Us</h4>
                  <Ratings size='50' align='center' rating={5} canHover='false' />
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
