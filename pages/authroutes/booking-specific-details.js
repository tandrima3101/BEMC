import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from "moment";
import SuccessGif from '../../public//assets/images/successGif.gif';
import Layout from '../../src/layouts/Layout';
import { getRoutingData } from '../../src/utils';

function BookingSpecificDetails() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [bookingDetails, setBookingDetails] = useState()
    const userData = (JSON.parse(localStorage.getItem('userData')))
    useEffect(async () => {
        function loaded() {
            setIsLoaded(true);
        }
        setTimeout(loaded, 5000);
        setBookingDetails(await getRoutingData())
    }, []);
    console.log(userData, 'bookingDetails')
    const formatDate = (value) => {
        return moment(value).format('DD-MMM-YYYY');
    }
    return (
        <Layout>
            <div className="container-fluid light-bg container-small">
                <div className="row booking-details-mobileview">
                    <div className="col-lg-6">
                        <div className="card-curve person-card p-3">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={userData.avatar} style={{ borderRadius: '50%', overflow: 'hidden', margin: '15px' }} />
                                </div>
                                <div className="col-lg-9 pl-5 person-details">
                                    <h4 className="text-uppercase">
                                        <b>{bookingDetails?.userName}</b>
                                    </h4>
                                    <span className='escalate-badge escalate-badge-success justify-content-start ml-0 mb-2' style={{ padding: '5px 20px', fontSize: '13px' }}>
                                        {userData?.status} User
                                    </span>
                                    <h5>
                                        <i className="ti-email pr-2"></i>{bookingDetails?.email}
                                    </h5>
                                    <h5>
                                        <i className="ti-mobile pr-2"></i>{bookingDetails?.phoneNumber}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="card-curve booking-card-prepayment p-3 mt-4">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src="/assets/images/ticket.png" width="85%" />
                                </div>
                                <div className="col-lg-9 pl-5 booking-details">
                                    <h4 className="text-uppercase">
                                        <b>{bookingDetails?.eventName ||bookingDetails?.townhallName || bookingDetails?.mandapName}</b>
                                    </h4>
                                    <h5>
                                        <i className="ti-location-pin pr-2"></i>Odisha,bhubaneswar
                                    </h5>
                                    {(bookingDetails?.adultNum || bookingDetails?.childNum) && <h5>
                                        <i className="ti-ticket pr-2"></i><b>{bookingDetails?.adultNum}</b> Adults ,<b>{bookingDetails?.childNum}</b> Child
                                    </h5>}
                                    {
                                        bookingDetails?.department != 'ambulance' && bookingDetails?.department != 'harse' && <h5>
                                            <i className="pr-3">₹</i>Rs <b>{bookingDetails?.amount} /-</b>
                                        </h5>
                                    }
                                    {
                                        (bookingDetails?.department == 'ambulance' || bookingDetails?.department == 'harse') &&
                                        <>
                                            <h5>
                                                <i className="pr-2">₹</i>Rs <b>{bookingDetails?.selectedScheme?.value} /-</b>
                                            </h5>
                                            <h6>
                                                <i className="ti-truck pr-2"></i><b>{bookingDetails?.from.toUpperCase()}</b> To <b>{bookingDetails?.to.toUpperCase()}</b>
                                            </h6>
                                            {
                                                bookingDetails?.totalKm && <h5>
                                                    <i className="ti-truck pr-2"></i>Total <b>{bookingDetails?.totalKm}</b> km distance
                                                </h5>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        {
                            bookingDetails?.bookingRequest?.department != 'ambulance' && bookingDetails?.bookingRequest?.department != 'harse' &&
                            <div className="card-curve card-curve-no-shape">
                                <h6 className="text-center">Your Booking Request Id is</h6>
                                <h4 className="text-uppercase text-center">
                                    <b>{bookingDetails?.bookingRequestId}</b>
                                </h4>
                                <img src="/assets/images/armchair.png" />
                                {(bookingDetails?.selectedSeatCategory) ? <h6>Your seat Category <b>{bookingDetails?.selectedSeatCategory}</b></h6> : <h6>Your selected venue <b>{bookingDetails?.townhallName || bookingDetails?.mandapName}</b></h6>}
                                <img src="/assets/images/calendar.png" />
                                <h6>The show date is <b>{bookingDetails?.selectedDate}</b></h6>
                                <img src="/assets/images/clock.png" />
                                <h6>The show timing is <b>{bookingDetails?.selectedTime}</b></h6>
                            </div>
                        }
                        {
                            (bookingDetails?.bookingRequest?.department == 'ambulance' || bookingDetails?.bookingRequest?.department == 'harse') &&
                            <div className="card-curve card-curve-no-shape">
                                <h6 className="text-center">Your Booking Request Id is</h6>
                                <h4 className="text-uppercase text-center">
                                    <b>{bookingDetails?.bookingRequest?.bookingRequestId}</b>
                                </h4>
                                <img src="/assets/images/armchair.png" />
                                <h6>Your selected scheme <b>{bookingDetails?.bookingRequest?.selectedScheme?.key}</b></h6>
                                <img src="/assets/images/calendar.png" />
                                <h6>Booking Date is <b>{formatDate(bookingDetails?.bookingRequest?.date)}</b></h6>
                                <img src="/assets/images/clock.png" />
                                <h6>Booking timing is <b>{bookingDetails?.bookingRequest?.time}</b></h6>
                            </div>
                        }
                    </div>
                    <div className="col-lg-3">
                        <div className="card-curve card-curve-no-shape">
                            <img src={bookingDetails?.qrUrl} />
                            <h4 className="text-uppercase text-center mt-2">
                                <b>{bookingDetails?.bookingRequestId}</b>
                            </h4>
                            <h6 className="text-uppercase text-center">Ref Id- <b style={{ color: '#3bacb6' }}>{bookingDetails?.bankTransaction[0]?.bankTransactionId}</b></h6>
                            <h6 className="text-uppercase text-center">Transaction Id- <b style={{ color: '#3bacb6' }}>{bookingDetails?.account[0]?.accountId}</b></h6>
                            <h6 className="text-uppercase text-center">Booking Id-<b style={{ color: '#3bacb6' }}>{bookingDetails?.account[0]?.bookingId}</b></h6>
                            <h6 className="text-uppercase text-center">Amount- <b style={{ color: '#3bacb6' }}>{bookingDetails?.bankTransaction[0]?.bankTransaction?.amount}</b></h6>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default BookingSpecificDetails;