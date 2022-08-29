import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../src/layouts/Layout'
import { Button, Spinner } from 'react-bootstrap'
import { setRoutingData, getRoutingData } from '../src/utils'
import { callApi } from '../src/apiHandlers/callApi'
import Router from 'next/router'
function payment() {
  const [bookingReq, setBookingReq] = useState(null)
  const [detailsForPayment, setDetatailsForPayment] = useState(null)
  const [reqData, setReqData] = useState(undefined)
  const [intr, setIntr] = useState(undefined)
  useEffect(async () => {
    setBookingReq(await getRoutingData())
  }, [])
  const getDetailsForPayement = async () => {
    let details = {
      method: 'post',
      url: "pg/getBookingRequestById",
      data: {
        bookingRequestId: bookingReq._id,
        api_key: "registeruser"
      }
    }

    let response = await callApi(details)
    console.log(response, 'responseeeeeeeeee')
    if (response.status == 200) {
      console.log(response.data.data, 'dataaaaaaaaaaaaaaaaaaaaa')
      setDetatailsForPayment(response.data.data)
    }
  }
  useEffect(async () => {
    if (bookingReq != null) {
      getDetailsForPayement()
    }
  }, [bookingReq])

  let url
  if (detailsForPayment?.department == "ramlingamPark") {
    url = "ramalingampark/bookingRequest/response"
  }
  else if (detailsForPayment?.department == "kalyanMandap") {
    url = "kalyanMandap/bookingRequest/response"
  }
  else if (detailsForPayment?.department == "townhall") {
    url = "townhall/bookingRequest/response"
  }
  else if (detailsForPayment?.department == "ambulance") {
    url = "ambulance/ambulance/confirmBooking"
  }
  else if (detailsForPayment?.department == "harse") {
    url = "harse/harse/confirmBooking"
  }
  else if (detailsForPayment?.department == "sportsArena") {
    url = "sportsArena/sportsArena/createBooking"
  }
  console.log(bookingReq, 'reqqqqqqqqqqq')
  const [otpLoader, setOtpLoader] = useState()
  const paymentSuccess = async () => {
    let paymentSuccess = {}
    if (bookingReq != null) {
      paymentSuccess = {
        method: 'post',
        url: "pg/payu/placeorder",
        data: {
          bookingRequest_id: bookingReq,
        },
        api_key: "registeruser"
      }
      let response = await callApi(paymentSuccess)
      console.log(response, 'responseeeeeeeeeeeeeeeee')
      if (response.status == 200) {
        if (response.data.status == "SUCCESS") {
          setReqData(response.data)
        }
      }
    }
    else {
      Router.push("/")
    }
  }
  const paymentFailure = async () => {
    setOtpLoader(true)
    if (bookingReq) {
      let paymentSuccess = {
        method: 'post',
        url: url,
        data: {
          bookingRequestId: bookingReq,
          paymentStatus: "FAILED",
          bankTransactionsId: "oeaufiwejfo2344",
          paymentMode: 'ONLINE',
          isValid: true,
          bankTransaction: {
            id: "oeaufiwejfo2344",
            caook: "235fg",
            amount: "230"
          },
          api_key: "registeruser"
        }
      }
      let response = await callApi(paymentSuccess)
      if (response.data.status == 'FAILED') {
        setOtpLoader(false)
        setRoutingData(response.data.data, 'authroutes/booking-failure')
      }
    }
    else {
      Router.push("/")
    }
  }
  useEffect(() => {
    if (reqData) {
      // console.log('payment request')
      try {
      //   setIntr( setInterval(() => {
          console.log('payment request 1')
  
          // console.log(document.getElementById("hash")?.value, 'value hash')
          console.log('payment request 2')
  
          let val = document.getElementById("hash")?.value
          console.log('payment request 3', val)
  
          if (val == reqData?.data?.hash){
            console.log('payment request 4',)
  
            document.getElementById("payment_form").submit()

            console.log('payment request 5',)
  // 
            // clearInterval(intr)
          }
        // }, 1300))
      } catch (error) {
       console.error(error) 
      //  clearInterval(intr)

      }
      
    }
    // return () => clearInterval(intr)
  }, [reqData])
  return (
    <Layout>
      <div className='d-flex justify-content-center' style={{ margin: '9rem' }}>
        <button className='main-btn' onClick={() => paymentSuccess()}>{otpLoader && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}Success</button>
      </div>
      {/* <Link href='/booking-failure'><button className='danger-btn'>Failure</button></Link> */}
      <div className='d-flex justify-content-center payment-page' style={{ margin: '9rem' }}>
        <button className='main-btn danger-btn' onClick={() => paymentFailure()}>
          {otpLoader && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}Failure</button>
      </div>
      {
        reqData && <div style={{ display: 'none' }}>
          <form action={reqData?.data?.formurl} id="payment_form" method='post'>
            <input type="hidden" id="udf5" name="udf5" value={reqData?.data?.udf5} />
            <input type="hidden" id="surl" name="surl" value={reqData?.data?.surl} />
            <input type="hidden" id="furl" name="furl" value={reqData?.data?.furl} />
            <input type="hidden" id="curl" name="curl" value={reqData?.data?.crul} />
            <input type="hidden" id="key" name="key" value={reqData?.key} />
            <input type="text" id="txnid" name="txnid" placeholder="Transaction ID" value={reqData?.data?.bankTransactionId} />
            <input type="text" id="amount" name="amount" placeholder="Amount" value={reqData?.data?.amount} />
            <input type="text" id="productinfo" name="productinfo" placeholder="Product Info" value={reqData?.data?.productInfo} />
            < input type="text" id="firstname" name="firstname" placeholder="First Name" value={reqData?.data?.username} />
            < input type="text" id="email" name="email" placeholder="Email ID" value={reqData?.data?.userEmail} />
            < input type="text" id="phone" name="phone" placeholder="Mobile/Cell Number" value={reqData?.data?.userPhoneNumber} />
            <span><input type="text" id="address1" name="address1" placeholder="Address1" value="" /></span>
            <span><input type="text" id="address2" name="address2" placeholder="Address2" value="" /></span>
            <span><input type="text" id="city" name="city" placeholder="City" value="" /></span>
            <input type="text" id="state" name="state" placeholder="State" value="" />
            <input type="text" id="country" name="country" placeholder="Country" value="" />
            < input type="text" id="Zipcode" name="Zipcode" placeholder="Zip Code" value="" />
            < input type="text" id="Pg" name="Pg" placeholder="PG" value="" />
            < input type="text" id="hash" name="hash" placeholder="Hash" value={reqData?.data?.hash} />
            < div > <input type="submit" value="Pay" /></div >
          </form >
        </div >
      }
    </Layout >
  )
}

export default payment