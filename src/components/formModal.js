import React, { useEffect, useState } from "react";
import Link from "next/link";

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

function FormModal({ active , activeTwo }) {
  const [modalNestedContainer, setModalNestedContainer] = useState(active);
  const [modalNestedContainerTwo, setModalNestedContainerTwo] = useState(activeTwo);
  const [modalNested, setModalNested] = useState(false);
  useEffect(() =>{
    // setModalNestedContainer(active)
    setModalNestedContainerTwo(activeTwo)
  },[activeTwo])

  return (
    <>
      {/* MOdal 1 */}
      <Modal
        isOpen={modalNestedContainer}
        toggle={() => setModalNestedContainer(!modalNestedContainer)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of Adults</label>
              <input type="number" className="otpinput m-0" />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of child</label>
              <input type="number" className="otpinput m-0" />
            </div>
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
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={modalNested}
            toggle={() => setModalNested(!modalNested)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => [
              setModalNested(true),
              setModalNestedContainer(false),
            ]}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setModalNestedContainer(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
      {/* MOdal 1-different */}
      <Modal
        isOpen={modalNestedContainerTwo}
        // toggle={() => setModalNestedContainer(!modalNestedContainer)}
      >
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
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={modalNested}
            toggle={() => setModalNested(!modalNested)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => [
              setModalNested(true),
              setModalNestedContainer(false),
            ]}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setModalNestedContainer(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* Modal 2 */}
      <Modal isOpen={modalNested}>
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
            onClick={() => {
              setModalNested(false), setModalNestedContainer(true);
            }}
          >
            Change Number
          </button>{" "}
          <Link href="/booking-details">
            <button
              className="main-btn"
              onClick={() => {
                // setCloseAll(true);
                setModalNested(false);
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

export default FormModal;
