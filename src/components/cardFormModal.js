import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { generateOTP, setRoutingData, varifyOTP } from "../utils";
import { callApi } from "../apiHandlers/callApi";
import { setlogin, setToken, setUserId } from "../../redux/slices/loginSlice";
import AmbulanceRequestModal from "./ambulanceRequestModal";

function CardFormModal({ activeModal, eventInfo, toggleFunc, department }) {
    const dispatch = useDispatch()
    const [totalData, setTotalData] = useState()
    const [reqAmbulanceModal, setReqAmbulanceModal] = useState(false)
    const [modalActive, setModalActive] = useState(activeModal)
    const [subModalActive, setSubModalActive] = useState(false)
    const [activeShowTimes, setActiveShowTimes] = useState({ label: '', value: '', key: '' })
    const [bookingDetails, setBookingDetails] = useState(null)
    const [errors, setErrors] = useState({ field: '', message: '' })
    const userData = (JSON.parse(localStorage.getItem('userData')))
    const islogin = useSelector((state) => state.login.isLogin)
    console.log(eventInfo, department, 'cardformmodal')
    console.log(userData, 'dataaaaaaaa')
    const showTimes = []
    const eventdates = []
    const seatsCategory = []
    const [enteredOtp, setEnteredOtp] = useState(null)
    eventInfo?.dates?.map((x) => {
        eventdates.push({
            label: `${x}`,
            value: `${x}`
        })
    })
    eventInfo?.seatCategory?.map((x) => {
        seatsCategory.push({
            label: `${x.categoryName} (${x.capacity} seats available)`,
            value: `${x.categoryName}`
        })
    })
    const timeSlot = [];
    eventInfo?.eventDefaultTime?.map((x) => {
        timeSlot.push({
            label: `${x}`,
            value: `${x}`,
        })
    })
    const selectedDate = eventInfo?.dateAndTime?.find((x) => {
        return (x.date == totalData?.selectedDate)
    })
    selectedDate?.time?.map((x, index) => {
        showTimes.push({
            label: `${x}`,
            value: `${x}`,
            key: index
        })
    })
    useEffect(() => {
        setModalActive(activeModal)
        if (islogin) {
            setTotalData({ ...totalData, userName: userData?.firstName.concat(' ').concat(userData?.lastName), phoneNumber: JSON.stringify(userData?.phoneNumber), email: userData?.email })
        } else {
            setTotalData({ ...totalData })
        }
        console.log(eventInfo, 'event')
    }, [activeModal])
    useEffect(() => {
        if (bookingDetails != null) {
            if (department == 'ambulance' || 'harse') {
                setReqAmbulanceModal(true)
              } else {
                setRoutingData(bookingDetails?._id, "authroutes/booking-details")
              }
        }
    }, [bookingDetails])
    //for button loader
    const [otpLoader, setOtpLoader] = useState()

    // for resend otp
    const [otpValidator, setOtpValidator] = useState(false)
    const [otpSender, setOtpSender] = useState(false)
    const [otpTimer, setOtpTimer] = useState(20)
    const [resendShow, setResendShow] = useState(false);
    const timerRef = useRef(otpTimer);
    const sendOtp = async () => {
        setSubModalActive(true),
        setModalActive(false),
        setTotalData({ ...totalData, ticketSource: "ONLINE", amount: department === "ramlingamPark" ? (eventInfo.price * totalData?.adultNum + eventInfo.cPrice * totalData?.childNum) : (department=='ambulance' || 'harse') ? totalData?.amountLeftToBePaid :eventInfo?.price, department: department })
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
    let journeyDetails = [];
    if (eventInfo?.ambulanceName != undefined || eventInfo?.harseName != undefined) {
        console.log(eventInfo?.scheme)
        for (let j = 0; j < eventInfo?.scheme?.length; j++) {
            journeyDetails.push({
                label: `${eventInfo?.scheme[j].key},Price:${eventInfo?.scheme[j].value},(${eventInfo?.scheme[j].extraPrice} Rs will be charged for extra ${eventInfo?.scheme[j]?.thresholdKm} km)`,
                value: eventInfo?.scheme[j],
                price: `${eventInfo?.scheme[j].value}`,
                key: `${eventInfo?.scheme[j].key}`
            })
            console.log('hiiiiiiiiiii')
        }
    }
    let url;
    if (department == "ramlingamPark") {
        url = "ramalingampark/bookingRequest/createBookingRequest"
    }
    else if (department == "kalyanMandap") {
        url = "kalyanMandap/bookingRequest/createBookingRequest"
    }
    else if (department == "townhall") {
        url = "townhall/bookingRequest/createBookingRequest"
    }
    else if (department == "ambulance") {
        url = "ambulance/ambulance/createBookingRequest"
    }
    else if (department == "harse") {
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
    useEffect(() => {
        createBookingRequest()
        console.log(otpValidator, 'validatorrrrrrrrrrrr')
    }, [otpValidator])

    const handleSubmit = () => {
        var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        var pattern2 = new RegExp(/^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/)
        if (department == 'ramlingamPark') {
            if (totalData && !totalData.selectedDate) {
                setErrors({ field: 'date', message: 'Please select a date' })
            } else if (totalData && activeShowTimes.value == '') {
                setErrors({ field: 'time', message: 'Please select a time' })
            } else if (totalData && !totalData.selectedSeatCategory) {
                setErrors({ field: 'seat', message: 'Please a specific Seat Category' })
            } else if (totalData && !totalData.adultNum) {
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
                sendOtp()
            }
        } else if (department == 'ambulance' || 'harse') {
            if (totalData && !totalData.date) {
                setErrors({ field: 'date', message: 'Please select a date' })
            } else if (totalData && !totalData.time) {
                setErrors({ field: 'time', message: 'Please select a time' })
            } else if (totalData && !totalData.selectedScheme) {
                setErrors({ field: 'scheme', message: 'Please select your journey details' })
            } else if (totalData && !totalData.from) {
                setErrors({ field: 'from', message: 'Please select your pickup location' })
            } else if (totalData && !totalData.to) {
                setErrors({ field: 'to', message: 'Please select your drop location' })
            } else {
                sendOtp()
            }
        } else {
            if (totalData && !totalData.selectedDate) {
                setErrors({ field: 'date', message: 'Please select a date' })
            } else if (totalData && !totalData.selectedTime) {
                setErrors({ field: 'time', message: 'Please select a time' })
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
            {/* Main Modal */}
            <Modal
                isOpen={modalActive}
                toggle={() => { setModalActive(!modalActive), toggleFunc(!modalActive) }}
            >
                <ModalHeader style={{ background: '#3bacb6' }}>
                    <h5 style={{ color: '#fff' }}>Book this event</h5>
                </ModalHeader>
                <ModalBody>
                    {department === "ramlingamPark" && <div className="row">
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Event</label>
                            <input value={eventInfo?.eventName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Date</label>
                            <Select options={eventdates} onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.value, eventName: eventInfo?.eventName, eventId: eventInfo?.eventId }) }} />
                        </div>
                        {
                            errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Time</label>
                            <p id="id_work_days" className="mb-0">
                                {showTimes?.map((x) => {
                                    return (
                                        <label key={x.key}>
                                            <input type="checkbox" name="work_days" value={x.value} checked={x.key === activeShowTimes?.key} onClick={(e) => { { x.key === activeShowTimes.key ? setActiveShowTimes({}) : setActiveShowTimes(x) } }} />
                                            <span>{x.label}</span>
                                        </label>
                                    )
                                })
                                }
                            </p>
                        </div>
                        {
                            errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Seat Category</label>
                            <Select options={seatsCategory} className='mb-2' onChange={(e) => { setTotalData({ ...totalData, selectedSeatCategory: e.value, selectedTime: activeShowTimes.value }) }} />
                        </div>
                        {
                            errors && errors.field == 'seat' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        {/* setSelectedSeatCapacity(e.capacity) */}
                        {/* {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>} */}
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter No Of Adults</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, adultNum: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'adult' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter No Of child</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, childNum: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'child' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'number' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                    </div>}
                    {department === "townhall" && <div className="row">
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select townhall</label>
                            <input value={eventInfo?.townhallName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Date</label>
                            <input
                                type="date"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.target.value, townhallName: eventInfo?.townhallName, townhallId: eventInfo?.townhallId }) }}
                            />
                        </div>
                        {
                            errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Time</label>
                            <Select options={timeSlot} onChange={(e) => { setTotalData({ ...totalData, selectedTime: e.value }) }} />
                        </div>
                        {
                            errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'phoneNumber' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                    </div>}
                    {department === "kalyanMandap" && <div className="row">
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select mandap</label>
                            <input value={eventInfo?.mandapName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Date</label>
                            <input
                                type="date"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.target.value, mandapName: eventInfo?.mandapName, mandapId: eventInfo?.mandapId }) }}
                            />
                        </div>
                        {
                            errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Time</label>
                            <Select options={timeSlot} onChange={(e) => { setTotalData({ ...totalData, selectedTime: e.value }) }} />
                        </div>
                        {
                            errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'phoneNumber' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                    </div>}
                    {(department === "ambulance" || "harse") && <div className="row">
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Vehicle</label>
                            <input value={eventInfo?.ambulanceName || eventInfo?.harseName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>From</label>
                            <input onChange={(e) => { setTotalData({ ...totalData, from: e.target.value }) }}
                                type="text" className="otpinput m-0" />
                        </div>
                        {
                            errors && errors.field == 'from' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>To</label>
                            <input onChange={(e) => { setTotalData({ ...totalData, to: e.target.value }) }}
                                type="text" className="otpinput m-0" />
                        </div>
                        {
                            errors && errors.field == 'to' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Date</label>
                            <input
                                type="date"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, date: e.target.value }) }}
                            />
                        </div>
                        {
                            errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Select Time</label>
                            <input
                                type="time"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, time: e.target.value}) }}
                            />                        </div>
                        {
                            errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-6 mt-2">
                            <label>Select Your Journey Details</label>
                            <Select options={journeyDetails}
                                onChange={(e) => { setTotalData({ ...totalData, selectedScheme: e.value, amountLeftToBePaid: e.price }) }}
                            />
                        </div>
                        {
                            errors && errors.field == 'scheme' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.firstName.concat(' ').concat(userData?.lastName)} onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'username' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" defaultValue={userData?.phoneNumber} onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'phoneNumber' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                        <div className="col-lg-12 col-md-12 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" defaultValue={userData?.email} onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                        {
                            errors && errors.field == 'email' && <h6 className="text-danger mt-1">{errors.message}</h6>
                        }
                    </div>}

                </ModalBody>
                <ModalFooter>
                    <button className="main-btn icon-btn" onClick={() => { handleSubmit() }}>Book Now</button>
                </ModalFooter>
            </Modal>

            {/* Submodal */}
            <Modal isOpen={subModalActive}>
                <ModalHeader style={{ background: '#3bacb6' }}>
                    <h5 style={{ color: '#fff' }}>Enter OTP</h5>
                </ModalHeader>
                <ModalBody style={{ display: "flex", flexDirection: "row" }}>
                    <input type="number" className="otpinput" onChange={(e) => { setEnteredOtp(e.target.value) }} />
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
            <AmbulanceRequestModal activeAmbulanceModal={reqAmbulanceModal} toggle={() => ambulanceModalToggle()} />
        </>
    )
}

export default CardFormModal;
