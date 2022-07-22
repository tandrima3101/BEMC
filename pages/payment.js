import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../src/layouts/Layout'
import { setRoutingData,getRoutingData } from '../src/utils'
import { callApi } from '../src/apiHandlers/callApi'
function payment() {
  const [bookingReq,setBookingReq]= useState(null)
  useEffect(async ()=>{
    setBookingReq(await getRoutingData())
  },[])
  console.log(bookingReq)
  let url 
  if(bookingReq?.department == "Ramlingam Park"){
    url = "ramalingampark/bookingRequest/response"
  }
  else if (bookingReq?.department == "Kalyan Mandap"){
    url = "kalyanMandap/bookingRequest/response"
  }
  else if (bookingReq?.department == "Townhall"){
    url = "townhall/bookingRequest/response"
  }
  const paymentSuccess = async () =>{
    let paymentSuccess = {
      method: 'post',
      url: url,
      data: {
        bookingRequestId : bookingReq._id,
        paymentStatus : "SUCCESS",
        bankTransactionsId : "oeaufiwejfo2344",
        bankTransaction : {
           id : "oeaufiwejfo2344",
           caook : "235fg" ,
           amount:"230"
        },
        api_key:"registeruser"
       }
    }
    let response = await callApi(paymentSuccess)
    if(response.data.status=='SUCCESS'){
      setRoutingData(response.data.data,'authroutes/booking-success')
    }
  }
  return (
    <Layout>
      <div className='d-flex justify-content-center' style={{margin:'9rem'}}>
          <button className='main-btn' onClick={()=>paymentSuccess()}>Success</button>
          <Link href='/booking-failure'><button className='danger-btn'>Failure</button></Link>
      </div>
    </Layout>
  )
}

export default payment