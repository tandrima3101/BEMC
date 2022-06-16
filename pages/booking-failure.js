import React,{ useState, useEffect } from 'react';
import Image from 'next/image';

import FailureGif from '../public/assets/images/failure_payment.gif';
import Layout from "../src/layouts/Layout";
import Link from 'next/link';

function BookingFailure() {
    const [isLoaded, setIsLoade] = useState(false);
  useEffect(() => {
    function loaded() {
      setIsLoade(true);
    }
    setTimeout(loaded, 5000);
  }, []);

  return (
    <Layout>
    <div className="container-fluid light-bg container-small">
      <div className="row booking-details-mobileview">
        <div className="col-lg-6">
          <div className="card-curve person-card p-3">
            <div className="row">
              <div className="col-lg-3">
                <img src="assets/images/woman.png" className="person-icon" />
              </div>
              <div className="col-lg-9 pl-5 person-details">
                <h4 className="text-uppercase">
                  <b>Tandrima Goswami</b>
                </h4>
                <h5>
                  <i className="ti-email pr-2"></i>example@gmail.com
                </h5>
                <h5>
                  <i className="ti-location-pin pr-2"></i>Odisha,bhubaneswar
                </h5>
                <h5>
                  <i className="ti-mobile pr-2"></i>9876543210
                </h5>
              </div>
            </div>
          </div>
          <div className="card-curve booking-card-prepayment p-3 mt-4">
            <div className="row">
              <div className="col-lg-3">
                <img src="assets/images/ticket.png" width="85%" />
              </div>
              <div className="col-lg-9 pl-5 booking-details">
                <h4 className="text-uppercase">
                  <b>Mo Odisha</b>
                </h4>
                <h5>
                  <i className="ti-location-pin pr-2"></i>Ramlingam Park
                </h5>
                <h5>
                  <i className="ti-ticket pr-2"></i>3 tickets
                </h5>
                <h5>
                  <i className="ti-money pr-2"></i>Rs 340.00
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card-curve card-curve-no-shape">
            <h4 className="text-uppercase text-center">
              <b>Mo Odisha</b>
            </h4>
            <p className="text-center">Your event details is</p>
            <img src="assets/images/armchair.png" />
            <h6>Your seat Numbers are 23,24,25</h6>
            <img src="assets/images/calendar.png" />
            <h6>The show date is 02/06/2022</h6>
            <img src="assets/images/clock.png" />
            <h6>The show timing is 4:30 PM</h6>
          </div>
        </div>
        <div className="col-lg-3 d-flex justify-content-center align-items-center flex-column pb-5">
            {!isLoaded ? (
              <>
                <h3 className="text-center">Preccessing Your Payment</h3>
                <img src="assets/images/loading.gif" width="100px" />
              </>
            ) : (
              <>
                <div className='text-center'>
                    <Image src={FailureGif} alt='Booking Failed'  />
                    <h1 className='text-danger'>Payment Failed</h1>
                    <div className="review-link">
                        <button>Having any issues?</button>
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