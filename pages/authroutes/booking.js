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
  const [townhallBookingList, setTownhallBookingList] = useState([])
  const [ramlingamData, setRamlingamData] = useState(false)
  const [townhallData, settownhallData] = useState(false)
  const [kalyanmandapList, setKalyanmandapList] = useState([])
  const [kalyanmandapData, setKalyanmandapData] = useState(false)
  const [ambulanceList, setAmbulanceList] = useState([])
  const [ambulanceData, setAmbulanceData] = useState(false)
  const [hearseList, setHearseList] = useState([])
  const [hearseData, setHearseData] = useState(false)
  const [eventId, setEventId] = useState(null)
  const [eventIdForList, setEventIdForList] = useState(null)
  const [eventIdForGrievance, setEventIdForGrievance] = useState(null)
  const [parentEventIdForGrievance, setParentEventIdForGrievance] = useState(null)
  const [reviewListModal, setReviewListModal] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [eventDepartment, setEventDepartment] = useState(null)
  const reviewedItem = localStorage.getItem("reviewedItem")
  const [isReviewed, setIsReviewed] = useState(JSON.parse(reviewedItem))

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
            eventId: ramlingamArray[i]?.eventId
          }
        }
        let response = await callApi(getBookingData)
        let getBookingReviewData = {
          method: 'post',
          url: "ramalingampark/event/getReview",
          data: {
            eventId: ramlingamArray[i]?.eventId
          }
        }
        let responseReview = await callApi(getBookingReviewData)
        let avgReview = 0;
        responseReview.data.data.map((x) =>
          avgReview = (avgReview + Math.round(x.rating))
        )
        console.log(responseReview.data.data.length, 'lengthhhhhhhhhh')
        tempArr.push({ image: response.data.data?.banner.bannerImageUrl, eventId: response.data.data?.eventId, eventName: response.data.data?.eventName, rating: Math.round(avgReview / responseReview.data.data.length) })
        console.log(tempArr, 'temppppp')
      }
      setRamlingamData(tempArr)
      setIsLoaded(true)
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
            eventId: townhallArray[i]?.townhallId
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
            eventId: mandapArray[i]?.mandapId
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
      let getAmbulanceData = {
        method: 'post',
        url: "ambulance/ambulance/getAllAmbulance",
      }
      let responseAmbulance = await callApi(getAmbulanceData)
      let getBookingReviewData = {
        method: 'post',
        url: "ramalingampark/event/getReview",
        data: {
          eventId: "AMB001"
        }
      }
      let responseReview = await callApi(getBookingReviewData)
      console.log(responseReview, 'response for review')
      let avgReview = 0;
      responseReview.data.data.map((x) =>
        avgReview = (avgReview + Math.round(x.rating))
      )
      console.log(avgReview, 'avggggggggggggg')
      console.log(responseAmbulance.data.data[0].banner.bannerImageUrl, 'ambulance')
      setAmbulanceData({ image: responseAmbulance.data.data[0].banner.bannerImageUrl, event: 'ambulance', eventName: responseAmbulance.data.data[0].ambulanceName, rating: Math.round(avgReview / responseReview.data.data.length) })
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
      let getHearseData = {
        method: 'post',
        url: "harse/harse/getAllHarse",
      }
      let responseAmbulance = await callApi(getHearseData)
      // console.log(responseAmbulance.data.data[0].banner.bannerImageUrl, 'ambulance')
      setHearseData({ image: responseAmbulance.data.data[0]?.banner?.bannerImageUrl, event: 'hearse', eventName: responseAmbulance.data.data[0]?.harseName })
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
    getHearseBookingRequest()
  }, [])
  useEffect(() => {
    console.log(ambulanceList, '222222')
  }, [ambulanceList])

  const formatDate = (value) => {
    return moment(value).format('DD-MMM-YYYY');
  }
  const handleAmbulancePayment = (data) => {
    let ambulanceData = {
      idBookingRequest: data?.booking?.bookingRequest,
      idBooking: data?.booking?._id,
      department: 'ambulance'
    }
    setRoutingData(ambulanceData, "../payment")
  }
  return (
    !isLoaded ?
      <PreLoader /> :
      <Layout>
        {video && <VideoPopup close={setVideo} />}
        <div className="container-fluid light-bg pt-4 pb-4">
          <div className="row">
            <div className="col-lg-10 pr-4 mx-auto">
              <Accordion preExpanded={['ramlingamPark']} allowZeroExpanded>
                {
                  ramlingamBookingList.length > 0 && <AccordionItem uuid="ramlingamPark">
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <h5 className="mb-0 ml-3">Ramlingam Park</h5>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      {ramlingamBookingList.map((bookings, index) => {
                        return (
                          <div className="row" key={ramlingamData?.eventId}>
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
                                          <h4>{ramlingamData[index]?.eventName}</h4>
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
                                              Rs. {bookings?.account?.netAmount}
                                            </span>
                                          </div>
                                          <div className="row d-flex justify-content-between">
                                            <span className="p-0">Convenience Price</span>
                                            <span className="p-0">
                                              Rs. {bookings?.account?.amount}
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
                                        <b>Rs. {bookings?.account?.amount + bookings?.account?.netAmount}</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 qr-section">
                                    <img src={bookings?.qrUrl} />
                                    <hr />
                                    <span>{bookings?.bankTransaction?.status}</span>
                                    <h5 className="text-center">
                                      <b>{bookings?.account?.bookingId}</b>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 d-flex flex-column justify-content-center">
                              <Ratings size='50' align='center' rating={ramlingamData[index]?.rating} canHover={false} />
                              <p></p>
                              {isReviewed ? isReviewed.includes(ramlingamData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                <span className="d-flex align-item-center main-btn btn-success">
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                </span>
                              </div> : <div className="review-link mt-2">
                                <button onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(ramlingamData[index]?.eventId), setEventDepartment('ramlingamPark') }}>Give a small review</button>
                              </div>}
                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(ramlingamData[index]?.eventId) }}>See all Reviews</button>
                              </div>

                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                              </div>

                            </div>
                            <GiveReviewModal activeReview={activeModalReview} eventId={eventId} closeReviewMOdal={closeReviewMOdal} department={eventDepartment} />
                            <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
                          </div>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                }
                {
                  townhallBookingList.length > 0 && <AccordionItem uuid="townhall">
                    <AccordionItemHeading onClick={()=>getTownhallBookingRequest()}>
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
                                          <h4>{townhallData[index]?.eventName}</h4>
                                          <p className="m-0">{bookings.ticketSource} BOOKING</p>
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
                                            Townhall :
                                            <span><b>{townhallData[index]?.eventName} </b></span>
                                          </h6>
                                          <div className="row d-flex justify-content-between">
                                            <span className="p-0">Ticket Price</span>
                                            <span className="p-0">
                                              Rs. {bookings?.account?.netAmount}
                                            </span>
                                          </div>
                                          <div className="row d-flex justify-content-between">
                                            <span className="p-0">Convenience Price</span>
                                            <span className="p-0">
                                              Rs. {bookings?.account?.amount}
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
                                        <b>Rs. {bookings?.account?.amount}</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 qr-section">
                                    <img src={bookings?.qrUrl} />
                                    <hr />
                                    <span>{bookings?.bankTransaction?.status}</span>
                                    <h5 className="text-center">
                                      <b>{bookings?.account?.bookingId}</b>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 d-flex flex-column justify-content-center">
                              <Ratings size='50' align='center' rating={townhallData[index]?.rating} canHover={false} />
                              {isReviewed ? isReviewed.includes(townhallData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                <span className="d-flex align-item-center main-btn btn-success">
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                </span>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(townhallData[index]?.eventId), setEventDepartment('townhall') }}>Give a small review</button>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(townhallData[index]?.eventId), setEventDepartment('townhall') }}>Give a small review</button>
                              </div>}
                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(townhallData[index]?.eventId) }}>See all Reviews</button>
                              </div>

                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalThree(!activeModalThree), setEventIdForGrievance(bookings.bookingRequestId), setParentEventIdForGrievance(bookings._id) }}>Having issue with this ticket?</button>
                              </div>

                            </div>
                          </div>
                        );
                      })}
                    </AccordionItemPanel>
                  </AccordionItem>
                }
                {
                  kalyanmandapList.length > 0 && <AccordionItem uuid="kalyanMandap">
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
                                          <h4>{kalyanmandapData[index]?.eventName}</h4>
                                          <p className="m-0">{bookings.ticketSource} BOOKING</p>
                                          <p className="m-0">
                                            <i className="ti-time mr-2"></i>
                                            {bookings?.selectedTime}
                                          </p>
                                          <p className="m-0 mb-2">
                                            <i className="ti-calendar mr-2"></i>
                                            {bookings?.selectedDate}
                                          </p>
                                          {(bookings.adultNum || bookings?.childNum) && <h6>
                                            <i className="ti-ticket mr-2"></i>
                                            <b>Number of Tickets :</b>
                                            <span>{bookings?.adultNum} Adults & {bookings?.childNum} Child</span>
                                          </h6>}
                                          <h6>
                                            <i className="ti-ticket mr-2"></i>
                                            Kalyan Mandap :
                                            <span><b>{bookings?.mandapName}</b> </span>
                                          </h6>
                                          <div className="row d-flex justify-content-between">
                                            <span className="p-0">Ticket Price</span>
                                            <span className="p-0">
                                              Rs. {bookings?.account?.netAmount}
                                            </span>
                                          </div>
                                          <div className="row d-flex justify-content-between">
                                            <span className="p-0">Convenience Price</span>
                                            <span className="p-0">
                                              Rs. {bookings?.account?.amount}
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
                                        <b>Rs. {bookings?.account?.amount}</b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-lg-4 qr-section">
                                    <img src={bookings?.qrUrl} />
                                    <hr />
                                    <span>{bookings?.bankTransaction?.status}</span>
                                    <h5 className="text-center">
                                      <b>{bookings?.account?.bookingId}</b>
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 d-flex flex-column justify-content-center">
                              <Ratings size='50' align='center' rating={kalyanmandapData[index]?.rating} canHover={false} />
                              {isReviewed ? isReviewed.includes(kalyanmandapData[index]?.eventId) ? <div className="d-flex justify-content-center mt-2">
                                <span className="d-flex align-item-center main-btn btn-success">
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                </span>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(kalyanmandapData[index]?.eventId), setEventDepartment('kalyanMandap') }}>Give a small review</button>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventId(kalyanmandapData[index]?.eventId), setEventDepartment('kalyanMandap') }}>Give a small review</button>
                              </div>}
                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(kalyanmandapData[index]?.eventId) }}>See all Reviews</button>
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
                }
                {
                  ambulanceList.length > 0 && <AccordionItem uuid="ambulance">
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
                                          src={ambulanceData?.image}
                                          alt="bookedshow"
                                          className="bookingImage"
                                        />
                                      </div>
                                      <div className="col-lg-8 pl-0">
                                        <div className="ticket-details">
                                          <h4>{ambulanceData?.eventName}</h4>
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
                                bookings.status == 'TRIP ENDED'  && 
                                  bookings.amountLeftToBePaid > 0 &&
                                  <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Pay {bookings.amountLeftToBePaid}</button>
                              }
                              <Ratings size='50' align='center' rating={ambulanceData?.rating} canHover={false} />
                              {isReviewed ? isReviewed.includes("AMB001") ? <div className="d-flex justify-content-center mt-2">
                                <span className="d-flex align-item-center main-btn btn-success">
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                </span>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                              </div>}
                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(ambulanceData?.eventName) }}>See all Reviews</button>
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
                }
                {
                  hearseList.length > 0 && <AccordionItem uuid="hearse">
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
                                          src={hearseData?.image}
                                          alt="bookedshow"
                                          className="bookingImage"
                                        />
                                      </div>
                                      <div className="col-lg-8 pl-0">
                                        <div className="ticket-details">
                                          <h4>{hearseData?.eventName}</h4>
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
                                bookings.status == 'TRIP ENDED'  && 
                                  bookings.amountLeftToBePaid > 0 &&
                                  <button className="main-btn mb-4 mx-auto" style={{ fontSize: '15px', width: 'max-content' }} onClick={() => handleAmbulancePayment(bookings)}>Pay {bookings.amountLeftToBePaid}</button>
                              }
                              <Ratings size='50' align='center' rating={ambulanceData?.rating} canHover={false} />
                              {isReviewed ? isReviewed.includes(ambulanceData?.event) ? <div className="d-flex justify-content-center mt-2">
                                <span className="d-flex align-item-center main-btn btn-success">
                                  <i className="ti-check" style={{ fontSize: '15px' }}></i>
                                  <h6 className='ml-2 mb-0' style={{ color: '#fff', letterSpacing: '1px' }}>Reviewed</h6>
                                </span>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                              </div> : <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setActiveModalReview(!activeModalReview), setEventDepartment('ambulance') }}>Give a small review</button>
                              </div>}
                              <div className="review-link mt-2">
                                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setReviewListModal(!reviewListModal), setEventIdForList(ambulanceData?.eventName) }}>See all Reviews</button>
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
                }
              </Accordion>
            </div>
          </div>
        </div>
      </Layout>
  );
}

export default Booking;
