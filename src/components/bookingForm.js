import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Select from "react-select";
import FormModal from "./formModal";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { callApi } from "../apiHandlers/callApi";
import { useForm } from "react-hook-form";


function BookingForm(props) {
  console.log(props.data, 'propssssssss')

  const current = new Date();

  //booking forms value

  const [selectedData, setSelectedData] = useState()
  const [selectedSeatCapacity, setSelectedSeatCapacity] = useState()
  const [bookingDetails, setBookingDetails] = useState({})

  const options = [];
  for (let i = 0; i < props.data?.length; i++) {
    options.push({
      label: `${props.data[i].eventName}`,
      value: `${props.data[i].eventName}`,
      id: `${props.data[i].eventId}`,
      data: props.data[i]
    })
  }
  const seatCategory = [];
  selectedData?.seatCategory?.map((x) => {
    seatCategory.push({
      label: `${x.categoryName}`,
      value: `${x.categoryName}`,
      capacity: x.capacity
    })
  })
  const timeSlot = [];
    selectedData?.eventDefaultTime?.map((x) => {
      timeSlot.push({
        label: `${x}`,
        value: `${x}`,
      })
    })

  const checkSeats = async (data) => {
    // console.log(data,'iddddddddddddddddddddddd')

    let apiTest = {
      method: 'post',
      url: "ramalingampark/bookingRequest/getSeatAvailability",
      data: {
        eventId: data,
        api_key: "registeruser"
      }
    }
    let response = await callApi(apiTest)
    // console.log(response.data,'dataa')
    if (response.data.status == 'SUCCESS') {
      response.data.data.map((x) => {
        seatCategory.push({
          label: `${x.categoryName}`,
          value: `${x.categoryName}`,
          capacity: x.capacity,
          available: x.available
        })
      })
    }
  }
  const dates = [];
  selectedData?.dateAndTime?.map((x, index) => {
    dates.push({
      label: `${x.date}`,
      value: `${x.date}`,
      key: index
    })
  })
  const showTimes = []
  selectedData?.dateAndTime?.map((x) => {
    if (bookingDetails.selectedDate === x.date) {
      // console.log(x,'selectedDate')
      x.time.map((y, index) => {
        showTimes.push({
          label: `${y}`,
          value: `${y}`,
          key: index
        })
      })
    }
  })

  // console.log(showTimes)
  // const kalyanMandap = [
  //   { value: "Biju Patnaik Kalyan Mandap", label: "Biju Patnaik Kalyan Mandap" },
  // ];
  const townhall = [];
  for (let i = 0; i < props.data?.length; i++) {
    townhall.push({
      label: `${props.data[i].townhallName}`,
      value: `${props.data[i].townhallName}`,
      id: `${props.data[i].townhallId}`,
      data: props.data[i]
    })
  }
  const kalyanMandap = [];
  for (let i = 0; i < props.data?.length; i++) {
    kalyanMandap.push({
      label: `${props.data[i].mandapName}`,
      value: `${props.data[i].mandapName}`,
      id: `${props.data[i].mandapId}`,
      data: props.data[i]
    })
  }
  const sports = [
    { value: "Badminton", label: "Badminton" },
    { value: "Table Tennis", label: "Table Tennis" },
  ];
  const sportsMembership = [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
  ];
  const kalyanMandapPurpose = [
    { value: "Marriage", label: "Marriage" },
    { value: "Birthday", label: "Birthday" },
    { value: "other", label: "Other Reason" },
  ];


  const [activeShowTimes, setActivrShowTimes] = useState({
    label: '',
    value: '',
    key: ''
  })

  // console.log(bookingDetails)

  const [activeForm, setActiveForm] = useState(props.active);
  const [pageOf, setPageOf] = useState(props.pageOf);


  const newType = [
    "Ramlingam Park",
    "Kalyan Mandap",
    "Townhall Booking",
    "Sports Arena",
    "Ambulance",
    "Hearse",
    "Ramlingam Park",
    "Venue Booking",
    "Townhall Booking",
  ];
  const formTypes = [
    "Ramlingam Park",
    "Kalyan Mandap",
    "Townhall Booking",
    "Sports Arena",
    "Ambulance",
    "Hearse",
  ];
  const [type, setType] = useState(formTypes);
  const [arrowType, setArrowType] = useState("down");
  const [buttonType, setButtonType] = useState("More");
  const [toggle, setToggle] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalTwo, setActiveModalTwo] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);
  const [tempState, setTempState] = useState(false);
  const [showSeatsAvailable, setShowSeatsAvailable] = useState(false)


  /*************set purpose********** */
  const setPurpose = (e) => {
    const selectedValue = e;
    const setValue = [];
    if (selectedValue) {
      Object.values(selectedValue).map((i) => {
        setValue.push(i.value)
      })
    }
    for (let i = 0; i < setValue.length; i++) {
      if (setValue[i] == 'other') { setShowTextarea(true) }
    }
  }

  const handleNav = () => {
    setToggle(!toggle);
    {
      !toggle ? setType(newType) : setType(formTypes);
    }
    {
      !toggle ? setArrowType("up") : setArrowType("down");
    }
    {
      !toggle ? setButtonType("Less") : setButtonType("More");
    }
  };



  const activeModalFunction = () => {
    setActiveModal(true)
  }
  const activeModalFunctionTwo = () => {
    setActiveModalTwo(true)
  }

  //state for useForm
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm();

  //functions for submit

  const onEventSelect = () => {
    activeModalFunction(), setBookingDetails({ ...bookingDetails, selectedTime: activeShowTimes.value })
  }
  return (
    <div>
      <Tab.Container defaultActiveKey={props.active}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="banner-booking-form"
        >
          <div className="form-inner">
            <div className="row align-items-start">
              <div className="col-lg-12">
                <div className="search-nav mb-10">
                  <Nav
                    as="ul"
                    className="nav nav-tabs"
                    style={{ borderBottom: "0px" }}
                  >
                    {type?.map((x, index) => {
                      if (pageOf === "index") {

                        if (index == 5) {
                          return (
                            <>
                              <li className="nav-item button-nav">
                                <Nav.Link
                                  as="a"
                                  className="c-pointer"
                                  eventKey={x}
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveForm(x);
                                  }}
                                >
                                  {x}
                                </Nav.Link>
                                <button
                                  className="down-btn"
                                  onClick={() => handleNav()}
                                >
                                  <i className={`ti-arrow-${arrowType}`}></i>
                                </button>
                              </li>
                              <li className="nav-item mobile-view-button">
                                <Nav.Link
                                  as="a"
                                  className="c-pointer"
                                  eventKey={x}
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveForm(x);
                                  }}
                                >
                                  {x}
                                </Nav.Link>
                                <button
                                  className="down-btn-transparent"
                                  onClick={() => handleNav()}
                                >
                                  See {buttonType}
                                </button>
                              </li>
                            </>
                          );
                        }
                        return (
                          <li className="nav-item">
                            <Nav.Link
                              as="a"
                              className="c-pointer"
                              eventKey={x}
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveForm(x);
                              }}
                            >
                              {x}
                            </Nav.Link>
                          </li>
                        );
                      }
                    })}
                  </Nav>
                </div>
              </div>
            </div>
            <div className="hero-search-form tab-content">
              {/* **************Ramlingam Park************* */}
              <Tab.Pane
                className={`show ${activeForm === "Ramlingam Park" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Event<span className="text-danger"><b>*</b></span></label>
                    <Select options={options}
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, eventName: e.value, eventId: e.id }), setSelectedData(e.data), checkSeats(e.id) }} />
                  </div>
                  {errors1.event?.type === 'required' && <small className="text-danger mt-2">Please select an event</small>}

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date<span className="text-danger"><b>*</b></span></label>
                    <Select options={dates} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedDate: e.value }) }} />
                  </div>
                  {errors1.date?.type === 'required' && <small className="text-danger mt-2">Please select a date</small>}
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time<span className="text-danger"><b>*</b></span></label>
                    <p id="id_work_days" className="mb-0">
                      {showTimes.map((x) => {
                        return (
                          <label key={x.key}>
                            <input type="checkbox" name="work_days" value={x.label} checked={x.key === activeShowTimes.key} onClick={() => { x.key === activeShowTimes.key ? setActivrShowTimes({}) : setActivrShowTimes(x) }} />
                            <span>{x.label}</span>
                          </label>
                        )
                      })
                      }
                    </p>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Seat Category<span className="text-danger"><b>*</b></span></label>
                    <Select className='mb-2' options={seatCategory} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedSeatCategory: e.value,selectedTime:activeShowTimes.value }), setSelectedSeatCapacity(e.capacity) }} />
                  </div>
                  {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>}
                  {errors1.seatCategory?.type === 'required' && <small className="text-danger mt-2">Please select a seat category</small>}

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button
                      onClick={handleSubmit1(onEventSelect)}
                      className="main-btn icon-btn">Book Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal active={activeModal} data={bookingDetails} adultPrice={selectedData?.price} childPrice={selectedData?.cPrice} pageOf={props.pageOf} />
              {/* *****************Sports Arena*************** */}
              <Tab.Pane
                className={`show ${activeForm === "Sports Arena" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Sports</label>
                    <Select options={sports} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>

                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"

                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Membership Plan</label>

                    <Select options={sportsMembership} />

                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn"
                      onClick={() => activeModalFunctionTwo()}>Subscribe Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal activeTwo={activeModalTwo} data={bookingDetails} pageOf={props.pageOf} price={selectedData?.price}/>
              {/* ************************Kalyan Mandap*************** */}
              <Tab.Pane
                className={`show ${activeForm === "Kalyan Mandap" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Mandap</label>
                    <Select options={kalyanMandap} onChange={(e) => { setBookingDetails({ ...bookingDetails, mandapName: e.value,mandapId: e.id }) ,setSelectedData(e.data)}} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>
                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedDate: e.target.value }) }}
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <Select options={timeSlot} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedTime: e.value }) }} />
                  </div>
                  {/* <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Purspose</label>
                    <Select options={kalyanMandapPurpose} isMulti id="purpose-kalyan-mandap" onChange={(e) => setPurpose(e)} />
                  </div>
                  {(showTextarea) ? <div className="col-lg-12 col-md-6 mt-2">
                    <textarea placeholder="Write your own reason here..." className="form_control" id="dependable-texarea"
                      style={{
                        height: 'auto',
                        outline: '1px solid #ccc'
                      }}
                    ></textarea>
                  </div> : <></>} */}
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo()}>Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* *******************TownHall******************* */}
              <Tab.Pane
                className={`show ${activeForm === "Townhall Booking" ? "active" : ""
                  }`}
              >

                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Townhall</label>
                    <Select options={townhall} onChange={(e) => { setBookingDetails({ ...bookingDetails, townhallName: e.value ,townhallId:e.id}) ,setSelectedData(e.data)}} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>
                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedDate: e.target.value }) }}
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <Select options={timeSlot} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedTime: e.value }) }} />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo()}>Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* ******************Ambulance********************* */}
              <Tab.Pane
                className={`show ${activeForm === "Ambulance" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>From</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>To</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Date</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"

                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Time</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2 d-flex justify-content-start align-items-center">
                    <input type="checkbox" style={{ maxWidth: "4%" }} />
                    <label className="mb-0">Is it a case of Emergency?</label>
                  </div>

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo()}>Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* ***********************Hearse************** */}
              <Tab.Pane
                className={`show ${activeForm === "Hearse" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>From</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>To</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Date</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"

                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Time</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                    />
                  </div>

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo()}>Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
            </div>
          </div>
        </form>
      </Tab.Container>
    </div>
  );
}
export default BookingForm;
