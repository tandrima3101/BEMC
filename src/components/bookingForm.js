import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Select from "react-select";
import FormModal from "./formModal";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { callApi } from "../apiHandlers/callApi";
import moment from "moment";

function BookingForm(props) {

  //booking forms value

  const [selectedData, setSelectedData] = useState()
  const [selectedSeatCapacity, setSelectedSeatCapacity] = useState()
  const [bookingDetails, setBookingDetails] = useState({})
  const [activeForm, setActiveForm] = useState(props.active);
  const [pageOf, setPageOf] = useState(props.pageOf);
  const [arrowType, setArrowType] = useState("down");
  const [buttonType, setButtonType] = useState("More");
  const [toggle, setToggle] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalTwo, setActiveModalTwo] = useState(false);
  const [errors, setErrors] = useState({ field: '', message: '' });
  const [arenaData, setArenaData] = useState();
  const [membershipData, setMembershipData] = useState();
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
    { label: 'Ramlingam Park', value: 'ramlingamPark' },
    { label: 'Kalyan Mandap', value: 'kalyanMandap' },
    { label: 'Townhall', value: 'townhall' },
    { label: 'Sports Arena', value: 'sportsArena' },
    { label: 'Ambulance', value: 'ambulance' },
    { label: 'Hearse', value: 'harse' },
  ];
  const [type, setType] = useState(formTypes);
  const formatDate = (value) => {
    return moment(value).format('DD/MM/YYYY');
  }
  //for ramlingam park

  console.log(props.data, 'props.data')
  const options = [];
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].eventName != undefined) {
      options.push({
        label: `${props.data[i].eventName}`,
        value: `${props.data[i].eventName}`,
        parentId:`${props.data[i]._id}`,
        id: `${props.data[i].eventId}`,
        data: props.data[i]
      })
    }
  }
  const seatCategory = [];
  selectedData?.seatCategory?.map((x) => {
    if(x.capacity>0){
      seatCategory.push({
        label: `${x.categoryName} (${x.capacity} seats available)`,
        value: `${x.categoryName}`,
        capacity: x.capacity
      })
    }
  })
  const checkSeats = async (data) => {
    let apiTest = {
      method: 'post',
      url: "ramalingampark/bookingRequest/getSeatAvailability",
      data: {
        eventId: data,
        api_key: "registeruser"
      }
    }
    let response = await callApi(apiTest)
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
  function isBeforeToday(date) {
    let pickedDate=Date.parse(date.replace(/-/g, " "))
    console.log(pickedDate,'date')
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return pickedDate < today;
  }
  
  const dates = [];
  selectedData?.dateAndTime?.map((x, index) => {
    console.log(isBeforeToday(x.date),'isBeforeToday')
    if(!isBeforeToday(x.date)){
      dates.push({
        label: formatDate(x.date),
        value: `${x.date}`,
        key: index
      })
    }   
  })
  const showTimes = []
  selectedData?.dateAndTime?.map((x) => {
    if (bookingDetails.selectedDate === x.date) {
      x.time.map((y, index) => {
        showTimes.push({
          label: `${y}`,
          value: `${y}`,
          key: index
        })
      })
    }
  })
  const [activeShowTimes, setActivrShowTimes] = useState({
    label: '',
    value: '',
    key: ''
  })


  //townhall


  const townhall = [];
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].townhallName != undefined) {
      townhall.push({
        label: `${props.data[i].townhallName}`,
        value: `${props.data[i].townhallName}`,
        parentId:`${props.data[i]._id}`,
        id: `${props.data[i].townhallId}`,
        data: props.data[i]
      })
    }
  }
  //kalyan mandap
  const kalyanMandap = [];
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].mandapName != undefined) {
      kalyanMandap.push({
        label: `${props.data[i].mandapName}`,
        value: `${props.data[i].mandapName}`,
        parentId:`${props.data[i]._id}`,
        id: `${props.data[i].mandapId}`,
        data: props.data[i]
      })
    }
  }
  const timeSlot = [];
  selectedData?.eventDefaultTime?.map((x) => {
    timeSlot.push({
      label: `${x}`,
      value: `${x}`,
    })
  })
  const kalyanMandapPurpose = [
    { value: "Marriage", label: "Marriage" },
    { value: "Birthday", label: "Birthday" },
    { value: "other", label: "Other Reason" },
  ];
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

  //sports arena
  async function fetchActivities() {
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllSportsArena"
    }
    let response = await callApi(apiTest)
    if (response.data.code == 201) {
      setArenaData(response.data.data)
      console.log(response.data.data,'arenaData')
    }
  }
  async function fetchMembership() {
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllMembership"
    }
    let response = await callApi(apiTest)
    if (response.data.code == 201) {
      setMembershipData(response.data.data)
    }
  }
  useEffect(() => {
    fetchActivities();
    fetchMembership();
  }, [])
  let sportsArena = [];
  let sportsMembership = [];
  let sportsMembershipTenure = [];
  let sportsMembershipTimeslots = [];
  // const sevenDaysNext= Date = new Date(new Date.now() - 7 * 24 * 60 * 60 * 1000)  
  // console.log(sevenDaysNext,'sevenDaysNext')
  {
    if (arenaData?.length > 0) {
      for (let i = 0; i < arenaData?.length; i++) {
        sportsArena.push({
          label: arenaData[i]?.arenaName.toUpperCase(),
          value: `${arenaData[i]?.arenaName}`,
          key: `${arenaData[i]?.arenaName}`
        })
      }
    }
  }
  {
    if (membershipData?.length > 0) {
      let tempArr=(membershipData.filter((obj)=>obj?.sportsArena?.arenaName==bookingDetails.selectedArena))
      for(let i =0;i<tempArr.length;i++){
        sportsMembership.push({
          label: tempArr[i].membershipName.toUpperCase(),
          value: `${tempArr[i].membershipName}`,
          key: `${tempArr[i].membershipName}`
        })
      }
    }
  }
  {
    if (membershipData?.length > 0) {
      let tempArr=(membershipData.filter((obj)=>obj.membershipName==bookingDetails.selectedMembership))
      for(let i =0;i<tempArr[0]?.plans?.length;i++){
        sportsMembershipTenure.push({
          label: `${ tempArr[0].plans[i].tenure}  (Rs ${ tempArr[0].plans[i].price}/-)`,
          value: `${ tempArr[0].plans[i].tenure}`,
          key: `${tempArr[0].plans[i].tenure}`,
          price: tempArr[0].plans[i].price,
        })
      }
      for(let i =0;i<tempArr[0]?.defultSlots?.length;i++){
        sportsMembershipTimeslots.push({
          label: `${ tempArr[0].defultSlots[i].startTime}-${ tempArr[0].defultSlots[i].endTime}`,
          value: `${ tempArr[0].defultSlots[i].startTime}-${ tempArr[0].defultSlots[i].endTime}`,
          key: `${tempArr[0].defultSlots[i].startTime}-${ tempArr[0].defultSlots[i].endTime}`,
        })
      }
    }
  }
  ///ambulance
  let journeyDetails = [];
  let ambulanceId;
  let harseId;
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].ambulanceName != undefined || props.data[i].harseName != undefined) {
      for (let j = 0; j < props.data[i]?.price?.length; j++) {
        journeyDetails.push({
          label: `${props.data[i].price[j].key},Price:${props.data[i].price[j].value},(${props.data[i].price[j].extraPrice} Rs will be charged for extra ${props.data[i].price[j]?.thresholdKm} km)`,
          value: props.data[i].price[j],
          price: `${props.data[i].price[j].value}`,
          key: `${props.data[i].price[j].key}`
        })
        console.log(props.data[i].price[j], 'priceeeeeeee')
      }
    }
  }
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].ambulanceName != undefined ){
      ambulanceId=props.data[i]._id;
    }
  }
  for (let i = 0; i < props.data?.length; i++) {
    if (props.data[i].harseName != undefined ){
      harseId=props.data[i]._id
    }
  }
  //form submit 
  console.log(ambulanceId,'ambulance')


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
  const activeModalFunction = (data) => {
    setActiveModal(data)
  }
  const activeModalFunctionTwo = (activeForm) => {
    console.log(errors, 'activeForm')
    if (activeForm == 'townhall') {
      if (bookingDetails && !bookingDetails.townhallName) {
        setErrors({ field: 'townhall', message: 'Please select a townhall' })
      } else if (bookingDetails && !bookingDetails.selectedDate) {
        setErrors({ field: 'townhalldate', message: 'Please select a date' })
      } else if (bookingDetails && !bookingDetails.selectedTime) {
        setErrors({ field: 'townhallTime', message: 'Please select a time' })
      } else {
        setActiveModalTwo(true)
      }
    }
    if (activeForm == 'kalyanMandap') {
      if (bookingDetails && !bookingDetails.mandapName) {
        setErrors({ field: 'mandap', message: 'Please select a mandap' })
      } else if (bookingDetails && !bookingDetails.selectedDate) {
        setErrors({ field: 'mandapdate', message: 'Please select a date' })
      } else if (bookingDetails && !bookingDetails.selectedTime) {
        setErrors({ field: 'mandapTime', message: 'Please select a time' })
      } else {
        setActiveModalTwo(true)
      }
    }
    if (activeForm == 'ambulance') {
      if (bookingDetails && !bookingDetails.from) {
        setErrors({ field: 'from', message: 'Please enter the pickup location' })
      } else if (bookingDetails && !bookingDetails.to) {
        setErrors({ field: 'to', message: 'Please enter the drop location' })
      } else if (bookingDetails && !bookingDetails.selectedScheme) {
        setErrors({ field: 'journey', message: 'Please select your selected journey' })
      } else if (bookingDetails && !bookingDetails.date) {
        setErrors({ field: 'date', message: 'Please select a date' })
      } else if (bookingDetails && !bookingDetails.time) {
        setErrors({ field: 'time', message: 'Please select a time' })
      } else {
        setActiveModalTwo(true)
      }
    }
    if (activeForm == 'harse') {
      if (bookingDetails && !bookingDetails.from) {
        setErrors({ field: 'from', message: 'Please enter the pickup location' })
      } else if (bookingDetails && !bookingDetails.to) {
        setErrors({ field: 'to', message: 'Please enter the drop location' })
      } else if (bookingDetails && !bookingDetails.selectedScheme) {
        setErrors({ field: 'journey', message: 'Please select your selected journey' })
      } else if (bookingDetails && !bookingDetails.date) {
        setErrors({ field: 'date', message: 'Please select a date' })
      } else if (bookingDetails && !bookingDetails.time) {
        setErrors({ field: 'time', message: 'Please select a time' })
      } else {
        setActiveModalTwo(true)
      }
    }
  }
  console.log(errors, 'error')
  //functions for submit

  const onEventSelect = () => {
    if (bookingDetails && !bookingDetails.eventName) { setErrors({ field: 'event', message: 'Please select an event' }) }
    else if (bookingDetails && !bookingDetails.selectedDate) { setErrors({ field: 'date', message: 'Please select a date' }) }
    else if (bookingDetails && activeShowTimes.value == '') { setErrors({ field: 'time', message: 'Please select a time' }) }
    else if (bookingDetails && !bookingDetails.selectedSeatCategory) { setErrors({ field: 'seat', message: 'Please select a perticular seat category' }) }
    else {
      setBookingDetails({ ...bookingDetails, selectedTime: activeShowTimes.value })
      setActiveModal(true)
    }
  }
  useEffect(() => {
    console.log(errors, 'errors')
  }, [errors])
  useEffect(() => {
    console.log(bookingDetails, 'bookingdetails')
  }, [bookingDetails])


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
                                  eventKey={x.value}
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveForm(x.value);
                                  }}
                                >
                                  {x.label}
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
                                  eventKey={x.value}
                                  key={index}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveForm(x.value);
                                  }}
                                >
                                  {x.label}
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
                              eventKey={x.value}
                              key={index}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveForm(x.value);
                              }}
                            >
                              {x.label}
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
                className={`show ${activeForm === "ramlingamPark" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Event<span className="text-danger"><b>*</b></span></label>
                    <Select options={options}
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, eventName: e.value, eventId: e.id,event:e.parentId }), setSelectedData(e.data), checkSeats(e.id) }} />
                  </div>
                  {
                    errors && errors.field == 'event' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date<span className="text-danger"><b>*</b></span></label>
                    <Select options={dates} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedDate: e.value }) }} />
                  </div>
                  {
                    errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
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
                  {
                    errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Seat Category<span className="text-danger"><b>*</b></span></label>
                    <Select className='mb-2' options={seatCategory} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedSeatCategory: e.value, selectedTime: activeShowTimes.value }), setSelectedSeatCapacity(e.capacity) }} />
                  </div>
                  {(selectedSeatCapacity != null) ? <h6 className={(selectedSeatCapacity > 20) ? 'text-success' : 'text-danger'}>{selectedSeatCapacity} seats available</h6> : <h6></h6>}
                  {
                    errors && errors.field == 'seat' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button
                      type="submit"
                      onClick={onEventSelect}
                      className="main-btn icon-btn">Book Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal active={activeModal} toggle={activeModalFunction} data={bookingDetails} adultPrice={selectedData?.price} childPrice={selectedData?.cPrice} pageOf={props.pageOf} activeFormModal={activeForm} />
              {/* *****************Sports Arena*************** */}
              <Tab.Pane
                className={`show ${activeForm === "sportsArena" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Sports Arena</label>
                    <Select options={sportsArena} onChange={(e)=>setBookingDetails({...bookingDetails,selectedArena:e.value})}/>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>SelectMembership Plan</label>
                    <Select options={sportsMembership} onChange={(e)=>setBookingDetails({...bookingDetails,selectedMembership:e.value})}/>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Tenure</label>
                    <Select options={sportsMembershipTenure} onChange={(e)=>setBookingDetails({...bookingDetails,selectedTenure:e.value,price:e.price})}/>
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time Slots</label>
                    <Select options={sportsMembershipTimeslots} />
                  </div>
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Date</label>
                    <input
                      type='date'
                      className="form_control"
                    />
                  </div>
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn"
                      >Subscribe Now</button>
                  </div>
                </div>
              </Tab.Pane>
              <FormModal activeTwo={activeModalTwo} data={bookingDetails} pageOf={props.pageOf} price={selectedData?.price} activeFormModal={activeForm} />
              {/* ************************Kalyan Mandap*************** */}
              <Tab.Pane
                className={`show ${activeForm === "kalyanMandap" ? "active" : ""
                  }`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Mandap</label>
                    <Select options={kalyanMandap} onChange={(e) => { setBookingDetails({ ...bookingDetails, mandapName: e.value, mandapId: e.id,mandap:e.parentId }), setSelectedData(e.data) }} />
                  </div>
                  {
                    errors && errors.field == 'mandap' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
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
                  {
                    errors && errors.field == 'mandapdate' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <Select options={timeSlot} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedTime: e.value }) }} />
                  </div>

                  {
                    errors && errors.field == 'mandapTime' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo(activeForm)}>Book Now</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* *******************TownHall******************* */}
              <Tab.Pane
                className={`show ${activeForm === "townhall" ? "active" : ""
                  }`}
              >

                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Townhall</label>
                    <Select options={townhall} onChange={(e) => { setBookingDetails({ ...bookingDetails, townhallName: e.value, townhall: e.parentId ,townhallId:e.id}), setSelectedData(e.data) }} />
                  </div>
                  {
                    errors && errors.field == 'townhall' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
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
                  {
                    errors && errors.field == 'townhalldate' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Time</label>
                    <Select options={timeSlot} onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedTime: e.value }) }} />
                  </div>
                  {
                    errors && errors.field == 'townhallTime' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo(activeForm)}>Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* ******************Ambulance********************* */}
              <Tab.Pane
                className={`show ${activeForm === "ambulance" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>From</label>
                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, from: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'from' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>To</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, to: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'to' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Your Journey Details</label>
                    <Select options={journeyDetails}
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedScheme: e.value, amountLeftToBePaid: e.price, ambulance:ambulanceId}) }}
                    />
                  </div>
                  {
                    errors && errors.field == 'journey' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Time</label>
                    <input
                      type="time"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value, emergency: 'true' })}
                    />
                  </div>
                  {
                    errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo(activeForm)}>Book Now!</button>
                  </div>
                </div>
              </Tab.Pane>
              {/* ***********************Hearse************** */}
              <Tab.Pane
                className={`show ${activeForm === "harse" ? "active" : ""}`}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>From</label>
                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, from: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'from' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>To</label>

                    <input
                      type="text"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, to: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'to' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Select Your Journey Details</label>
                    <Select options={journeyDetails}
                      onChange={(e) => { setBookingDetails({ ...bookingDetails, selectedScheme: e.value, amountLeftToBePaid: e.price,harse:harseId }) }}
                    />
                  </div>
                  {
                    errors && errors.field == 'journey' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                    />
                  </div>
                  {
                    errors && errors.field == 'date' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-12 col-md-6 mt-2">
                    <label>Time</label>
                    <input
                      type="time"
                      className="form_control"
                      name="location"
                      onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value, emergency: 'true' })}
                    />
                  </div>
                  {
                    errors && errors.field == 'time' && <h6 className="text-danger mt-1">{errors.message}</h6>
                  }
                  <div className="col-lg-10 col-md-6 mt-4">
                    <button className="main-btn icon-btn" onClick={() => activeModalFunctionTwo(activeForm)}>Book Now!</button>
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
