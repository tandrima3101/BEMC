import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SuccessGif from '../../public/assets/images/successGif.gif';


function TicketIssueModal({ activeThree }) {

  // for main modal
  const [containerThree, setContainerThree] = useState(activeThree);

   //for submodal
   const [submodal, setSubmodal] = useState(false);


  useEffect(() =>{
    setContainerThree(activeThree);
  },[activeThree])

  return (
    <>

      <Modal isOpen={containerThree} toggle={() => setContainerThree(!containerThree)}>
        <ModalHeader>Read a Complain</ModalHeader>
        <ModalBody>
            <div className="row">
                <div className="col-lg-12 col-md-6 mt-2">
                    <label>Enter Name</label>
                    <input type="text" className="otpinput m-0" />
                </div>
                <div className="col-lg-12 col-md-6 mt-2">
                    <label>Enter Phone Number</label>
                    <input type="number" className="otpinput m-0" />
                </div>
                <div className="col-lg-12 col-md-6 mt-2">
                    <label>Enter Email Address</label>
                    <input type="text" className="otpinput m-0" />
                </div>
                <div className="col-lg-12 col-md-6 mt-2">
                    <label>Complain Details</label>
                    <textarea className="otpinput m-0 w-100" />
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
              onClick={() => [
                // setCloseAll(true);
                setSubmodal(true),
                setContainerThree(false),
              ]}
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
