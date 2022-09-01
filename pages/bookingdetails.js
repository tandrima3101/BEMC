import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from "moment";
import SuccessGif from '../public//assets/images/successGif.gif';
import Layout from '../src/layouts/Layout';
import { getRoutingData } from '../src/utils';
import { useRouter } from 'next/router';
import PreLoader from '../src/components/PreLoader';
import { portalUrl } from '../src/constants/defaultValues';
import { callApi } from '../src/apiHandlers/callApi';

function BookingDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookingReq_id, setBookingReq_id] = useState(undefined)
  const [bookingDetails, setBookingDetails] = useState(undefined)
  const [detailsForPayment, setDetatailsForPayment] = useState(null)
  const userData = (JSON.parse(localStorage.getItem('userData')))
  const [invalidReq, setInvalidReq] = useState(false)
  const router = useRouter();

  useEffect(async () => {
    if (bookingReq_id) {
        console.log(bookingDetails)
        if(bookingDetails?.bookingRequest?.bookingRequestId){
          console.log("fff1")
        }
        else{
          console.log("fff2")

          payment()
        }
    }
  }, [bookingReq_id,bookingDetails])
  useEffect(async () => {
    if (!router.isReady) return;
    const { bookingRequestId } = router.query
    console.log(bookingRequestId, 'raw id from rowter')
    setBookingReq_id(bookingRequestId)
  }, [router.isReady, router.query])
  const payment = async () => {
    console.log("payment")
    let payment = {
      method: 'post',
      url: "pg/bookingResponseSuccess",
      data: {
        bookingRequest_id: bookingReq_id,
      }
    }
    console.log(bookingDetails)
    if(bookingDetails?.bookingRequest?.bookingRequestId){
            //..
    }else{
      console.log("have no booking betails")

      let response = await callApi(payment)
      console.log("payment 1")
      console.log("response.status",response.status)
      if(response.status==200 && response.data.status){
        if (response.data.status == 'SUCCESS') {
          console.log("payment 3")
    
          setBookingDetails(response.data.data)
        }
        else {
          console.log("payment 4")
          
          setInvalidReq(true)
        }      }else{
        payment()
      }
      
    }
    
  }
  useEffect(() => {
    bookingDetails && setIsLoaded(true)
  }, [bookingDetails])
  console.log(bookingDetails, 'bookingDetails')
  const formatDate = (value) => {
    return moment(value).format('DD-MMM-YYYY');
  }

  return (
    !isLoaded ? <PreLoader /> : !invalidReq ? <Layout>
      <div className="container-fluid light-bg container-small">
        <div className="row booking-details-mobileview">
          <div className="col-lg-4">
            <div className="card-curve person-card p-3">
              <div className="row">
                <div className="col-lg-3">
                  <img src={userData.avatar} />
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
                  <h5 className="text-uppercase">
                    <b>{bookingDetails?.bookingRequest?.eventName}</b>
                  </h5>
                  <h5>
                    <i className="ti-ticket pr-2"></i>{bookingDetails?.bookingRequest?.ticketSource} Booking
                  </h5>
                  {(bookingDetails?.bookingRequest?.adultNum || bookingDetails?.bookingRequest?.childNum) && <h5>
                    <i className="ti-ticket pr-2"></i><b>{bookingDetails?.bookingRequest?.adultNum}</b> Adults ,<b>{bookingDetails?.bookingRequest?.childNum}</b> Child
                  </h5>}
                  {
                    bookingDetails?.bookingRequest?.department != 'ambulance' && bookingDetails?.bookingRequest?.department != 'harse' && <h5>
                      <i className="ti-money pr-2"></i>Rs <b>{bookingDetails?.bookingRequest?.amount || bookingDetails?.bookingRequest?.plan?.price}</b>
                    </h5>
                  }
                  {(bookingDetails?.bookingRequest?.plan) &&
                    <>
                      <h5>
                        <i className="ti-ticket pr-2"></i>Selected Plan : <b>{bookingDetails.bookingRequest.plan.tenure.toUpperCase()}</b>
                      </h5>
                      <h5>
                        <i className="ti-ticket pr-2"></i>Age Limit is : <b>{bookingDetails.bookingRequest.plan.ageLimit.toUpperCase()}</b>
                      </h5>
                    </>
                  }
                  {
                    (bookingDetails?.bookingRequest?.department == 'ambulance' || bookingDetails?.bookingRequest?.department == 'harse') &&
                    <>
                      <h5>
                        <i className="pr-3">₹</i>Rs <b>{bookingDetails?.bookingRequest?.selectedScheme?.value}</b>
                      </h5>
                      <h6>
                        <i className="ti-truck pr-2"></i><b>{bookingDetails?.bookingRequest?.from.toUpperCase()}</b> To <b>{bookingDetails?.bookingRequest?.to.toUpperCase()}</b>
                      </h6>
                      {
                        bookingDetails?.bookingRequest?.totalKm && <h5>
                          <i className="ti-truck pr-2"></i>Total <b>{bookingDetails?.bookingRequest?.totalKm}</b> km distance
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
              bookingDetails?.bookingRequest?.department != 'ambulance' && bookingDetails?.bookingRequest?.department != 'harse' && bookingDetails?.bookingRequest?.department != 'sportsArena' &&
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
            {
              (bookingDetails?.bookingRequest?.department == 'sportsArena') &&
              <div className="card-curve card-curve-no-shape">
                <h6 className="text-center">Your Booking Request Id is</h6>
                <h4 className="text-uppercase text-center">
                  <b>{bookingDetails?.bookingRequest?.bookingRequestId}</b>
                </h4>
                <img src="/assets/images/armchair.png" />
                <h6>Your selected Membership Plan <b>{bookingDetails?.bookingRequest?.membershipName}</b></h6>
                <img src="/assets/images/calendar.png" />
                <h6>Booking Date is from <b>{formatDate(bookingDetails?.bookingRequest?.selectedDate)}</b></h6>
                <img src="/assets/images/clock.png" />
                <h6>Booking timing slot is <b>{bookingDetails?.bookingRequest?.selectedTime}</b></h6>
              </div>
            }
          </div>
          <div className="col-lg-3">
            <div className="card-curve card-curve-no-shape">
              <img src={bookingDetails?.bookingRequest?.qrUrl} style={{ height: '230px', width: '100%', objectFit: 'contain' }} />
              <h4 className="text-uppercase text-center">
                <b>{bookingDetails?.bookingRequest?.bookingRequestId}</b>
              </h4>
              <h6 className="text-uppercase text-center">Ref Id- <b style={{ color: '#3bacb6' }}>{bookingDetails?.bankTransaction?.bankTransactionId}</b></h6>
              <h6 className="text-uppercase text-center">Transaction Id- <b style={{ color: '#3bacb6' }}>{bookingDetails?.account?.accountId}</b></h6>
              <h6 className="text-uppercase text-center">Booking Id-<b style={{ color: '#3bacb6' }}>{bookingDetails?.account?.bookingId}</b></h6>
              <h6 className="text-uppercase text-center">Amount- <b style={{ color: '#3bacb6' }}>{bookingDetails?.bankTransaction?.bankTransaction?.amount}</b></h6>
            </div>
          </div>
          <div className="col-lg-2 d-flex justify-content-center align-items-center flex-column pb-5">
            {!isLoaded ? (
              <>
                <h3 className="text-center">Preccessing Your Payment</h3>
                <img src="/assets/images/loading.gif" width="100px" />
              </>
            ) : (
              <>
                <div className='text-center'>
                  <Image src={SuccessGif} alt='Booking Success' />
                  <h1 className='text-success'>Payment Successful.</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout> : <h5>The Requested page not exist</h5>
  )
}

export default BookingDetails;