import React, { useEffect, useState } from "react";
import { AiOutlineMobile } from 'react-icons/ai';
import Layout from "../../src/layouts/Layout";
import VideoPopup from "../../src/components/VideoPopup";
import { callApi } from "../../src/apiHandlers/callApi";
import EscalationModal from "../../src/components/EscalationModal";
import PreLoader from "../../src/components/PreLoader";
import SuccessGif from '../../public/assets/images/successGif.gif';
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import AllResolvedMessages from "../../src/components/allResolvedMessages";

const MyComplains = () => {
  const [video, setVideo] = useState(false);
  const [openSubmodal, setOpenSubmodal] = useState(false)
  const [escalationModal, setEscalationModal] = useState(false)
  const [resolvedModal, setResolvedModal] = useState(false)
  const [resolvedMessages, setResolvedMessages] = useState([])
  const [escalationData, setEscalationData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dayDiff, setDayDiff] = useState([])
  const [ramlingamGrievience, setRamlingamGrievience] = useState()
  const [townhallGrievience, setTownhallGrievience] = useState()
  const [mandapGrievience, setMandapGrievience] = useState()
  const [ambulanceGrievience, setAmbulanceGrievience] = useState()
  const [hearseGrievience, setHearseGrievience] = useState()

  const tempArr = []
  let tempRamlingam = []
  let tempTownhall = []
  let tempMandap = []
  let tempAmbulance = []
  let tempHearse = []

  const getAllGrievances = async () => {
    let dataForGrievance = {
      method: 'post',
      url: 'admin/grievacnes/getGrievance'
    }
    let response = await callApi(dataForGrievance)
    for (let i = 0; i < response.data.data.grievances.length; i++) {
      if (response.data.data.grievances[i].bookingRequestParentId.department == "ramlingamPark") {
        tempRamlingam.push(response.data.data.grievances[i])
      }
      if (response.data.data.grievances[i].bookingRequestParentId.department == "townhall") {
        tempTownhall.push(response.data.data.grievances[i])
      }
      if (response.data.data.grievances[i].bookingRequestParentId.department == "kalyanMandap") {
        tempMandap.push(response.data.data.grievances[i])
      }
      if (response.data.data.grievances[i].bookingRequestParentId.department == "ambulance") {
        tempAmbulance.push(response.data.data.grievances[i])
      }
      if (response.data.data.grievances[i].bookingRequestParentId.department == "harse") {
        tempHearse.push(response.data.data.grievances[i])
      }
      setRamlingamGrievience(tempRamlingam)
      setTownhallGrievience(tempTownhall)
      setMandapGrievience(tempMandap)
      setAmbulanceGrievience(tempAmbulance)
      setHearseGrievience(tempHearse)
      const oneDay = 24 * 60 * 60 * 1000
      let currentDate = new Date()
      let grvDate;
      if (response.data.data.grievances[i].status == 'Resolved') {
        grvDate = new Date(response.data.data.grievances[i].resolvedDate[response.data.data.grievances[i].resolvedDate.length - 1])
      } else if (response.data.data.grievances[i].status == 'Escalated') {
        grvDate = new Date(response.data.data.grievances[i].escalationDate[response.data.data.grievances[i].escalationDate.length - 1])
      } else {
        grvDate = new Date(response.data.data.grievances[i].createdAt)
      }
      const diffDays = Math.round(Math.abs((grvDate - currentDate) / oneDay));
      tempArr.push(diffDays)
    }
    setDayDiff(tempArr)
  }
  useEffect(async () => {
    getAllGrievances()
  }, [])
  useEffect(() => {
    if (dayDiff != []) {
      setIsLoaded(true)
    }
  }, [dayDiff])
  const toggleEscalation = (data) => {
    setEscalationModal(data);
  }
  const toggleResolved = (data) => {
    setResolvedModal(data);
  }
  const checkDateFunction = (value, data) => {
    if (value < 3) {
      setEscalationModal(true)
      setEscalationData(data)
    }
  }
  const setHandleEscalation = async (data) => {
    let dataForEscalation = {
      method: 'post',
      url: 'admin/grievacnes/changeStatusGrievance',
      data: data
    }
    console.log(escalationData?._id, 'dataaaaaaaaaaa')
    let response = await callApi(dataForEscalation)
    if (response.data.code === 201) {
      setOpenSubmodal(true)
      setContainerEscalation(false),
      toggle(false)
      getAllGrievances()
    }
  }


  return (
    (!isLoaded) ? <PreLoader /> : 
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      <div className="container-fluid light-bg pt-4 pb-4">
        <div className="row">
          <div className="col-lg-10 pr-4 mx-auto">
            <Accordion allowZeroExpanded>
              <AccordionItem uuid="ramlingamPark">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h5 className="mb-0 ml-3">Ramlingam Park</h5>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {(ramlingamGrievience?.length > 0) ?
                    ramlingamGrievience?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                            <div className="booking-card booking-card-complain p-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="row booking-card-left booking-card-left-complain" style={{ height: '100%' }}>
                                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                      <img src={bookings.bookingRequestParentId?.qrUrl} />
                                    </div>
                                    <div className="col-lg-8 pl-0" style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      paddingRight: '33px',
                                    }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="ticket-details  d-flex flex-column">
                                          <h6 className="m-0 mb-2">
                                            <AiOutlineMobile /> &nbsp;
                                            <b>{bookings?.bookingRequestParentId?.phoneNumber}</b>
                                          </h6>
                                          <h6 className="m-0 mb-2 text-center">
                                            {bookings?.bookingRequestId}
                                          </h6>
                                        </div>
                                        <div className="ticket-details d-flex justify-content-between flex-column">
                                          <h6 className="m-0 text-center">
                                            <b>{bookings?.bookingRequestParentId?.eventName || bookings.bookingRequestParentId?.townhallName || bookings.bookingRequestParentId?.mandapName || bookings.bookingRequestParentId?.ambulanceName || bookings.bookingRequestParentId?.harseName}</b>
                                          </h6>
                                          <h6 className="text-center m-0 mb-2">
                                            <b>{bookings?.bookingRequestParentId?.eventId || bookings.bookingRequestParentId?.townhallId || bookings.bookingRequestParentId?.mandapId}</b>
                                          </h6>
                                        </div>
                                      </div>
                                      <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                        {bookings.complain}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 qr-section">
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Resolved Text</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 2]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  </>
                                  }
                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>Cancelled</span>
                                  }
                                  {bookings.status === 'Resolved' && <><span className="escalate-badge escalate-badge-resolved"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    <h6 className="text-center"><b>Last Resolved Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 1]}</h6></>
                                  }
                                  <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true), setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
                                </div>
                                <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                                  {bookings.status === 'Resolved' &&
                                    <>
                                      <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                      <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 2]}</h6>
                                      <span className="escalate-badge escalate-badge-success mt-2"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    </>
                                  }
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 1]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                  </>
                                  }

                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                                  }



                                  <button className="d-flex justify-content-center main-btn mt-4 mx-auto mb-4" id="escalate-btn" onClick={() => checkDateFunction(dayDiff[index], bookings)} disabled={(dayDiff[index] > 3) ? true : false}>ESCALATE</button>
                                  {
                                    (dayDiff[index] > 3) ?
                                      <>
                                        {dayDiff[index] == 0 ? bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised today</h6> : <h6 className="mt-1 text-center">{bookings.status} today</h6> : bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised {dayDiff[index]} days ago </h6> : <h6 className="mt-1 text-center">{bookings.status} {dayDiff[index]} Days ago</h6>}
                                        <h6 className="mt-1 mb-1 text center">Minimum 3 Days required to Reescalate</h6>
                                      </> : <></>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h6>No Complains Yet</h6>}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="townhall">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h5 className="mb-0 ml-3">Townhall</h5>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {(townhallGrievience?.length > 0) ?
                    townhallGrievience?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                            <div className="booking-card booking-card-complain p-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="row booking-card-left booking-card-left-complain" style={{ height: '100%' }}>
                                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                      <img src={bookings.bookingRequestParentId?.qrUrl} />
                                    </div>
                                    <div className="col-lg-8 pl-0" style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      paddingRight: '33px',
                                    }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="ticket-details  d-flex flex-column">
                                          <h6 className="m-0 mb-2">
                                            <AiOutlineMobile /> &nbsp;
                                            <b>{bookings?.bookingRequestParentId?.phoneNumber}</b>
                                          </h6>
                                          <h6 className="m-0 mb-2 text-center">
                                            {bookings?.bookingRequestId}
                                          </h6>
                                        </div>
                                        <div className="ticket-details d-flex justify-content-between flex-column">
                                          <h6 className="m-0 text-center">
                                            {bookings?.bookingRequestParentId?.eventName || bookings.bookingRequestParentId?.townhallName || bookings.bookingRequestParentId?.mandapName || bookings.bookingRequestParentId?.ambulanceName || bookings.bookingRequestParentId?.harseName}
                                          </h6>
                                          <h5 className="text-center m-0 mb-2">
                                            <b>{bookings?.bookingRequestParentId?.eventId || bookings.bookingRequestParentId?.townhallId || bookings.bookingRequestParentId?.mandapId}</b>
                                          </h5>
                                        </div>
                                      </div>
                                      <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                        {bookings.complain}
                                      </p>
                                    </div>
                                  </div>

                                </div>
                                <div className="col-lg-3 qr-section">
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Resolved Text</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 2]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  </>
                                  }
                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>Cancelled</span>
                                  }
                                  {bookings.status === 'Resolved' && <><span className="escalate-badge escalate-badge-resolved"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    <h6 className="text-center"><b>Last Resolved Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 1]}</h6></>
                                  }
                                  <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true), setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
                                </div>
                                <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                                  {bookings.status === 'Resolved' &&
                                    <>
                                      <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                      <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 2]}</h6>
                                      <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    </>
                                  }
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 1]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                  </>
                                  }

                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                                  }



                                  <button className="d-flex justify-content-center main-btn mt-4 mx-auto mb-4" id="escalate-btn" onClick={() => checkDateFunction(dayDiff[index], bookings)} disabled={(dayDiff[index] > 3) ? true : false}>ESCALATE</button>
                                  {
                                    (dayDiff[index] > 3) ?
                                      <>
                                        {dayDiff[index] == 0 ? bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised today</h6> : <h6 className="mt-1 text-center">{bookings.status} today</h6> : bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised {dayDiff[index]} days ago </h6> : <h6 className="mt-1 text-center">{bookings.status} {dayDiff[index]} Days ago</h6>}
                                        <h6 className="mt-1 mb-1 text center">Minimum 3 Days required to Reescalate</h6>
                                      </> : <></>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h6>No Complains Yet</h6>}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="kalyanMandap">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h5 className="mb-0 ml-3">Kalyan Mandap</h5>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {(mandapGrievience?.length > 0) ?
                    mandapGrievience?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                            <div className="booking-card booking-card-complain p-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="row booking-card-left booking-card-left-complain" style={{ height: '100%' }}>
                                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                      <img src={bookings.bookingRequestParentId?.qrUrl} />
                                    </div>
                                    <div className="col-lg-8 pl-0" style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      paddingRight: '33px',
                                    }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="ticket-details  d-flex flex-column">
                                          <h5 className="m-0 mb-2">
                                            <AiOutlineMobile /> &nbsp;
                                            <b>{bookings?.bookingRequestParentId?.phoneNumber}</b>
                                          </h5>
                                          <h5 className="m-0 mb-2 text-center">
                                            {bookings?.bookingRequestId}
                                          </h5>
                                        </div>
                                        <div className="ticket-details d-flex justify-content-between flex-column">
                                          <h5 className="m-0 text-center">
                                            {bookings?.bookingRequestParentId?.eventName || bookings.bookingRequestParentId?.townhallName || bookings.bookingRequestParentId?.mandapName || bookings.bookingRequestParentId?.ambulanceName || bookings.bookingRequestParentId?.harseName}
                                          </h5>
                                          <h5 className="text-center m-0 mb-2">
                                            <b>{bookings?.bookingRequestParentId?.eventId || bookings.bookingRequestParentId?.townhallId || bookings.bookingRequestParentId?.mandapId}</b>
                                          </h5>
                                        </div>
                                      </div>
                                      <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                        {bookings.complain}
                                      </p>
                                    </div>
                                  </div>

                                </div>
                                <div className="col-lg-3 qr-section">
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Resolved Text</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 2]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  </>
                                  }
                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>Cancelled</span>
                                  }
                                  {bookings.status === 'Resolved' && <><span className="escalate-badge escalate-badge-resolved"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    <h6 className="text-center"><b>Last Resolved Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 1]}</h6></>
                                  }
                                  <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true), setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
                                </div>
                                <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                                  {bookings.status === 'Resolved' &&
                                    <>
                                      <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                      <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 2]}</h6>
                                      <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    </>
                                  }
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 1]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                  </>
                                  }

                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                                  }



                                  <button className="d-flex justify-content-center main-btn mt-4 mx-auto mb-4" id="escalate-btn" onClick={() => checkDateFunction(dayDiff[index], bookings)} disabled={(dayDiff[index] > 3) ? true : false}>ESCALATE</button>
                                  {
                                    (dayDiff[index] > 3) ?
                                      <>
                                        {dayDiff[index] == 0 ? bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised today</h6> : <h6 className="mt-1 text-center">{bookings.status} today</h6> : bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised {dayDiff[index]} days ago </h6> : <h6 className="mt-1 text-center">{bookings.status} {dayDiff[index]} Days ago</h6>}
                                        <h6 className="mt-1 mb-1 text center">Minimum 3 Days required to Reescalate</h6>
                                      </> : <></>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h6>No Complains Yet</h6>}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="ambulance">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h5 className="mb-0 ml-3">Ambulance</h5>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {(ambulanceGrievience?.length > 0) ?
                    ambulanceGrievience?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                            <div className="booking-card booking-card-complain p-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="row booking-card-left booking-card-left-complain" style={{ height: '100%' }}>
                                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                      <img src={bookings.bookingRequestParentId?.qrUrl} />
                                    </div>
                                    <div className="col-lg-8 pl-0" style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      paddingRight: '33px',
                                    }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="ticket-details  d-flex flex-column">
                                          <h5 className="m-0 mb-2">
                                            <AiOutlineMobile /> &nbsp;
                                            <b>{bookings?.bookingRequestParentId?.phoneNumber}</b>
                                          </h5>
                                          <h5 className="m-0 mb-2 text-center">
                                            {bookings?.bookingRequestId}
                                          </h5>
                                        </div>
                                        <div className="ticket-details d-flex justify-content-between flex-column">
                                          <h5 className="m-0 text-center">
                                            {bookings?.bookingRequestParentId?.eventName || bookings.bookingRequestParentId?.townhallName || bookings.bookingRequestParentId?.mandapName || bookings.bookingRequestParentId?.ambulanceName || bookings.bookingRequestParentId?.harseName}
                                          </h5>
                                          <h5 className="text-center m-0 mb-2">
                                            <b>{bookings?.bookingRequestParentId?.eventId || bookings.bookingRequestParentId?.townhallId || bookings.bookingRequestParentId?.mandapId}</b>
                                          </h5>
                                        </div>
                                      </div>
                                      <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                        {bookings.complain}
                                      </p>
                                    </div>
                                  </div>

                                </div>
                                <div className="col-lg-3 qr-section">
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Resolved Text</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 2]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  </>
                                  }
                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>Cancelled</span>
                                  }
                                  {bookings.status === 'Resolved' && <><span className="escalate-badge escalate-badge-resolved"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    <h6 className="text-center"><b>Last Resolved Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 1]}</h6></>
                                  }
                                  <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true), setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
                                </div>
                                <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                                  {bookings.status === 'Resolved' &&
                                    <>
                                      <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                      <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 2]}</h6>
                                      <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    </>
                                  }
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 1]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                  </>
                                  }

                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                                  }



                                  <button className="d-flex justify-content-center main-btn mt-4 mx-auto mb-4" id="escalate-btn" onClick={() => checkDateFunction(dayDiff[index], bookings)} disabled={(dayDiff[index] > 3) ? true : false}>ESCALATE</button>
                                  {
                                    (dayDiff[index] > 3) ?
                                      <>
                                        {dayDiff[index] == 0 ? bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised today</h6> : <h6 className="mt-1 text-center">{bookings.status} today</h6> : bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised {dayDiff[index]} days ago </h6> : <h6 className="mt-1 text-center">{bookings.status} {dayDiff[index]} Days ago</h6>}
                                        <h6 className="mt-1 mb-1 text center">Minimum 3 Days required to Reescalate</h6>
                                      </> : <></>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h6>No Complains Yet</h6>}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem uuid="hearse">
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <h5 className="mb-0 ml-3">Hearse</h5>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {(hearseGrievience?.length > 0) ?
                    hearseGrievience?.map((bookings, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-12 pr-4" key={bookings.bookingRequestId}>
                            <div className="booking-card booking-card-complain p-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="row booking-card-left booking-card-left-complain" style={{ height: '100%' }}>
                                    <div className="col-lg-4 d-flex justify-content-center align-items-center">
                                      <img src={bookings.bookingRequestParentId?.qrUrl} />
                                    </div>
                                    <div className="col-lg-8 pl-0" style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      paddingRight: '33px',
                                    }}>
                                      <div className="d-flex justify-content-between">
                                        <div className="ticket-details  d-flex flex-column">
                                          <h5 className="m-0 mb-2">
                                            <AiOutlineMobile /> &nbsp;
                                            <b>{bookings?.bookingRequestParentId?.phoneNumber}</b>
                                          </h5>
                                          <h5 className="m-0 mb-2 text-center">
                                            {bookings?.bookingRequestId}
                                          </h5>
                                        </div>
                                        <div className="ticket-details d-flex justify-content-between flex-column">
                                          <h5 className="m-0 text-center">
                                            {bookings?.bookingRequestParentId?.eventName || bookings.bookingRequestParentId?.townhallName || bookings.bookingRequestParentId?.mandapName || bookings.bookingRequestParentId?.ambulanceName || bookings.bookingRequestParentId?.harseName}
                                          </h5>
                                          <h5 className="text-center m-0 mb-2">
                                            <b>{bookings?.bookingRequestParentId?.eventId || bookings.bookingRequestParentId?.townhallId || bookings.bookingRequestParentId?.mandapId}</b>
                                          </h5>
                                        </div>
                                      </div>
                                      <p style={{ textAlign: 'justify', padding: '0 1rem', borderRadius: '16px' }}>
                                        {bookings.complain}
                                      </p>
                                    </div>
                                  </div>

                                </div>
                                <div className="col-lg-3 qr-section">
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Resolved Text</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 2]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  </>
                                  }
                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>Not Resolved Yet</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>Cancelled</span>
                                  }
                                  {bookings.status === 'Resolved' && <><span className="escalate-badge escalate-badge-resolved"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    <h6 className="text-center"><b>Last Resolved Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.resolved[bookings.resolved.length - 1]}</h6></>
                                  }
                                  <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true), setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
                                </div>
                                <div className="col-lg-3 d-flex flex-column justify-content-center" style={{ borderLeft: '1px solid #ccc', padding: '30px' }}>
                                  {bookings.status === 'Resolved' &&
                                    <>
                                      <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                      <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 2]}</h6>
                                      <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                    </>
                                  }
                                  {bookings.status === 'Escalated' && <>
                                    <h6 className="text-center"><b>Last Escalation Message</b></h6>
                                    <h6 className="text-center mt-3 text-capitalize">{bookings.escalation[bookings.escalation.length - 1]}</h6>
                                    <span className="escalate-badge escalate-badge-success"><i className="ti-check mr-2"></i>{bookings.status}</span>
                                  </>
                                  }

                                  {bookings.status === 'Pending' && <span className="escalate-badge escalate-badge-warning"><i className="ti-time mr-2"></i>{bookings.status}</span>
                                  }
                                  {bookings.status === 'Cancelled' && <span className="escalate-badge escalate-badge-danger"><i className="ti-trash mr-2"></i>{bookings.status}</span>
                                  }



                                  <button className="d-flex justify-content-center main-btn mt-4 mx-auto mb-4" id="escalate-btn" onClick={() => checkDateFunction(dayDiff[index], bookings)} disabled={(dayDiff[index] > 3) ? true : false}>ESCALATE</button>
                                  {
                                    (dayDiff[index] > 3) ?
                                      <>
                                        {dayDiff[index] == 0 ? bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised today</h6> : <h6 className="mt-1 text-center">{bookings.status} today</h6> : bookings.status == 'Pending' ? <h6 className="mt-1 text-center">Complain Raised {dayDiff[index]} days ago </h6> : <h6 className="mt-1 text-center">{bookings.status} {dayDiff[index]} Days ago</h6>}
                                        <h6 className="mt-1 mb-1 text center">Minimum 3 Days required to Reescalate</h6>
                                      </> : <></>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    }) : <h6>No Complains Yet</h6>}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <EscalationModal activeModal={escalationModal} escalationData={escalationData} toggle={toggleEscalation} createEscalation={setHandleEscalation} />
      <AllResolvedMessages activeModal={resolvedModal} resolvedMessages={resolvedMessages} toggle={toggleResolved} />
      <Modal isOpen={openSubmodal}>
        <ModalBody>
          <Image src={SuccessGif} alt='success' />
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => {
              setOpenSubmodal(false);
            }}
          >
            Done
          </button>
        </ModalFooter>
      </Modal>
    </Layout>
  );
}

export default MyComplains;
