import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import Select from "react-select";
import FormModal from "./formModal";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

function BookingForm(props) {
  // console.log(props.data)
  const current = new Date();

  //booking forms value

  const [selectedData, setSelectedData] = useState()
  const [selectedSeatCapacity, setSelectedSeatCapacity] = useState()
  const [bookingDetails, setBookingDetails] = useState({})

  // useEffect(()=>{
  //   console.log(bookingDetails)
  // },[bookingDetails])

  //options for ramlingam park///

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
  const dates = [];
  console.log(bookingDetails, 'dateAndTimreeeeeeeeeeeee')
  console.log(selectedData, 'dateAndTimreeeeeeeeeeeee')
  selectedData?.dateAndTime?.map((x,index) => {
    dates.push({
      label: `${x.date}`,
      value: `${x.date}`,
      key:index
    })
  })
  const showTimes = []
  selectedData?.dateAndTime?.map((x) => {
    if (bookingDetails.date === x.date) {
      // console.log(x,'selectedDate')
      x.time.map((y,index) => {
        showTimes.push({
          label: `${y}`,
          value: `${y}`,
          key:index
        })
      })
    }
  })

  console.log(showTimes)
  const kalyanMandap = [
    { value: "Biju Patnaik Kalyan Mandap", label: "Biju Patnaik Kalyan Mandap" },
  ];
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


  const [activeShowTimes, setActivrShowTimes] = useState({label:showTimes[0]?.label,
  value:showTimes[0]?.value,
id:showTimes[0]?.key})



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
                    <label>Select Event</label>
                    <Select options={options} onChange={(e) => { setBookingDetails({ ...bookingDetails, event: e.value }), setSelectedData(e.data) }} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>
                    <Select options={dates} onChange={(e) => { setBookingDetails({ ...bookingDetails, date: e.value }) }} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <p id="id_work_days" className="mb-0">
                      {showTimes.map((x) => {
                        return (
                          <label key={x.key}>
                            <input type="checkbox" name="work_days" value={x.label} checked={x.key === activeShowTimes.id} onClick={() => { x.id === activeShowTimes.id ? setActivrShowTimes({}) : setActivrShowTimes(x), setTempState(!tempState) }} />
                            <span>{x.label}</span>
                          </label>
                        )
                      })
                      }
                    </p>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Seat Category</label>
                    <Select className='mb-2' options={seatCategory} onChange={(e) => { setBookingDetails({ ...bookingDetails, seat: e.value }), setSelectedSeatCapacity(e.capacity) }} />
                  </div>
                  {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>}

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button
                      onClick={() => activeModalFunction()}
                      className="main-btn icon-btn">Book Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal active={activeModal} data={bookingDetails} />
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
              <FormModal activeTwo={activeModalTwo} />
              {/* ************************Kalyan Mandap*************** */}
              <Tab.Pane
                className={`show ${activeForm === "Kalyan Mandap" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Mandap</label>
                    <Select options={kalyanMandap} />
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
                  </div> : <></>}
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
                    <label>Select Date</label>

                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <p id="id_work_days">
                      <label onClick={() => setShowSeatsAvailable(true)}>
                        <input type="checkbox" name="work_days" value="2" />
                        <span>9:00AM-11:00AM</span>
                      </label>
                      <label onClick={() => setShowSeatsAvailable(true)}>
                        <input type="checkbox" name="work_days" value="3" />
                        <span>7:0PM-9:00PM</span>
                      </label>
                    </p>
                  </div>
                  {(showSeatsAvailable) ? <small>122 seats available</small> : <small></small>}
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Persons</label>
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
