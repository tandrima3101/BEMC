import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { setRoutingData } from "../../src/utils";

const Booking = () => {
  const [video, setVideo] = useState(false);
  const [activeModalThree, setActiveModalThree] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(false);
  const [ramlingamBookingList, setRamlingamBookingList] = useState([])
  const [arenaBookingList, setArenaBookingList] = useState([])
  const [townhallBookingList, setTownhallBookingList] = useState([])
  const [kalyanmandapList, setKalyanmandapList] = useState([])
  const [ambulanceList, setAmbulanceList] = useState([])
  const [hearseList, setHearseList] = useState([])
  const [arenaList, setArenaList] = useState([])
  const [eventId, setEventId] = useState(null)
  const [eventIdForList, setEventIdForList] = useState(null)
  const [eventIdForGrievance, setEventIdForGrievance] = useState(null)
  const [parentEventIdForGrievance, setParentEventIdForGrievance] = useState(null)
  const [reviewListModal, setReviewListModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(true)
  const [eventDepartment, setEventDepartment] = useState(null)


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
    }
  }
  const getSportsArenaBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllBookingRequestPopulated",
    }
    let response = await callApi(getBookingData)
    if (response.status == 200) {
      setArenaBookingList(response.data.data)
    }
  }
  const getTownhallBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "townhall/booking/getAllBookingPopulated",
    }
    let response = await callApi(getBookingData)
    if (response.status == 200) {
      setTownhallBookingList(response.data.data.bookingDetails)
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
    }
  }
  const getAmbulanceBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "ambulance/ambulance/getAllBookingRequest",
      data: {
        departmentName: "ambulance"
      }
    }
    let response = await callApi(getBookingData)
    if (response.status === 200) {
      console.log('ambulance')
      setAmbulanceList(response.data.data)
    }
  }
  const getHearseBookingRequest = async () => {
    let getBookingData = {
      method: 'post',
      url: "harse/harse/getAllBookingRequest",
      data: {
        departmentName: "harse"
      }
    }
    let response = await callApi(getBookingData)
    if (response.status === 200) {
      console.log('ambulance')
      setHearseList(response.data.data)
    }
  }
  const activeModalFunctionThree = (data) => {
    setActiveModalThree(data);
  }

  var current = new Date()
  console.log(current, 'current')
  useEffect(() => {
    getRamlingamBookingRequest()
    getTownhallBookingRequest()
    getKalyanmandapBookingRequest()
    getAmbulanceBookingRequest()
    getSportsArenaBookingRequest()
    getHearseBookingRequest()
  }, [])
  useEffect(() => {
    console.log(ambulanceList, '222222')
  }, [ambulanceList])

  const formatDate = (value) => {
    return moment(value).format('DD-MMM-YYYY');
  }
  const handleAmbulancePayment = (data) => {
    let bookings = {
      idBookingRequest: data?.booking?.bookingRequest,
      idBooking: data?.booking?._id,
      department: data.department
    }
    setRoutingData(bookings, "../payment")
  }
  let url
  const gotoBookingDetails = async (bookingDetails) => {
    setRoutingData(bookingDetails, '/authroutes/booking-specific-details')
  }

  return (
    !isLoaded ?
      <PreLoader /> :
      <Layout>
        {video && <VideoPopup close={setVideo} />}
        <div className="container-fluid light-bg pt-4 pb-4">
          <div className="row">
            <div className="col-lg-10 pr-4 mx-auto">
              <Accordion allowZeroExpanded className="booking-accordian">
                <AccordionItem uuid="ramlingamPark">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Ramlingam Park</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {
                      ramlingamBookingList?.length == 0 ? <h6>No Bookings for Ramlingam Park</h6> :
                        ramlingamBookingList?.map((bookings, index) => {
                          return (
                            <div className="row" key={bookings.eventId[0].eventId}>
                              <div className="col-lg-9 pr-4" key={bookings.bookingId} style={{ cursor: 'pointer' }} onClick={() => gotoBookingDetails(bookings)}>
                                <div className="booking-card p-3">
                                  <div className="row">
                                    <div className="col-lg-8">
                                      <div className="row booking-card-left">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                          <img
                                            src={bookings.eventId[0].banner.bannerImageUrl}
                                            alt="bookedshow"
                                            className="bookingImage"
                                          />
                                        </div>
                                        <div className="col-lg-8 pl-0">
                                          <div className="ticket-details">
                                            <h4>{bookings.eventId[0].eventName}</h4>
                                            <p className="m-0">{bookings?.ticketSource} BOOKING</p>
                                            <p className="m-0">
                                              <i className="ti-time mr-2"></i>
                                              {bookings?.selectedTime}
                                            </p>
                                            <p className="m-0 mb-2">
                                              <i className="ti-calendar mr-2"></i>
                                              {bookings?.selectedDate}
                                            </p>
                                            {(bookings?.adultNum || bookings?.childNum) && <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Number of Tickets :</b>
                                              <span>{bookings?.adultNum} Adults & {bookings?.childNum} Child</span>
                                            </h6>}
                                            <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Seat Category :</b>
                                              <span>{bookings?.selectedSeatCategory} </span>
                                            </h6>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Ticket Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.netAmount}
                                              </span>
                                            </div>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Convenience Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.amount}
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
                                          <b>Rs. {bookings?.account[0]?.amount + bookings?.account[0]?.netAmount}</b>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 qr-section">
                                      <img src={bookings?.qrUrl} />
                                      <hr />
                                      <span>{bookings?.bankTransaction[0]?.status}</span>
                                      <h5 className="text-center">
                                        <b>{bookings?.account[0]?.bookingId}</b>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 d-flex flex-column justify-content-center">
                                <Ratings size='50' align='center' rating={bookings.eventId[0].reviewAvg} canHover={false} />
                                {/* {isReviewed ? isReviewed.includes(ramlingamData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                  <span className="d-flex align-item-center main-btn btn-success">
                                    <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                    <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                  </span>
                                </div> : <div className="review-link mt-2">
                                  <button onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div> : <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div>} */}
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings.eventId[0].eventId) }}>See all Reviews</button>
                                </div>
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                                </div>
                              </div>
                              <GiveReviewModal activeReview={activeModalReview} eventId={eventId} closeReviewMOdal={closeReviewMOdal} department={eventDepartment} />
                              <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
                            </div>
                          );
                        })
                    }
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="townhall">
                  <AccordionItemHeading onClick={() => getTownhallBookingRequest()}>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Townhall</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {
                      townhallBookingList?.length == 0 ? <h6>No Bookings for Townhall</h6> :
                        townhallBookingList?.map((bookings, index) => {
                          return (
                            <div className="row" key={bookings.townhallId[0].townhallId}>
                              <div className="col-lg-9 pr-4" key={bookings.bookingId} style={{ cursor: 'pointer' }} onClick={() => gotoBookingDetails(bookings)}>
                                <div className="booking-card p-3">
                                  <div className="row">
                                    <div className="col-lg-8">
                                      <div className="row booking-card-left">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                          <img
                                            src={bookings?.townhallId[0].banner.bannerImageUrl}
                                            alt="bookedshow"
                                            className="bookingImage"
                                          />
                                        </div>
                                        <div className="col-lg-8 pl-0">
                                          <div className="ticket-details">
                                            <h4>{bookings.townhallId[0].townhallName}</h4>
                                            <p className="m-0">{bookings?.ticketSource} BOOKING</p>
                                            <p className="m-0">
                                              <i className="ti-time mr-2"></i>
                                              {bookings?.selectedTime}
                                            </p>
                                            <p className="m-0 mb-2">
                                              <i className="ti-calendar mr-2"></i>
                                              {bookings?.selectedDate}
                                            </p>
                                            {(bookings?.adultNum || bookings?.childNum) && <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Number of Tickets :</b>
                                              <span>{bookings?.adultNum} Adults & {bookings?.childNum} Child</span>
                                            </h6>}
                                            <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Selected Venue :</b>
                                              <span>{bookings?.townhallId[0].townhallName} </span>
                                            </h6>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Ticket Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.netAmount}
                                              </span>
                                            </div>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Convenience Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.amount}
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
                                          <b>Rs. {bookings?.account[0]?.amount + bookings?.account[0]?.netAmount}</b>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 qr-section">
                                      <img src={bookings?.qrUrl} />
                                      <hr />
                                      <span>{bookings?.bankTransaction[0]?.status}</span>
                                      <h5 className="text-center">
                                        <b>{bookings?.account[0]?.bookingId}</b>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 d-flex flex-column justify-content-center">
                                <Ratings size='50' align='center' rating={bookings.townhallId[0].reviewAvg} canHover={false} />
                                {/* {isReviewed ? isReviewed.includes(ramlingamData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                  <span className="d-flex align-item-center main-btn btn-success">
                                    <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                    <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                  </span>
                                </div> : <div className="review-link mt-2">
                                  <button onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div> : <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div>} */}
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings.townhallId[0].townhallId) }}>See all Reviews</button>
                                </div>
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                                </div>
                              </div>
                              <GiveReviewModal activeReview={activeModalReview} eventId={eventId} closeReviewMOdal={closeReviewMOdal} department={eventDepartment} />
                              <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
                            </div>
                          );
                        })
                    }
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="kalyanMandap">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Kalyan Mandap</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {
                      kalyanmandapList?.length == 0 ? <h6>No Bookings for Kalyan Mandap</h6> :
                        kalyanmandapList?.map((bookings, index) => {
                          return (
                            <div className="row" key={bookings.mandapId[0]?.mandapId}>
                              <div className="col-lg-9 pr-4" key={bookings.bookingId} style={{ cursor: 'pointer' }} onClick={() => gotoBookingDetails(bookings)}>
                                <div className="booking-card p-3">
                                  <div className="row">
                                    <div className="col-lg-8">
                                      <div className="row booking-card-left">
                                        <div className="col-lg-4 d-flex justify-content-center">
                                          <img
                                            src={bookings?.mandapId[0]?.banner.bannerImageUrl}
                                            alt="bookedshow"
                                            className="bookingImage"
                                          />
                                        </div>
                                        <div className="col-lg-8 pl-0">
                                          <div className="ticket-details">
                                            <h4>{bookings.mandapId[0]?.mandapName}</h4>
                                            <p className="m-0">{bookings?.ticketSource} BOOKING</p>
                                            <p className="m-0">
                                              <i className="ti-time mr-2"></i>
                                              {bookings?.selectedTime}
                                            </p>
                                            <p className="m-0 mb-2">
                                              <i className="ti-calendar mr-2"></i>
                                              {bookings?.selectedDate}
                                            </p>
                                            {(bookings?.adultNum || bookings?.childNum) && <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Number of Tickets :</b>
                                              <span>{bookings?.adultNum} Adults & {bookings?.childNum} Child</span>
                                            </h6>}
                                            <h6>
                                              <i className="ti-ticket mr-2"></i>
                                              <b>Selected Venue :</b>
                                              <span>{bookings?.mandapId[0]?.mandapName} </span>
                                            </h6>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Ticket Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.netAmount}
                                              </span>
                                            </div>
                                            <div className="row d-flex justify-content-between">
                                              <span className="p-0">Convenience Price</span>
                                              <span className="p-0">
                                                Rs. {bookings?.account[0]?.amount}
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
                                          <b>Rs. {bookings?.account[0]?.amount + bookings?.account[0]?.netAmount}</b>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-lg-4 qr-section">
                                      <img src={bookings?.qrUrl} />
                                      <hr />
                                      <span>{bookings?.bankTransaction[0]?.status}</span>
                                      <h5 className="text-center">
                                        <b>{bookings?.account[0]?.bookingId}</b>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 d-flex flex-column justify-content-center">
                                <Ratings size='50' align='center' rating={bookings.mandapId[0]?.reviewAvg} canHover={false} />
                                {/* {isReviewed ? isReviewed.includes(ramlingamData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                  <span className="d-flex align-item-center main-btn btn-success">
                                    <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                    <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                  </span>
                                </div> : <div className="review-link mt-2">
                                  <button onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div> : <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                                </div>} */}
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings.mandapId[0]?.mandapId) }}>See all Reviews</button>
                                </div>
                                <div className="review-link mt-2">
                                  <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                                </div>
                              </div>
                              <GiveReviewModal activeReview={activeModalReview} eventId={eventId} closeReviewMOdal={closeReviewMOdal} department={eventDepartment} />
                              <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
                            </div>
                          );
                        })
                    }
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="ambulance">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Ambulance</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {ambulanceList?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left" style={{ minHeight: '312px', height: 'auto' }}>
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={bookings?.ambulance?.banner?.bannerImageUrl}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings?.ambulance?.ambulanceName}</h4>
                                        <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          {bookings?.time}
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          {formatDate(bookings.date)}
                                        </p>
                                        {(bookings.from || bookings?.to) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          Journey Description :
                                          <span><b>{bookings.from} to {bookings.to}</b></span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          selected Scheme :
                                          <span><b>{bookings?.selectedScheme?.key}</b> </span>
                                        </h6>
                                        {
                                          bookings.vehicleAssigned.length > 0 &&
                                          <>
                                            <h6><b>Vehicle Description</b></h6>
                                            {
                                              bookings.vehicleAssigned.map((vehicle) => {
                                                return (
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <h6>Driver Details</h6>
                                                      <span className="ml-0"><i className="ti-user mr-2"></i>{vehicle.driverName}</span><br />
                                                      <span className="ml-0"><i className="ti-headphone mr-2"></i>{vehicle.driverPhoneNumber}</span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <h6>Vehicle Details</h6>
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleId}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleName}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleType}</span>
                                                    </div>
                                                  </div>
                                                )
                                              })
                                            }
                                          </>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <hr className="booking-card-left" />
                                </div>
                                <div className="col-lg-4 qr-section">
                                  <img src={bookings?.qrUrl} />
                                  <hr />
                                  <h5 className="text-center">
                                    <b>{bookings?.bookingRequestId}</b>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 d-flex flex-column justify-content-center">
                            {bookings.status === 'ASSIGNED' &&
                              <>
                                <span className="escalate-badge escalate-badge-success mb-4"><i className="ti-check mr-2"></i>{bookings.status}</span>
                              </>
                            }
                            {bookings.status === 'PAID PARTIALLY' &&
                              <>
                                <span className="escalate-badge escalate-badge-resolved mb-4"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                <span className="d-flex align-item-center main-btn btn-success mb-4 mx-auto" style={{ width: 'max-content' }}>
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Your Ride is CONFIRMED</h6>
                                </span>
                              </>
                            }
                            {bookings.status === 'PENDING' &&
                              <span className="escalate-badge escalate-badge-warning mb-4"><i className="ti-time mr-2"></i>{bookings.status}</span>
                            }
                            {
                              bookings.status != 'PENDING' && bookings.status != 'TRIP STARTED' && bookings.status != 'TRIP ENDED' &&
                              bookings.amountLeftToBePaid > 0 &&
                              <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Make Your Payment</button>
                            }
                            {
                              bookings.status == 'TRIP ENDED' &&
                              bookings.amountLeftToBePaid > 0 &&
                              <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Pay {bookings.amountLeftToBePaid}</button>
                            }
                            <Ratings size='50' align='center' rating={bookings?.rating} canHover={false} />
                            {/* {isReviewed ? isReviewed.includes(bookings?.event) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div>} */}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings?.eventName) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalFunctionThree} activeModal={activeModalThree} eventId={eventIdForGrievance} parentEventId={parentEventIdForGrievance} />
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="hearse">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Hearse</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {hearseList?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left" style={{ minHeight: '312px', height: 'auto' }}>
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={bookings?.harse?.banner?.bannerImageUrl}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                      {/* <p>{bookings?.ambulance?.banner}</p> */}
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings?.harse?.harseName}</h4>
                                        <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          {bookings?.time}
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          {formatDate(bookings.date)}
                                        </p>
                                        {(bookings.from || bookings?.to) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          Journey Description :
                                          <span><b>{bookings.from} to {bookings.to}</b></span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          selected Scheme :
                                          <span><b>{bookings?.selectedScheme?.key}</b> </span>
                                        </h6>
                                        {
                                          bookings.vehicleAssigned.length > 0 &&
                                          <>
                                            <h6><b>Vehicle Description</b></h6>
                                            {
                                              bookings.vehicleAssigned.map((vehicle) => {
                                                return (
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <h6>Driver Details</h6>
                                                      <span className="ml-0"><i className="ti-user mr-2"></i>{vehicle.driverName}</span><br />
                                                      <span className="ml-0"><i className="ti-headphone mr-2"></i>{vehicle.driverPhoneNumber}</span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <h6>Vehicle Details</h6>
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleId}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleName}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleType}</span>
                                                    </div>
                                                  </div>
                                                )
                                              })
                                            }
                                          </>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <hr className="booking-card-left" />
                                </div>
                                <div className="col-lg-4 qr-section">
                                  <img src={bookings?.qrUrl} />
                                  <hr />
                                  <h5 className="text-center">
                                    <b>{bookings?.bookingRequestId}</b>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 d-flex flex-column justify-content-center">
                            {bookings.status === 'ASSIGNED' &&
                              <>
                                <span className="escalate-badge escalate-badge-success mb-4"><i className="ti-check mr-2"></i>{bookings.status}</span>
                              </>
                            }
                            {bookings.status === 'PAID PARTIALLY' &&
                              <>
                                <span className="escalate-badge escalate-badge-resolved mb-4"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                <span className="d-flex align-item-center main-btn btn-success mb-4 mx-auto" style={{ width: 'max-content' }}>
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Your Ride is CONFIRMED</h6>
                                </span>
                              </>
                            }
                            {bookings.status === 'PENDING' &&
                              <span className="escalate-badge escalate-badge-warning mb-4"><i className="ti-time mr-2"></i>{bookings.status}</span>
                            }
                            {
                              bookings.status != 'PENDING' && bookings.status != 'TRIP STARTED' && bookings.status != 'TRIP ENDED' &&
                              bookings.amountLeftToBePaid > 0 &&
                              <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Make Your Payment</button>
                            }
                            {
                              bookings.status == 'TRIP ENDED' &&
                              bookings.amountLeftToBePaid > 0 &&
                              <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Pay {bookings.amountLeftToBePaid}</button>
                            }
                            <Ratings size='50' align='center' rating={bookings?.rating} canHover={false} />
                            {/* {isReviewed ? isReviewed.includes(bookings?.event) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div>} */}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings?.eventName) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalFunctionThree} activeModal={activeModalThree} eventId={eventIdForGrievance} parentEventId={parentEventIdForGrievance} />
                        </div>
                      );
                    })}
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="sportsArena">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <h5 className="mb-0 ml-3">Sports Arena</h5>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {arenaBookingList?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-9 pr-4" key={bookings.bookingId}>
                            <div className="booking-card p-3">
                              <div className="row">
                                <div className="col-lg-8">
                                  <div className="row booking-card-left" style={{ minHeight: '312px', height: 'auto' }}>
                                    <div className="col-lg-4 d-flex justify-content-center">
                                      <img
                                        src={bookings?.sportsArena[0]?.banner?.bannerImageUrl}
                                        alt="bookedshow"
                                        className="bookingImage"
                                      />
                                      {/* <p>{bookings?.ambulance?.banner}</p> */}
                                    </div>
                                    <div className="col-lg-8 pl-0">
                                      <div className="ticket-details">
                                        <h4>{bookings?.membershipName}</h4>
                                        <p className="m-0"><b>{bookings.ticketSource}</b> BOOKING</p>
                                        <p className="m-0">
                                          <i className="ti-time mr-2"></i>
                                          Time Slot : 
                                          <b> {bookings?.selectedTime}</b>
                                        </p>
                                        <p className="m-0 mb-2">
                                          <i className="ti-calendar mr-2"></i>
                                          Start Date : 
                                          <b> {formatDate(bookings.selectedDate)}</b>
                                        </p>
                                        {(bookings.from || bookings?.to) && <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          Journey Description :
                                          <span><b>{bookings.from} to {bookings.to}</b></span>
                                        </h6>}
                                        <h6>
                                          <i className="ti-ticket mr-2"></i>
                                          selected Plan :
                                          <span><b>{bookings?.plan?.tenure?.toUpperCase()}</b> {`(Age Limit : ${bookings?.plan?.ageLimit}  Years)`}</span>
                                        </h6>
                                        <div className="row d-flex justify-content-between">
                                          <span className="p-0">Plan Price</span>
                                          <span className="p-0">
                                            Rs. {bookings?.plan?.price}
                                          </span>
                                        </div>
                                  
                                        {
                                          bookings.vehicleAssigned.length > 0 &&
                                          <>
                                            <h6><b>Vehicle Description</b></h6>
                                            {
                                              bookings.vehicleAssigned.map((vehicle) => {
                                                return (
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      <h6>Driver Details</h6>
                                                      <span className="ml-0"><i className="ti-user mr-2"></i>{vehicle.driverName}</span><br />
                                                      <span className="ml-0"><i className="ti-headphone mr-2"></i>{vehicle.driverPhoneNumber}</span>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      <h6>Vehicle Details</h6>
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleId}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleName}</span><br />
                                                      <span className="ml-0"><i className="ti-truck mr-2"></i>{vehicle.vehicleType}</span>
                                                    </div>
                                                  </div>
                                                )
                                              })
                                            }
                                          </>
                                        }
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
                                      <b>Rs. {bookings?.plan?.price}</b>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-4 qr-section">
                                  <img src={bookings?.qrUrl} />
                                  <hr />
                                  <span>{bookings?.bankTransaction[0]?.status}</span>
                                  <h5 className="text-center">
                                    <b>{bookings?.bookingRequestId}</b>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 d-flex flex-column justify-content-center">
                            <Ratings size='50' align='center' rating={bookings?.rating} canHover={false} />
                            {/* {isReviewed ? isReviewed.includes(bookings?.event) ? <div className="d-flex justify-content-center mt-2">
                              <span className="d-flex align-item-center main-btn btn-success">
                                <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                              </span>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div> : <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                            </div>} */}
                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(bookings?.eventName) }}>See all Reviews</button>
                            </div>

                            <div className="review-link mt-2">
                              <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                            </div>

                          </div>
                          <TicketIssueModal activeThree={activeModalFunctionThree} activeModal={activeModalThree} eventId={eventIdForGrievance} parentEventId={parentEventIdForGrievance} />
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
