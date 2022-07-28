import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Select from "react-select";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Button, Spinner } from 'react-bootstrap'
import { generateOTP, setRoutingData, varifyOTP } from "../utils";
import { callApi } from "../apiHandlers/callApi";

function CardFormModal({ activeModal, eventInfo, toggleFunc, department }) {
    console.log(department, 'departmentttttttttt')
    const [totalData, setTotalData] = useState()
    const [modalActive, setModalActive] = useState(activeModal)
    const [subModalActive, setSubModalActive] = useState(false)
    const [activeShowTimes, setActiveShowTimes] = useState({ label: '', value: '', key: '' })
    const [bookingDetails, setBookingDetails] = useState(null)

    const showTimes = []
    const eventdates = []
    const seatsCategory = []
    const [enteredOtp, setEnteredOtp] = useState(null)
    console.log(eventInfo, 'event Info')
    eventInfo?.dates?.map((x) => {
        eventdates.push({
            label: `${x}`,
            value: `${x}`
        })
    })
    eventInfo?.seatCategory?.map((x) => {
        seatsCategory.push({
            label: `${x.categoryName}`,
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
        return (x.date == totalData.selectedDate)
    })

    console.log(totalData?.selectedDate, 'timeeeeeeeeeee')
    selectedDate?.time?.map((x, index) => {
        showTimes.push({
            label: `${x}`,
            value: `${x}`,
            key: index
        })
    })
    // console.log(typeof(eventInfo.cPrice),'typeeeeeeeeeees')
    useEffect(() => {
        setModalActive(activeModal)
        setTotalData({ ...totalData })
        console.log(eventInfo, 'event')
    }, [activeModal])
    console.log(totalData, 'total Data')

    useEffect(() => {
        if (bookingDetails != null) {
            setRoutingData(bookingDetails?._id, "authroutes/booking-details")
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
        setSubModalActive(!subModalActive),
            setModalActive(!modalActive),
            setTotalData({ ...totalData, ticketSource: "ONLINE", amount:department==="ramlingamPark"?( eventInfo.price * totalData?.adultNum + eventInfo.cPrice * totalData?.childNum):eventInfo?.price, department: eventInfo?.department })
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
    if (eventInfo?.department == "ramlingamPark") {
        url = "ramalingampark/bookingRequest/createBookingRequest"
    }
    else if (eventInfo?.department == "kalyanMandap") {
        url = "kalyanMandap/bookingRequest/createBookingRequest"
    }
    else if (eventInfo?.department == "townhall") {
        url = "townhall/bookingRequest/createBookingRequest"
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

    return (
        <>
            {/* MOdal 1 for ramlingam park */}
            <Modal
                isOpen={modalActive}
                toggle={() => { setModalActive(!modalActive), toggleFunc(!modalActive) }}
            >
                <ModalHeader>
                    <h5>Book this event</h5>
                </ModalHeader>
                <ModalBody>
                    {department === "ramlingamPark" && <div className="row">
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Event</label>
                            <input value={eventInfo?.eventName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Date</label>
                            <Select options={eventdates} onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.value, eventName: eventInfo?.eventName, eventId: eventInfo?.eventId }) }} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
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
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Seat Category</label>
                            <Select options={seatsCategory} className='mb-2' onChange={(e) => { setTotalData({ ...totalData, selectedSeatCategory: e.value, selectedTime: activeShowTimes.value }) }} />
                        </div>
                        {/* setSelectedSeatCapacity(e.capacity) */}
                        {/* {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>} */}
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter No Of Adults</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, adultNum: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter No Of child</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, childNum: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                    </div>}
                    {department === "townhall" && <div className="row">
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select townhall</label>
                            <input value={eventInfo?.townhallName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Date</label>
                            <input
                                type="date"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.target.value, townhallName: eventInfo?.townhallName, townhallId: eventInfo?.townhallId }) }}
                            />
                        </div>
                        <div className="col-lg-12 col-md-6 mt-2">
                            <label>Select Time</label>
                            <Select options={timeSlot} onChange={(e) => { setTotalData({ ...totalData, selectedTime: e.value }) }} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                    </div>}
                    {department === "kalyanMandap" && <div className="row">
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select mandap</label>
                            <input value={eventInfo?.mandapName} type="text" className="otpinput m-0" />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Date</label>
                            <input
                                type="date"
                                className="form_control"
                                placeholder="Number of Adult"
                                name="location"
                                onChange={(e) => { setTotalData({ ...totalData, selectedDate: e.target.value, mandapName: eventInfo?.mandapName, mandapId: eventInfo?.mandapId }) }}
                            />
                        </div>
                        <div className="col-lg-12 col-md-6 mt-2">
                            <label>Select Time</label>
                            <Select options={timeSlot} onChange={(e) => { setTotalData({ ...totalData, selectedTime: e.value }) }} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, userName: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, phoneNumber: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                    </div>}

                </ModalBody>
                <ModalFooter>
                    <button className="main-btn icon-btn" onClick={() => { sendOtp() }}>Book Now</button>
                </ModalFooter>
            </Modal>

            {/* submodal for ramlingam park */}
            <Modal isOpen={subModalActive}>
                <ModalHeader>Enter OTP</ModalHeader>
                <ModalBody style={{ display: "flex", flexDirection: "row" }}>
                    <input type="number" className="otpinput" onChange={(e) => { setEnteredOtp(e.target.value) }} />
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
        </>
    )
}

export default CardFormModal;
