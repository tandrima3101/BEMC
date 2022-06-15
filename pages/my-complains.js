import React, { useState } from "react";
import Link from "next/link";
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { AiFillFastForward,AiOutlineDelete, AiOutlineMobile } from 'react-icons/ai';
import Layout from "../src/layouts/Layout";
import VideoPopup from "../src/components/VideoPopup";


const MyComplains=()=> {
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
      mobile : '9090909090',
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
      btnText : 'Completed',
      icon : <i className="ti-check" style={{fontSize:'1rem'}}></i>,
      color: '#fff',
      escalateText:'Escalate',
      background : '#3bacb6'
    },
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      mobile : '9090909090',
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      totalPrice: 340.0,
      color: '#111',
      btnText : 'Pending',
      icon : <i className="ti-time" style={{fontSize:'1rem',fontWeight:'bold'}}></i>,
      background : '#ffd74e',
      escalateText:'Escalated'
    },
    {
      bookingId: 1,
      bookingImgUrl:
        "https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      showName: "Show 1",
      hallName: "Ramlingam Park",
      time: "3:40AM",
      mobile : '9090909090',
      date: "01-0602022",
      count: 5,
      seatNumber: 4,
      ticketPrice: 240.0,
      conveniencePrice: 100.0,
      icon : <AiOutlineDelete style={{fontSize:'1rem',fontWeight:'bold'}}/>,
      color: '#fff',
      totalPrice: 340.0,
      btnText : 'Cancelled',
      background : '#ff344f',
      escalateText:'Escalate'
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
                            <div className="d-flex justify-content-between">
                              <div className="ticket-details  d-flex flex-column">
                                <h4 className="m-0 mb-2">
                                  {bookings.hallName}
                                </h4>
                                <h5 className="m-0 mb-2">
                                  <AiOutlineMobile /> &nbsp;
                                  <b>{bookings.mobile}</b>
                                </h5>

                              </div>
                              <div className="ticket-details d-flex justify-content-between flex-column">
                                  <h4 className="m-0">
                                    Mo Odisha
                                  </h4>
                                  <h5 className="text-center m-0 mb-2">
                                    <b>T2ADRTY</b>
                                  </h5>
                              </div>
                            </div>
                            <p style={{textAlign: 'justify', padding :'0 1rem', borderRadius:'16px'}}>
                              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                          </div>
                        </div>
                        
                      </div>
                      <div className="col-lg-4 qr-section">
                        <img src="assets/images/qrcode.jpg" />
                        <hr />
                        <h5 className="text-center">
                          <b>T2ADRTY</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 d-flex flex-column justify-content-center">
                  <h4 className="text-center mt-4 mb-6">Status</h4>
                  <div className="d-flex justify-content-evenly justify-content-center">
                    
                    <span className={`badge badge-pill d-flex justify-content-evenly justify-content-center`} style={{background : bookings.background, color : bookings.color ,padding:'0.5rem 1rem', width:'fit-content'}}>{bookings.icon} &nbsp;&nbsp;&nbsp; {bookings.btnText}</span>
                  </div>
                  <p style={{textAlign: 'justify', marginTop : '1rem'}}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                  </p>
                  <button className="d-flex justify-content-center main-btn" disabled={bookings.escalateText === 'Escalated'}>{bookings.escalateText}</button>
                  {
                    bookings.escalateText === 'Escalated' && <div className="d-flex flex-column text-center">
                        <p className="m-0">Escalated 2 Days ago</p>
                        <p className="m-0">Minimum 7 Days required to reescalate</p>
                      </div> 
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default MyComplains;
