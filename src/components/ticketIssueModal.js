import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SuccessGif from '../../public/assets/images/successGif.gif';
import { ModalTitle } from "react-bootstrap";
import { callApi } from "../apiHandlers/callApi";


function TicketIssueModal({ activeThree, activeModal, eventId, parentEventId }) {

  // for main modal
  const [containerThree, setContainerThree] = useState(activeModal);

  //for submodal
  const [submodal, setSubmodal] = useState(false);
  const userData = (JSON.parse(localStorage.getItem('userData')))
  const userId = useSelector((state) => state.login.userId)
  const [grievanceDetails, setGrievanceDetails] = useState()

  useEffect(() => {
    setContainerThree(activeModal);
  }, [activeThree])

  useEffect(() => {
    setGrievanceDetails({ name: userData.firstName.concat(' ').concat(userData.lastName), phoneNumber: userData.phoneNumber, emailAddress: userData.email, userId: JSON.parse(userId), bookingRequestId: eventId, bookingRequestParentId: parentEventId })
  }, [eventId])

  useEffect(() => {
    console.log(grievanceDetails, 'grievanceDetails')
  }, [grievanceDetails])

  const setHandleGrievance = async () => {
    let dataForGrievance = {
      method: 'post',
      url: 'grievance/addGrievance',
      data: grievanceDetails
    }
    let response = await callApi(dataForGrievance)
    console.log(response.data.code, 'codeeeeeeeee')
    if (response.data.code === 201) {
      setSubmodal(true),
        setContainerThree(false),
        activeThree(false)
    }
  }


  return (
    <>

      <Modal isOpen={containerThree} toggle={() => { setContainerThree(!containerThree), activeThree(false) }}>
        <ModalHeader style={{ background: '#3bacb6' }}>
          <ModalTitle style={{ color: '#fff' }}>Enter Your Complain</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-4">
              <label>Your Name</label>
              <input type="text" className="otpinput m-0" value={userData.firstName.concat(' ').concat(userData.lastName)} />
            </div>
            <div className="col-lg-12 col-md-6 mt-4">
              <label>Your Phone Number</label>
              <input type="number" className="otpinput m-0" value={userData.phoneNumber} />
            </div>
            <div className="col-lg-12 col-md-6 mt-4">
              <label>Your Email Address</label>
              <input type="text" className="otpinput m-0" value={userData.email} />
            </div>
            <div className="col-lg-12 col-md-6 mt-4">
              <label>Your Complain Details</label>
              <textarea style={{ padding: '10px' }} className="otpinput m-0 w-100" onChange={(e) => setGrievanceDetails({ ...grievanceDetails, complain: e.target.value })} />
            </div>
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={submodal}
            toggle={() => setSubmodal(!submodal)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <Link href="#">
            <button
              className="main-btn"
              onClick={() => setHandleGrievance()}
            >
              Submit
            </button>
          </Link>
        </ModalFooter>
      </Modal>

      {/* submodal for all except ramlingam park */}

      <Modal isOpen={submodal}>
        <ModalHeader>SuccessFully Submitted</ModalHeader>
        <ModalBody>
          <Image src={SuccessGif} alt='success' />
        </ModalBody>
        <ModalFooter>
          <Link href="#">
            <button
              className="main-btn"
              onClick={() => {
                // setCloseAll(true);
                setSubmodal(false);
              }}
            >
              Done
            </button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TicketIssueModal;
