import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Select from "react-select";
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
  const [modalNestedContainer, setModalNestedContainer] = useState(false);
  const [modalNested, setModalNested] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [activeForm, setActiveForm] = useState(props.active);
  useEffect(() => {
    console.log(activeForm);
    console.log(props.active);
  }, [activeForm]);

  const formTypes = [
    "Ramlingam Park",
    "Venue Booking",
    "Townhall Booking",
    "Sports Arena",
    "Ambulance",
    "Hearse",
  ];

  return (
    <div>
      <Tab.Container defaultActiveKey={props.active}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="banner-booking-form"
        >
          <div className="form-inner">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="search-nav mb-10">
                  <Nav
                    as="ul"
                    className="nav nav-tabs"
                    style={{ borderBottom: "0px" }}
                  >
                    {formTypes.map((x) => {
                      return (
                        <li className="nav-item">
                          <Nav.Link
                            as="a"
                            className="c-pointer"
                            eventKey={x}
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveForm(x);
                            }}
                          >
                            <i className="far fa-building" />
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
              <Tab.Pane
                className={`show ${
                  activeForm === "Ramlingam Park" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Category</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>

                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>

                    <input
                      type="time"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Seat Category</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Adult</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Child</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button
                      className="main-btn icon-btn"
                      onClick={() => setModalNestedContainer(true)}
                    >
                      Search Now
                    </button>
                  </div>
                </div>
              </Tab.Pane>
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
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>

                    <input
                      type="time"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Seat Category</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Adult</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Child</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn">Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane
                className={`show ${
                  activeForm === "Venue Booking" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Venue</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>

                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>

                    <input
                      type="time"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Seat Category</label>
                    <Select options={options} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Adult</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Child</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn">Search Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane
                className={`show ${
                  activeForm === "Townhall Booking" ? "active" : ""
                }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Email ID</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Address</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Purpose</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>

                    <input
                      type="date"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>

                    <input
                      type="time"
                      className="form_control"
                      placeholder="Number of Adult"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Number of Persons</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn">Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane
                className={`show ${activeForm === "Ambulance" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Email ID</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Address</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Purpose</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>From</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>To</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn">Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane
                className={`show ${activeForm === "Hearse" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Name</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Phone Number</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Email ID</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Address</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      required
                    />
                  </div>

                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn">Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
            </div>
          </div>
        </form>
      </Tab.Container>

      {/* MOdal */}
      <Modal
        isOpen={modalNestedContainer}
        toggle={() => setModalNestedContainer(!modalNestedContainer)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Select Timing</label>

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
              <label>Select Category</label>
              <input type="number" className="otpinput m-0" />
            </div>
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={modalNested}
            toggle={() => setModalNested(!modalNested)}
            onClosed={
              closeAll ? () => setModalNestedContainer(false) : () => {}
            }
          >
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
                onClick={() => setModalNested(false)}
              >
                Done
              </button>{" "}
              <button
                className="main-btn"
                onClick={() => {
                  setCloseAll(true);
                  setModalNested(false);
                }}
              >
                All Done
              </button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => {
              setCloseAll(false);
              setModalNested(true);
            }}
          >
            Enter OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setModalNestedContainer(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default BookingForm;
