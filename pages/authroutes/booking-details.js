import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../src/layouts/Layout";
import { Spinner } from "react-bootstrap";
import { getRoutingData, setRoutingData } from "../../src/utils";
import { callApi } from "../../src/apiHandlers/callApi";
function BookingDetails() {
  const [isLoaded, setIsLoade] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();
  useEffect(async () => {
    let getBookingDetails = {
      method: 'post',
      url: "ramalingampark/bookingRequest/getBookingRequest",
      data: {
        _id: await getRoutingData(),
        api_key: "registeruser"
      }
    }
    let response = await callApi(getBookingDetails)
    console.log(response, 'responseeeeeeee')
    if (response.data.code == 201) {
      setBookingDetails(response.data.data)
    }
    function loaded() {
      setIsLoade(true);
    }
    setTimeout(loaded, 5000);
  }, []);
  console.log(bookingDetails, 'booking details')
  return (
    <Layout>
      <div className="container-fluid light-bg container-small">
        <div className="row booking-details-mobileview">
          <div className="col-lg-6">
            <div className="card-curve person-card p-3">
              <div className="row">
                <div className="col-lg-3">
                  <img src={bookingDetails?.qrUrl} style={{ maxWidth: '95%' }} />
                </div>
                <div className="col-lg-9 pl-5 person-details">
                  <h4 className="text-uppercase">
                    <b>{bookingDetails?.userName}</b>
                  </h4>
                  <h5>
                    <i className="ti-email pr-2"></i>{bookingDetails?.email}
                  </h5>
                  <h5><i class="ti-location-pin pr-2"></i>Ramlingam Park</h5>
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
                    <b>{bookingDetails?.eventName}</b>
                  </h4>
                  <h5><i class="ti-location-pin pr-2"></i>Ramlingam Park</h5>
                  {(bookingDetails?.adultNum || bookingDetails?.childNum) && <h5>
                    <i className="ti-ticket pr-2"></i>{bookingDetails?.adultNum + bookingDetails?.childNum} tickets
                  </h5>}
                  <h5>
                    <i className="ti-money pr-2"></i>Rs {bookingDetails?.amount}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card-curve card-curve-no-shape">
              <p className="text-center">Your Request Id is</p>
              <h4 className="text-uppercase text-center">
                <b>{bookingDetails?.bookingRequestId}</b>
              </h4>
              <img src="/assets/images/armchair.png" style={{ width: '50px' }} />
              {(bookingDetails?.selectedSeatCategory) ? <h6>Your seat Category {bookingDetails?.selectedSeatCategory}</h6> : <h6>Your selected venue {bookingDetails?.townhallName}</h6>}
                <img src="/assets/images/calendar.png" style={{ width: '50px' }} />
                <h6>The show date is {bookingDetails?.selectedDate}</h6>
                <img src="/assets/images/clock.png" style={{ width: '50px' }} />
                <h6>The show timing is {bookingDetails?.selectedTime}</h6>
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
                  <img src="assets/images/card.png" alt="" style={{ width: "70%" }} />
                  <button className="main-btn mt-4" style={{ fontSize: '20px' }} onClick={() => { setRoutingData(bookingDetails, "../payment") }}>Make Your Payment</button>
                </>
              )}
            </div>
          </div>
        </div>
    </Layout>
  );
}

export default BookingDetails;
