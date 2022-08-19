import React, { useEffect, useState } from "react";
import { AiOutlineMobile } from 'react-icons/ai';
import Layout from "../../src/layouts/Layout";
import VideoPopup from "../../src/components/VideoPopup";
import { callApi } from "../../src/apiHandlers/callApi";
import EscalationModal from "../../src/components/EscalationModal";
import TicketIssueModal from "../../src/components/ticketIssueModal";
import PreLoader from "../../src/components/PreLoader";
import SuccessGif from '../../public/assets/images/successGif.gif';
import Image from "next/image";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle
} from "reactstrap";
import AllResolvedMessages from "../../src/components/allResolvedMessages";

const MyComplains = () => {
  const [video, setVideo] = useState(false);
  const [openSubmodal, setOpenSubmodal] = useState(false)
  const [complainDetails, setComplainDetails] = useState(null)
  const [escalationModal, setEscalationModal] = useState(false)
  const [resolvedModal, setResolvedModal] = useState(false)
  const [resolvedMessages,setResolvedMessages] = useState([])
  const [escalationData, setEscalationData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [dayDiff, setDayDiff] = useState([])
  const tempArr = []
  const getAllGrievances = async () => {
    let dataForGrievance = {
      method: 'post',
      url: 'admin/grievacnes/getGrievance'
    }
    let response = await callApi(dataForGrievance)
    console.log(response.data.data.grievances, 'GRIEVANCESSSSSSSSSSS')
    setComplainDetails(response.data.data.grievances)
    for (let i = 0; i < response.data.data.grievances.length; i++) {
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
    if (dayDiff != [] && complainDetails != null) {
      setIsLoaded(true)
    }
  }, [dayDiff, complainDetails])

  console.log(dayDiff, 'complainnn')

  const toggleEscalation = (data) => {
    setEscalationModal(data);
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
    console.log(data, 'datafor grievience')
  }
  console.log(resolvedModal,'resolved')
  return (
    (!isLoaded) ? <PreLoader /> : <Layout>
      {/* <Ratings/> */}
      {video && <VideoPopup close={setVideo} />}
      <div className="service">
        <div className="container-fluid light-bg pt-4 pb-4">
          {(complainDetails?.length > 0) ?
            complainDetails?.map((bookings, index) => {
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
                          <button className="d-flex justify-content-center main-btn mt-2 mx-auto mb-2" onClick={() => { setResolvedModal(true),setResolvedMessages(bookings.resolved) }}>See All Resolved Messages</button>
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
              );
            })
            : <h5>No Complains yet</h5>}
        </div>
        <EscalationModal activeModal={escalationModal} escalationData={escalationData} toggle={toggleEscalation} createEscalation={setHandleEscalation} />
        <AllResolvedMessages activeModal={resolvedModal} resolvedMessages={resolvedMessages}/>
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
      </div>
    </Layout>
  );
}

export default MyComplains;
