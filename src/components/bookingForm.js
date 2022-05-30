import React, { useEffect, useState } from 'react'
import { Nav, Tab } from "react-bootstrap";
import Select from 'react-select';


function BookingForm(props) {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      const [activeForm,setActiveForm]=useState('Ramlingam Park')
      useEffect(()=>{
        console.log(activeForm)
      },[activeForm])
      
    const formTypes = ['Ramlingam Park', 'Venue Booking', 'Sports Arena', 'Emergency Vehicle'];


    return (
        <div>
            <Tab.Container defaultActiveKey={props.active}>
                <form onSubmit={(e) => e.preventDefault()} className="banner-booking-form">
                    <div className="form-inner">
                        <div className="row align-items-center">
                            <div className="col-lg-12">
                                <div className="search-nav mb-10">
                                    <Nav as="ul" className="nav nav-tabs" style={{ borderBottom: '0px' }}>
                                        {formTypes.map((x) => {
                                            return (
                                                <li className="nav-item">
                                                    <Nav.Link
                                                        as="a"
                                                        className="c-pointer"
                                                        eventKey={x}
                                                        onClick={(e) => {e.preventDefault(); setActiveForm(x)}}
                                                    >
                                                        <i className="far fa-building" />
                                                        {x}
                                                    </Nav.Link>
                                                </li>
                                            )
                                        })}
                                    </Nav>
                                </div>
                            </div>
                        </div>
                        <div className="hero-search-form tab-content">
                            <Tab.Pane className={`show ${activeForm==="Ramlingam Park" ? "active" : "" }`}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Category</label>
                                        <Select options={options} />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Date</label>

                                        <input
                                            type="date"
                                            className="form_control"
                                            placeholder="Number of Adult"
                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Time</label>

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
                                        <label >Number of Adult</label>

                                        <input
                                            type="text"
                                            className="form_control"

                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Number of Child</label>

                                        <input
                                            type="text"
                                            className="form_control"
                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-10 col-md-6 mt-4">
                                        <button className="main-btn icon-btn">
                                            Search Now
                                        </button>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane className={`show ${activeForm==="Venue Booking" ? "active" : "" }`}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Venue</label>
                                        <Select options={options} />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Date</label>

                                        <input
                                            type="date"
                                            className="form_control"
                                            placeholder="Number of Adult"
                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Select Time</label>

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
                                        <label >Number of Adult</label>

                                        <input
                                            type="text"
                                            className="form_control"

                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-6 mt-2">
                                        <label >Number of Child</label>

                                        <input
                                            type="text"
                                            className="form_control"
                                            name="location"
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-10 col-md-6 mt-4">
                                        <button className="main-btn icon-btn">
                                            Search Now
                                        </button>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </div>
                    </div>
                </form>

            </Tab.Container>
        </div>
    )
}
export default BookingForm