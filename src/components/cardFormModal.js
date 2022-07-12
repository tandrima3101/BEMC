import React, { useEffect, useState } from "react";
import Link from "next/link";
import Select from "react-select";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

function CardFormModal({ activeModal, eventInfo, toggleFunc }) {
    const [totalData, setTotalData] = useState({ event: eventInfo?.eventName })
    const [modalActive, setModalActive] = useState(activeModal)
    const [subModalActive, setSubModalActive] = useState(false)
    const [activeShowTimes, setActiveShowTimes] = useState({label:'',value:'',key:''})
    const showTimes = []
    const eventdates = []
    const seatsCategory = []
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
    
    const selectedDate = eventInfo?.dateAndTime?.find((x) => {
        return (x.date == totalData.date)
        
    })
    selectedDate?.time?.map((x,index) => {
        showTimes.push({
            label: `${x}`,
            value: `${x}`,
            key:index
        })
    })
    useEffect(() => {
        setModalActive(activeModal)
        setTotalData({ ...totalData, event: eventInfo?.eventName })
        console.log(eventInfo, 'event')
    }, [activeModal])
    console.log(totalData,'total Data')

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
                    <div className="row">
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Event</label>
                            <input value={eventInfo?.eventName} type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, child: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Select Date</label>
                            <Select options={eventdates} onChange={(e) => { setTotalData({ ...totalData, date: e.value }) }} />
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
                            <Select options={seatsCategory} className='mb-2' onChange={(e) => { setTotalData({ ...totalData, seat: e.value }) }} />
                        </div>
                        {/* setSelectedSeatCapacity(e.capacity) */}
                        {/* {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>} */}
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter No Of Adults</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, adults: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter No Of child</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, child: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Name</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, name: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Phone Number</label>
                            <input type="number" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, contactNumber: (e.target.value) })} />
                        </div>
                        <div className="col-lg-6 col-md-6 mt-2">
                            <label>Enter Email Address</label>
                            <input type="text" className="otpinput m-0" onChange={(e) => setTotalData({ ...totalData, email: (e.target.value) })} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="main-btn icon-btn" onClick={() => { setSubModalActive(!subModalActive), setModalActive(!modalActive),setTotalData({ ...totalData, time: (activeShowTimes.value) }) }}>Book Now</button>
                </ModalFooter>
            </Modal>

            {/* submodal for ramlingam park */}
            <Modal isOpen={subModalActive}>
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
                            setSubModalActive(!subModalActive)
                        }}
                    >
                        Change Number
                    </button>{" "}
                    <Link href="/booking-details">
                        <button
                            className="main-btn"
                            onClick={() => {
                                setSubModalActive(!subModalActive)
                            }}
                        >
                            Done
                        </button>
                    </Link>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CardFormModal;
