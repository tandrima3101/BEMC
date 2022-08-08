import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button, ModalTitle, Spinner } from 'react-bootstrap'
import { setRoutingData, varifyOTP } from "../utils";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { callApi } from "../apiHandlers/callApi";
import { generateOTP, verifyOTP } from "../utils";
import { useDispatch, useSelector } from 'react-redux'
import { setlogin, setToken, setUserId } from "../../redux/slices/loginSlice";
import AmbulanceRequestModal from "./ambulanceRequestModal";

function FormModal({ active, activeTwo, data, adultPrice, childPrice, pageOf, price, toggle, activeFormModal }) {
  const dispatch = useDispatch()
  const [totalData, setTotalData] = useState(data)
  const [enteredOtp, setEnteredOtp] = useState(null)
  const [reqAmbulanceModal, setReqAmbulanceModal] = useState(false)
  let department = activeFormModal
  // console.log(islogin, 'islogin')
  // for main modal
  const [containerOne, setContainerOne] = useState(active);
  const [containerTwo, setContainerTwo] = useState(activeTwo);

  // for submodal
  const [submodalOne, setSubmodalOne] = useState(false);
  const [submodalTwo, setSubmodalTwo] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null)
  const [otpValidator, setOtpValidator] = useState(false)
  const [otpSender, setOtpSender] = useState(false)
  const userData = (JSON.parse(localStorage.getItem('userData')))
  const islogin = useSelector((state) => state.login.isLogin)
  // console.log(userData, 'userData formModal')
  //for button loader
  const [otpLoader, setOtpLoader] = useState()

  // for resend otp
  const [otpTimer, setOtpTimer] = useState(20)
  const [resendShow, setResendShow] = useState(false);
  const timerRef = useRef(otpTimer);
  const sendOtp = async () => {
    setSubmodalOne(true)
    if (activeFormModal == 'ramlingamPark') {
      setContainerOne(false)
    } else {
      setContainerTwo(false)
    }
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
      dispatch(setlogin(true))
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
  if (activeFormModal == "ramlingamPark") {
    url = "ramalingampark/bookingRequest/createBookingRequest"
  }
  else if (activeFormModal == "kalyanMandap") {
    url = "kalyanMandap/bookingRequest/createBookingRequest"
  }
  else if (activeFormModal == "townhall") {
    url = "townhall/bookingRequest/createBookingRequest"
  } else if (activeFormModal == "ambulance") {
    url = "ambulance/ambulance/createBookingRequest"
  } else {
    url = "harse/harse/createBookingRequest"
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
  // console.log(bookingDetails,'booooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkkkiiiiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnngggggggggggggggggg')
  useEffect(() => {
    setContainerOne(active)
    setContainerTwo(activeTwo)
    if (islogin == true) {
      setTotalData({ ...data, userName: userData?.firstName.concat(' ').concat(userData?.lastName), phoneNumber: JSON.stringify(userData.phoneNumber), email: userData.email })
    } else {
      setTotalData(data)
    }
  }, [activeTwo, active])
  // console.log(totalData, 'totaaaaaaaaaaaaaaaaaaaaaaaallllllllllllllllllllllllllllllllll')
  useEffect(() => {
    createBookingRequest()
    console.log(otpValidator, 'validatorrrrrrrrrrrr')
  }, [otpValidator])

  useEffect(() => {
    if (bookingDetails != null) {
      if (activeFormModal == 'ambulance') {
        setReqAmbulanceModal(true)
      } else {
        setRoutingData(bookingDetails?._id, "authroutes/booking-details")
      }
    }
  }, [bookingDetails])
  // console.log(activeFormModal, 'activeFormmmmmmmmmm')
  useEffect(() => {
    console.log(adultPrice, childPrice, 'priceeeeee adult child')
    console.log(totalData, 'total data')

  }, [totalData])
  const [errors, setErrors] = useState({ field: '', message: '' })
  const handleSubmit = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var pattern2 = new RegExp(/^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/)
    if (activeFormModal == 'ramlingamPark') {
      if (totalData && !totalData.adultNum) {
        setErrors({ field: 'adult', message: 'Please enter the number of adults' })
      } else if (totalData && !totalData.childNum) {
        setErrors({ field: 'child', message: 'Please enter the number of child' })
      } else if (totalData && !totalData.userName) {
        setErrors({ field: 'username', message: 'Please enter your name' })
      } else if (totalData && !totalData.phoneNumber) {
        setErrors({ field: 'number', message: 'Please enter your phone number' })
      } else if (totalData && !pattern2.test(totalData.phoneNumber)) {
        setErrors({ field: 'number', message: 'Please enter a valid phone number' })
      } else if (totalData && !totalData.email) {
        setErrors({ field: 'email', message: 'Please enter your email' })
      } else if (totalData && !pattern.test(totalData.email)) {
        setErrors({ field: 'email', message: 'Please enter a valid email' })
      } else {
        setTotalData({ ...totalData, department: activeFormModal, ticketSource: "ONLINE", amount: (adultPrice * totalData?.adultNum + childPrice * totalData?.childNum), api_key: "registeruser" })
        sendOtp()
      }
    } else {
      if (totalData && !totalData.userName) {
        setErrors({ field: 'username', message: 'Please enter your name' })
      } else if (totalData && !totalData.phoneNumber) {
        setErrors({ field: 'number', message: 'Please enter your phone number' })
      } else if (totalData && !pattern2.test(totalData.phoneNumber)) {
        setErrors({ field: 'number', message: 'Please enter a valid phone number' })
      } else if (totalData && !totalData.email) {
        setErrors({ field: 'email', message: 'Please enter your email' })
      } else if (totalData && !pattern.test(totalData.email)) {
        setErrors({ field: 'email', message: 'Please enter a valid email' })
      } else {
        setTotalData({ ...totalData, department: activeFormModal, amount: price, api_key: "registeruser" })
        sendOtp()
      }
    }
  }
  const ambulanceModalToggle = (data) => {
    setReqAmbulanceModal(data)
    setSubmodalOne(false)
  }
  return (
    <>
      {/* MOdal 1 for ramlingam park */}
      <Modal
        isOpen={containerOne}
        toggle={() => { setContainerOne(false), toggle(false) }}
      >
        <ModalHeader style={{ background: '#3bacb6' }}>
          <ModalTitle style={{ color: '#fff' }}>Enter Booking Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of Adults</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, adultNum: parseInt(e.target.value) })} />
            </div>
            {
              errors && errors.field == 'adult' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of child</label>
              <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, childNum: parseInt(e.target.value) })} />
            </div>
            {
              errors && errors.field == 'child' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'number' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email Address</label>
              <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
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
              handleSubmit()
            }}
          >
            Book Now
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerOne(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* MOdal 1 for all except ramlingam park */}
      <Modal
        isOpen={containerTwo}
        toggle={() => setContainerTwo(!containerTwo)}
      >
        <ModalHeader style={{ background: '#3bacb6' }}>
          <ModalTitle style={{ color: '#fff' }}>Your Personal Details</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'number' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email Address</label>
              <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
            </div>
            {
              errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
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
              handleSubmit()
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

      {/* submodal for All */}
      <Modal isOpen={submodalOne} toggle={() => { setSubmodalOne(false), toggle(false) }}>
        <ModalHeader style={{ background: '#3bacb6' }}>
          <ModalTitle style={{ color: '#fff' }}>Enter OTP</ModalTitle>
        </ModalHeader>
        <ModalBody style={{ display: "flex", flexDirection: "row" }}>
          <input type="number" className="otpinput m-0"
            onChange={(e) => { setEnteredOtp(e.target.value) }}
          />
        </ModalBody>
        <ModalFooter>
          {resendShow ? <button onClick={() => sendOtp()} style={{ backgroundColor: 'transparent' }}>
            <span>Resend OTP</span>
          </button> : <div className="mr-auto d-flex align-items-center"><i className="ti-time"></i><h6 className="ml-2 mb-0"><b>{timerRef.current}</b></h6></div>}
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

      {/* submodal for Ambulance Booking */}
      <AmbulanceRequestModal activeAmbulanceModal={reqAmbulanceModal} toggle={() => ambulanceModalToggle()} />
    </>
  );
}

export default FormModal;
