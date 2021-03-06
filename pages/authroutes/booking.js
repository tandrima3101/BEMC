import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../src/layouts/Layout";
import VideoPopup from "../../src/components/VideoPopup";
import Ratings from '../../src/components/ratings'
import TicketIssueModal from "../../src/components/ticketIssueModal";
import GiveReviewModal from "../../src/components/giveReviewModal";
import { callApi } from "../../src/apiHandlers/callApi";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import SeeAllReviewModal from "../../src/components/seeallreviewModal";
import PreLoader from "../../src/components/PreLoader";

const Booking = () => {

  const [video, setVideo] = useState(false);
  const [activeModalThree, setActiveModalThree] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(false);
  const [ramlingamBookingList, setRamlingamBookingList] = useState([])
  const [townhallBookingList, setTownhallBookingList] = useState([])
  const [ramlingamData, setRamlingamData] = useState(false)
  const [townhallData, settownhallData] = useState(false)
  const [kalyanmandapList, setKalyanmandapList] = useState([])
  const [kalyanmandapData, setKalyanmandapData] = useState(false)
  const [eventId, setEventId] = useState(null)
  const [eventIdForList, setEventIdForList] = useState(null)
  const [eventIdForGrievance,setEventIdForGrievance] = useState(null)
  const [parentEventIdForGrievance,setParentEventIdForGrievance] = useState(null)
  const [reviewListModal, setReviewListModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const reviewedItem = localStorage.getItem("reviewedItem")
  const [isReviewed, setIsReviewed] = useState(JSON.parse(reviewedItem))
  useEffect(() => {

    if (ramlingamData && kalyanmandapData && townhallData) {
      setIsLoaded(true)
    }

  }, [ramlingamData, townhallData, kalyanmandapData])

  const closeReviewMOdal = (data) => {
    setActiveModalReview(data)
  }
  const closeReviewListMOdal = (data) => {
    setReviewListModal(data)
  }
  const getRamlingamBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "ramalingampark/booking/getAllBookingPopulated",
    }
    let response = await callApi(getBookingData)
    if (response.status == 200) {
      setRamlingamBookingList(response.data.data.bookingDetails)
      let ramlingamArray = response.data.data.bookingDetails
      const tempArr = [];
      for (let i = 0; i < response.data.data.bookingDetails.length; i++) {
        let getBookingData = {
          method: 'post',
          url: "ramalingampark/event/getEventByEventId",
          data: {
            eventId: ramlingamArray[i].eventId
          }
        }
        let response = await callApi(getBookingData)
        let getBookingReviewData = {
          method: 'post',
          url: "ramalingampark/event/getReview",
          data: {
            eventId: ramlingamArray[i].eventId
          }
        }
        let responseReview = await callApi(getBookingReviewData)
        // console.log(responseReview, 'response for review')
        let avgReview = 0;
        responseReview.data.data.map((x) =>
          avgReview = (avgReview + Math.round(x.rating))
        )
        console.log(responseReview.data.data.length, 'lengthhhhhhhhhh')
        tempArr.push({ image: response.data.data?.banner.bannerImageUrl, eventId: response.data.data?.eventId, eventName: response.data.data?.eventName, rating: Math.round(avgReview / responseReview.data.data.length) })
      }
      setRamlingamData(tempArr)
    }
  }
  console.log(ramlingamBookingList,'ramlingam')
  const getTownhallBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "townhall/booking/getAllBookingPopulated",
    }
    let response = await callApi(getBookingData)
    if (response.status == 200) {
      setTownhallBookingList(response.data.data.bookingDetails)
      let townhallArray = response.data.data.bookingDetails
      const tempArr = [];
      for (let i = 0; i < response.data.data.bookingDetails.length; i++) {
        let getBookingData = {
          method: 'post',
          url: "townhall/createTownhall/getTownhallByTownhallId",
          data: {
            townhallId: townhallArray[i].townhallId
          }
        }
        let response = await callApi(getBookingData)
        let getBookingReviewData = {
          method: 'post',
          url: "ramalingampark/event/getReview",
          data: {
            eventId: townhallArray[i].townhallId
          }
        }
        let responseReview = await callApi(getBookingReviewData)
        // console.log(responseReview, 'response for review')
        let avgReview = 0;
        responseReview.data.data.map((x) =>
          avgReview = (avgReview + Math.round(x.rating))
        )
        tempArr.push({ image: response.data.data?.banner.bannerImageUrl, eventId: response.data.data?.townhallId, eventName: response.data.data?.townhallName, rating: Math.round(avgReview / responseReview.data.data.length) })
      }
      settownhallData(tempArr)
    }
  }
  const getKalyanmandapBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "kalyanMandap/booking/getAllBookingPopulated",
    }
    let response = await callApi(getBookingData)
    if (response.status == 200) {
      setKalyanmandapList(response.data.data.bookingDetails)
      let mandapArray = response.data.data.bookingDetails
      const tempArr = [];
      for (let i = 0; i < response.data.data.bookingDetails.length; i++) {
        let getBookingData = {
          method: 'post',
          url: "kalyanMandap/createKalyanMandap/getMandapByMandapId",
          data: {
            mandapId: mandapArray[i].mandapId
          }
        }
        let response = await callApi(getBookingData)
        let getBookingReviewData = {
          method: 'post',
          url: "ramalingampark/event/getReview",
          data: {
            eventId: mandapArray[i].mandapId
          }
        }
        let responseReview = await callApi(getBookingReviewData)
        console.log(responseReview, 'response for review')
        let avgReview = 0;
        responseReview.data.data.map((x) =>
          avgReview = (avgReview + Math.round(x.rating))
        )
        console.log(avgReview, 'avggggggggggggg')
        tempArr.push({ image: response.data.data?.banner.bannerImageUrl, eventId: response.data.data?.mandapId, eventName: response.data.data?.mandapName, rating: Math.round(avgReview / responseReview.data.data.length) })
      }
      setKalyanmandapData(tempArr)
      // setIsLoaded(true)
    }
  }
  const activeModalFunctionThree = (data) => {
    setActiveModalThree(data);
  }
  useEffect(() => {
    getRamlingamBookingRequest()
    getTownhallBookingRequest()
    getKalyanmandapBookingRequest()
  }, [])

  return (
    (!isLoaded) ?
      <PreLoader /> :
      <Layout>
        {video && <VideoPopup close={setVideo} />}
        <div className="container-fluid light-bg pt-4 pb-4">
          <div className="row">
            <div className="col-lg-10 pr-4 mx-auto">
              <Accordion preExpanded={['ramlingamPark']} allowZeroExpanded>
                <AccordionItem uuid="ramlingamPark">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Ramlingam Park</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {ramlingamBookingList.map((bookings, index) => {
                      return (
                        <div className="row" key={ramlingamData.eventId}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={ramlingamData[index]?.image}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings.booking.eventName}</h4>
                                        <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          {bookings.selectedTime}
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          {bookings.selectedDate}
                                        </p>
                                        {(bookings.adultNum || bookings.childNum) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          <b>Number of Tickets :</b>
                                          <span>{bookings.adultNum} Adults & {bookings.childNum} Child</span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          <b>Seat Category :</b>
                                          <span>{bookings.selectedSeatCategory} </span>
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
                                      <b>Rs. {bookings.account.amount + bookings.account.netAmount}</b>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-4 qr-section">
                                  <img src={bookings.qrUrl} />
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
                            <Ratings size='50' align='center' rating={ramlingamData[index]?.rating} canHover={false} />
                            <p></p>
                            {isReviewed ? isReviewed.includes(ramlingamData[index].eventId) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index].eventId) }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index].eventId) }}>Give a small review</button>
                            </div>}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(ramlingamData[index].eventId) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={()=>{setActiveModalThree(!activeModalThree),setEventIdForGrievance(bookings.bookingRequestId),setParentEventIdForGrievance(bookings._id)}}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalThree} />
                          <GiveReviewModal activeReview={activeModalReview} eventId={eventId} closeReviewMOdal={closeReviewMOdal} />
                          <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="townhall">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Townhall</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {townhallBookingList.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={townhallData[index]?.image}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings.booking.eventName}</h4>
                                        <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          {bookings.selectedTime}
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          {bookings.selectedDate}
                                        </p>
                                        {(bookings.adultNum || bookings.childNum) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          <b>Number of Tickets :</b>
                                          <span>{bookings.adultNum} Adults & {bookings.childNum} Child</span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          Townhall :
                                          <span><b>{townhallData[index]?.eventName} </b></span>
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
                                  <img src={bookings.qrUrl} />
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
                            <Ratings size='50' align='center' rating={townhallData[index]?.rating} canHover={false} />
                            {isReviewed ? isReviewed.includes(townhallData[index].eventId) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(townhallData[index].eventId) }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(townhallData[index].eventId) }}>Give a small review</button>
                            </div>}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(townhallData[index].eventId) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={()=>{setActiveModalThree(!activeModalThree),setEventIdForGrievance(bookings.bookingRequestId),setParentEventIdForGrievance(bookings._id)}}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalThree} />
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="kalyanMandap">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Kalyan Mandap</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {kalyanmandapList.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left">
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={kalyanmandapData[index]?.image}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings.booking.eventName}</h4>
                                        <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          {bookings.selectedTime}
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          {bookings.selectedDate}
                                        </p>
                                        {(bookings.adultNum || bookings.childNum) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          <b>Number of Tickets :</b>
                                          <span>{bookings.adultNum} Adults & {bookings.childNum} Child</span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          Kalyan Mandap :
                                          <span><b>{bookings.mandapName}</b> </span>
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
                                  <img src={bookings.qrUrl} />
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
                            <Ratings size='50' align='center' rating={kalyanmandapData[index]?.rating} canHover={false} />
                            {isReviewed ? isReviewed.includes(kalyanmandapData[index].eventId) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(kalyanmandapData[index].eventId) }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(kalyanmandapData[index].eventId) }}>Give a small review</button>
                            </div>}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(kalyanmandapData[index].eventId) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={()=>{setActiveModalThree(!activeModalThree),setEventIdForGrievance(bookings.bookingRequestId),setParentEventIdForGrievance(bookings._id)}}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalFunctionThree} activeModal={activeModalThree} eventId={eventIdForGrievance} parentEventId={parentEventIdForGrievance}/>
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default Booking;
