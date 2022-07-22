import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, Spinner } from 'react-bootstrap'
import { setRoutingData, varifyOTP } from "../utils";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { callApi } from "../apiHandlers/callApi";
import { generateOTP, verifyOTP } from "../utils";
function FormModal({ active, activeTwo, data, adultPrice, childPrice,pageOf }) {
  console.log(totalData,'dataaaaaaaaa')
  const [totalData, setTotalData] = useState(data)
  const [enteredOtp, setEnteredOtp] = useState(null)
  let department = pageOf
  console.log(department,'departmentttt')
  // for main modal
  const [containerOne, setContainerOne] = useState(active);
  const [containerTwo, setContainerTwo] = useState(activeTwo);

  // for submodal
  const [submodalOne, setSubmodalOne] = useState(false);
  const [submodalTwo, setSubmodalTwo] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null)
  const [otpValidator, setOtpValidator] = useState(false)
  const [otpSender, setOtpSender] = useState(false)


  //for button loader
  const [otpLoader, setOtpLoader] = useState()

  // for resend otp
  const [otpTimer, setOtpTimer] = useState(20)
  const [resendShow, setResendShow] = useState(false);
  const timerRef = useRef(otpTimer);
  const sendOtp = async () => {
    setSubmodalOne(true),
    setContainerOne(false)
    timerFunction()
    let dataForOtp = {
      email: totalData.email,
      userName: totalData.userName,
      phoneNumber: totalData.phoneNumber
    }
    let optSenderHand = await generateOTP(dataForOtp)
    setOtpSender(optSenderHand)
  }
  useEffect(() => {
    console.log(timerRef.current, 'current')
  }, [timerRef.current])
  const validateOtp = async () => {
    setOtpLoader(true)
    let validateData = {
      phoneNumber: totalData?.phoneNumber,
      otp: enteredOtp
    }
    let otpValidatorHand = await varifyOTP(validateData)
    setOtpValidator(otpValidatorHand)
    if (otpValidatorHand == true) {
      setOtpLoader(false)
    }
  }

  const timerFunction = () => {
    setResendShow(false)
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        setResendShow(true)
        clearInterval(timerId);
      } else {
        setOtpTimer(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }

  let url;
  if(pageOf == "Ramlingam Park"){
    url ="ramalingampark/bookingRequest/createBookingRequest"
  }
  else if(pageOf =="Kalyan Mandap"){
    url ="kalyanMandap/bookingRequest/createBookingRequest"
  }
  else if(pageOf =="Townhall"){
    url ="townhall/bookingRequest/createBookingRequest"
  }
  const createBookingRequest = async () => {
    console.log(totalData)

    if (otpSender == true && otpValidator == true) {

      let createBookingData = {
        method: 'post',
        url: url,
        data: totalData
      }
      let response = await callApi(createBookingData)
      console.log(response, 'responseeeeeeee')
      if (response.data.status == 'SUCCESS') {
        setBookingDetails(response.data.data)
      }
    }


  }
  useEffect(() => {
    setContainerOne(active)
    setContainerTwo(activeTwo)
    setTotalData(data)
  }, [activeTwo, active])


  useEffect(() => {
    createBookingRequest()
  }, [otpValidator])

  useEffect(() => {
    if (bookingDetails != null) {
      setRoutingData(bookingDetails?._id, "authroutes/booking-details")
    }
  }, [bookingDetails])

  console.log(bookingDetails, 'details')
  return (
    <>
      {/* MOdal 1 for ramlingam park */}
      <Modal
        isOpen={containerOne}
        toggle={() => setContainerOne(!containerOne)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of Adults</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, adultNum: parseInt(e.target.value) })} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of child</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, childNum: parseInt(e.target.value) })} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value),department:department, ticketSource: "ONLINE", amount: adultPrice * totalData?.adultNum + childPrice * totalData?.childNum, api_key: "registeruser" })} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email Address</label>
              <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
            </div>
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={submodalOne}
            toggle={() => setSubmodalOne(!submodalOne)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => {
              sendOtp()
            }}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerOne(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* submodal for ramlingam park */}
      <Modal isOpen={submodalOne}>
        <ModalHeader>Enter OTP</ModalHeader>
        <ModalBody style={{ display: "flex", flexDirection: "row" }}>
          <input type="number"
            onChange={(e) => { setEnteredOtp(e.target.value) }}
          />
        </ModalBody>
        <ModalFooter>
          {resendShow ? <button onClick={() => sendOtp()} style={{ backgroundColor: 'transparent' }}>
            <span>Resend OTP</span>
          </button> : <p>{timerRef.current}</p>}
          <button onClick={() => validateOtp()} disabled={otpLoader} className='main-btn'>
            {otpLoader && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            <span>Enter OTP</span>
          </button>
        </ModalFooter>
      </Modal>



      {/* MOdal 1 for all excep ramlingam park */}
      <Modal
        isOpen={containerTwo}
        toggle={() => setContainerTwo(!containerTwo)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value), department: pageOf, api_key: "registeruser" })} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })}/>
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email Address</label>
              <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
            </div>
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={submodalTwo}
            toggle={() => setSubmodalTwo(!submodalTwo)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => {
              sendOtp(),
              setSubmodalOne(true),
              setContainerTwo(false)
            }}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerTwo(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>


      {/* submodal for all except ramlingam park */}
      <Modal isOpen={submodalTwo}>
        <ModalHeader>Enter OTP</ModalHeader>
        <ModalBody style={{ display: "flex", flexDirection: "row" }}>
          <input type="number" className="otpinput" />
          <input type="number" className="otpinput" />
          <input type="number" className="otpinput" />
          <input type="number" className="otpinput" />
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => {
              setSubmodalTwo(false), setContainerTwo(true);
            }}
          >
            Change Number
          </button>{" "}
          <button
            className="main-btn"
            onClick={() => {
              setSubmodalTwo(false);
            }}
          >
            Done
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FormModal;
