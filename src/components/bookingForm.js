import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import Select from "react-select";
import FormModal from "./formModal";
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
  // const [modalNestedContainer, setModalNestedContainer] = useState(false);
  // const [modalNested, setModalNested] = useState(false);
  const showFirstModal = true;
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [activeForm, setActiveForm] = useState(props.active);
  // useEffect(() => {
  //   console.log(modalNested, modalNestedContainer);
  // }, []);

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
                      {
                        if (index == 5)
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
                    })}
                  </Nav>
                </div>
              </div>
            </div>
            <div className="hero-search-form tab-content">
              {/* **************Ramlingam Park************* */}

              <Tab.Pane
                className={`show ${
                  activeForm === "Ramlingam Park" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Event</label>
                    <Select options={options} />
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
                    <label>Select Time</label>
                    <p id="id_work_days">
                      <label>
                        <input type="checkbox" name="work_days" value="2" />
                        <span>9:00AM-12:00PM</span>
                      </label>
                      <label>
                        <input type="checkbox" name="work_days" value="3" />
                        <span>12:0PM-3:00PM</span>
                      </label>
                      <label>
                        <input type="checkbox" name="work_days" value="4" />
                        <span>3:00PM-6:00PM</span>
                      </label>
                    </p>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Seat Category</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button 
                    onClick={() => activeModalFunction()}
                    className="main-btn icon-btn">Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal active={activeModal}/>
              {/* *****************Sports Arena*************** */}
              <Tab.Pane
                className={`show ${
                  activeForm === "Sports Arena" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Sports</label>
                    <Select options={options} />
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
                    <label>Select Time</label>

                    <input
                      type="time"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                    />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn"
                    onClick={()=>activeModalFunctionTwo()}>Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
                <FormModal activeTwo={activeModalTwo}/>
              {/* ************************Kalyan Mandap*************** */}
              <Tab.Pane
                className={`show ${
                  activeForm === "Kalyan Mandap" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Mandap</label>
                    <Select options={options} />
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
                    <Select options={options} />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo()}>Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
              
              {/* *******************TownHall******************* */}
              <Tab.Pane
                className={`show ${
                  activeForm === "Townhall Booking" ? "active" : ""
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
                      <label>
                        <input type="checkbox" name="work_days" value="2" />
                        <span>9:00AM-12:00PM</span>
                      </label>
                      <label>
                        <input type="checkbox" name="work_days" value="3" />
                        <span>12:0PM-3:00PM</span>
                      </label>
                      <label>
                        <input type="checkbox" name="work_days" value="4" />
                        <span>3:00PM-6:00PM</span>
                      </label>
                    </p>
                  </div>

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
                    <button className="main-btn icon-btn" onClick={()=>activeModalFunctionTwo()}>Book Now!</button>
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
                    <button className="main-btn icon-btn" onClick={()=>activeModalFunctionTwo()}>Book Now!</button>
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
