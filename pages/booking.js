import React, { useState } from "react";
import Link from "next/link";
import Layout from "../src/layouts/Layout";
import VideoPopup from "../src/components/VideoPopup";


function Booking() {
    const [video, setVideo] = useState(false);

    return (
        <Layout>
            {video && <VideoPopup close={setVideo} />}
            <div className="service">
                <div className="container-fluid light-bg pt-4 pb-4">
                    <div className="row">
                        <div className="col-lg-9 pr-4">
                            <div className="booking-card p-3">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <img src="https://images.unsplash.com/photo-1566159266489-6158a42c3beb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="bookedshow" className="bookingImage" />
                                            </div>
                                            <div className="col-lg-8 pl-0">
                                                <div className="ticket-details">
                                                    <h4>showName</h4>
                                                    <p className="m-0">hallName</p>
                                                    <p className="m-0"><i className="ti-time mr-2"></i>time</p>
                                                    <p className="m-0 mb-2"><i className="ti-calendar mr-2"></i>date</p>
                                                    <h6><i className="ti-ticket mr-2"></i><b>Number of Tickets :</b><span>count</span></h6>
                                                    <h6><b>seatNumber</b></h6>
                                                    <div className="row d-flex justify-content-between">
                                                        <span className="p-0">Ticket Price</span>
                                                        <span className="p-0">Rs. 300.0</span>
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <span className="p-0">Convenience Price</span>
                                                        <span className="p-0">Rs. 100.0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between" style={{ padding: '0px 10px 0px 20px' }}>
                                            <h5><b>Total Price</b></h5>
                                            <span><b>Rs. 400.00</b></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 qr-section">
                                        <img src="assets/images/qrcode.jpg" />
                                        <hr />
                                        <h5 className="text-center"><b>T2ADRTY</b></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <h4 className="text-center mt-4 mb-6">Rate Us</h4>
                            <div className="ratings ratings-big">
                                <ul className={`ratings`}>
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
                                </ul>
                            </div>
                            <div className="review-link">
                            <Link href="#">Give a small review</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Booking