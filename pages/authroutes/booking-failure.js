import React,{ useState, useEffect } from 'react';
import Image from 'next/image';

import FailureGif from '../../public//assets/images/failure_payment.gif';
import Layout from "../../src/layouts/Layout";
import { getRoutingData,setRoutingData } from '../../src/utils';

function BookingFailure() {
  const [isLoaded, setIsLoade] = useState(false);
  const [bookingDetails, setBookingDetails] = useState()
  useEffect(async () => {
    function loaded() {
      setIsLoade(true);
    }
    setTimeout(loaded, 5000);
    setBookingDetails(await getRoutingData())
  }, []);

  const gotoPayment = () => {
    setRoutingData(bookingDetails?.bookingRequest?._id, '/payment')
  }
  return (
    <Layout>
      <div className="container-fluid light-bg container-small">
        <div className="row booking-details-mobileview">
          <div className="col-lg-6">
            <div className="card-curve person-card p-3">
              <div className="row">
                <div className="col-lg-3">
                  <img src={bookingDetails?.bookingRequest?.qrUrl} />
                </div>
                <div className="col-lg-9 pl-5 person-details">
                  <h4 className="text-uppercase">
                    <b>{bookingDetails?.bookingRequest?.userName}</b>
                  </h4>
                  <h5>
                    <i className="ti-email pr-2"></i>{bookingDetails?.bookingRequest?.email}
                  </h5>
                  <h5>
                    <i className="ti-location-pin pr-2"></i>Odisha,bhubaneswar
                  </h5>
                  <h5>
                    <i className="ti-mobile pr-2"></i>{bookingDetails?.bookingRequest?.phoneNumber}
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
                    <b>{bookingDetails?.bookingRequest?.eventName}</b>
                  </h4>
                  <h5>
                    <i className="ti-location-pin pr-2"></i>Odisha,bhubaneswar
                  </h5>
                  {(bookingDetails?.bookingRequest?.adultNum || bookingDetails?.bookingRequest?.childNum) && <h5>
                    <i className="ti-ticket pr-2"></i><b>{bookingDetails?.bookingRequest?.adultNum}</b> Adults ,<b>{bookingDetails?.bookingRequest?.childNum}</b> Child
                  </h5>}
                  <h5>
                    <i className='pr-2'>₹</i> Rs <b>{bookingDetails?.bookingRequest?.amount}</b>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card-curve card-curve-no-shape">
              <h6 className="text-center">Your Booking Request Id is</h6>
              <h4 className="text-uppercase text-center">
                <b>{bookingDetails?.bookingRequest?.bookingRequestId}</b>
              </h4>
              <img src="/assets/images/armchair.png" />
              {(bookingDetails?.bookingRequest?.selectedSeatCategory) ? <h6>Your seat Category <b>{bookingDetails?.bookingRequest?.selectedSeatCategory}</b></h6> : <h6>Your selected venue <b>{bookingDetails?.bookingRequest?.townhallName || bookingDetails?.bookingRequest?.mandapName}</b></h6>}
              <img src="/assets/images/calendar.png" />
              <h6>The show date is <b>{bookingDetails?.bookingRequest?.selectedDate}</b></h6>
              <img src="/assets/images/clock.png" />
              <h6>The show timing is <b>{bookingDetails?.bookingRequest?.selectedTime}</b></h6>
            </div>
          </div>
          <div className="col-lg-3 d-flex justify-content-center align-items-center flex-column pb-5">
            {!isLoaded ? (
              <>
                <h3 className="text-center">Preccessing Your Payment</h3>
                <img src="/assets/images/loading.gif" width="100px" />
              </>
            ) : (
              <>
                <div className='text-center'>
                  <Image src={FailureGif} alt='Booking Failed' />
                  <h1 className='text-danger'>Payment Failed</h1>
                  <div className="review-link">
                    <button onClick={gotoPayment()}>Retry Payment</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default BookingFailure;