import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { AiFillFastForward, AiOutlineDelete, AiOutlineMobile } from 'react-icons/ai';
import Layout from "../../src/layouts/Layout";
import VideoPopup from "../../src/components/VideoPopup";
import { callApi } from "../../src/apiHandlers/callApi";
import { Badge } from "react-bootstrap";


const MyComplains = () => {
  const [video, setVideo] = useState(false);
  const [activeModalThree, setActiveModalThree] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(false);
  const [bookingRDetails, setBookingDetails] = useState(null)
  var currentDate = new Date();
  var d = currentDate.getDate()
console.log(d,'currentDate')
  const getAllGrievances = async () => {
    let dataForGrievance = {
      method: 'post',
      url: 'admin/grievacnes/getGrievance'
    }
    let response = await callApi(dataForGrievance)
    console.log(response.data.data.grievances, 'GRIEVANCESSSSSSSSSSS')
    setBookingDetails(response.data.data.grievances)
  }

  useEffect(async () => {
    getAllGrievances()
    localStorage.setItem('lastEscalationDate',JSON.stringify(currentDate))
    }, [])

  const bookingDetails = [
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      date: "01-0602022",
      mobile: '9090909090',
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
      btnText: 'Completed',
      icon: <i className="ti-check" style={{ fontSize: '1rem' }}></i>,
      color: '#fff',
      escalateText: 'Escalate',
      background: '#3bacb6'
    },
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      mobile: '9090909090',
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
      color: '#111',
      btnText: 'Pending',
      icon: <i className="ti-time" style={{ fontSize: '1rem', fontWeight: 'bold' }}></i>,
      background: '#ffd74e',
      escalateText: 'Escalated'
    },
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      mobile: '9090909090',
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      icon: <AiOutlineDelete style={{ fontSize: '1rem', fontWeight: 'bold' }} />,
      color: '#fff',
      totalPrice: 340.0,
      btnText: 'Cancelled',
      background: '#ff344f',
      escalateText: 'Escalate'
    },
  ];

  const activeModalFunctionThree = () => {
    setActiveModalThree(!activeModalThree);
  }

  const activeModalFunctionReview = () => {
    setActiveModalReview(!activeModalReview);
  }

  const handleEscalation = async () =>{
    var lastDate=await localStorage.getItem('lastEscalationDate')
    // console.log(lastDate,'datesssssssssss')
    // var diffInTime=currentDate.getTime() - lastDate.getTime()
    // var diffInDays=diffInTime/(1000 * 3600 * 24)
    // console.log(diffInDays,'diffffffffff')
  }
  return (
    <Layout>
      {/* <Ratings/> */}
      {video && <VideoPopup close={setVideo} />}
      <div className="service">
        <div className="container-fluid light-bg pt-4 pb-4">
          {(bookingRDetails?.length > 0) ?
            bookingRDetails?.map((bookings, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                    <div className="booking-card p-3">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="row booking-card-left">
                            <div className="col-lg-4 d-flex justify-content-center align-items-center">
                              <img
                                src='/assets/images/ticket-complain.png'
                                alt="bookedshow"
                                className="bookingImage"
                              />
                            </div>
                            <div className="col-lg-8 pl-0">
                              <div className="d-flex justify-content-between">
                                <div className="ticket-details  d-flex flex-column">
                                  <h5 className="m-0 mb-2">
                                    <AiOutlineMobile /> &nbsp;
                                    <b>{bookings.bookingRequestParentId.phoneNumber}</b>
                                  </h5>
                                  <h5 className="m-0 mb-2 text-center">
                                    {bookings.bookingRequestId}
                                  </h5>
                                </div>
                                <div className="ticket-details d-flex justify-content-between flex-column">
                                  <h5 className="m-0 text-center">
                                    {bookings.bookingRequestParentId.eventName}
                                  </h5>
                                  <h5 className="text-center m-0 mb-2">
                                    <b>{bookings.bookingRequestParentId.eventId}</b>
                                  </h5>
                                </div>
                              </div>
                              <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                {bookings.complain}
                              </p>
                            </div>
                          </div>

                        </div>
                        <div className="col-lg-3 qr-section">
                          <img src={bookings.bookingRequestParentId.qrUrl} />
                          <hr />
                          <h5 className="text-center">
                            <b>{bookings.bookingRequestId}</b>
                          </h5>
                        </div>
                        <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                          {bookings.status === 'Escalated' && <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                          }
                          {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                          }
                          {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                          }
                          <p style={{ textAlign: 'justify', marginTop: '1rem' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                          </p>
                          {
                            bookings.status === 'Escalated' && <div className="d-flex flex-column text-center">
                              <h6 className="mt-1">Escalated 2 Days ago</h6>
                              <h6 className="mt-1 mb-1">Minimum 7 Days required to Reescalate</h6>
                            </div>
                          }
                          <button className="d-flex justify-content-center main-btn mt-2" id="escalate-btn" onClick={()=>{handleEscalation()}}>ESCALATE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            : <h5>No Complains yet</h5>}
        </div>
      </div>
    </Layout>
  );
}

export default MyComplains;
