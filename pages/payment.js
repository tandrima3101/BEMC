import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../src/layouts/Layout'
import { Button, Spinner } from 'react-bootstrap'
import { setRoutingData, getRoutingData } from '../src/utils'
import { callApi } from '../src/apiHandlers/callApi'
function payment() {
  const [bookingReq, setBookingReq] = useState(null)
  useEffect(async () => {
    setBookingReq(await getRoutingData())
  }, [])
  console.log(bookingReq)
  let url
  if (bookingReq?.department == "ramlingamPark") {
    url = "ramalingampark/bookingRequest/response"
  }
  else if (bookingReq?.department == "kalyanMandap") {
    url = "kalyanMandap/bookingRequest/response"
  }
  else if (bookingReq?.department == "townhall") {
    url = "townhall/bookingRequest/response"
  }

  const [otpLoader, setOtpLoader] = useState()

  const paymentSuccess = async () => {
    setOtpLoader(true)
    let paymentSuccess = {
      method: 'post',
      url: url,
      data: {
        bookingRequestId: bookingReq._id,
        paymentStatus: "SUCCESS",
        bankTransactionsId: "oeaufiwejfo2344",
        bankTransaction: {
          id: "oeaufiwejfo2344",
          caook: "235fg",
          amount: "230"
        },
        api_key: "registeruser"
      }
    }
    let response = await callApi(paymentSuccess)
    if (response.data.status == 'SUCCESS') {
      setOtpLoader(false)
      console.log(response.data.data,'dataaaaaaaaaaaaa')
      setRoutingData(response.data.data, 'authroutes/booking-success')
    }
    // else{
    //   setRoutingData(response.data.data, 'authroutes/booking-failure')
    // }
  }
  const paymentFailure = async () => {
    setOtpLoader(true)
    let paymentSuccess = {
      method: 'post',
      url: url,
      data: {
        bookingRequestId: bookingReq._id,
        paymentStatus: "FAILED",
        bankTransactionsId: "oeaufiwejfo2344",
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
        <div className='d-flex justify-content-center' style={{ margin: '9rem' }}>
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
    </Layout>
  )
}

export default payment