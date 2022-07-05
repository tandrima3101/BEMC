import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function FormModal({ active , activeTwo, data }) {
  const [totalData,setTotalData] = useState(data)
console.log(totalData)
  // for main modal
  const [containerOne, setContainerOne] = useState(active);
  const [containerTwo, setContainerTwo] = useState(activeTwo);

// for submodal
  const [submodalOne, setSubmodalOne] = useState(false);
  const [submodalTwo, setSubmodalTwo] = useState(false);

  useEffect(() =>{
    setContainerOne(active)
    setContainerTwo(activeTwo)
    setTotalData(data)
  },[activeTwo,active])

  return (
    <>
      {/* MOdal 1 for ramlingam park */}
      <Modal
        isOpen={containerOne}
        toggle={() => setContainerOne(!containerOne)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of Adults</label>
              <input type="number" className="otpinput m-0" onChange={(e)=>setTotalData({...totalData,adults:(e.target.value)})}/>
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter No Of child</label>
              <input type="number" className="otpinput m-0" onChange={(e)=>setTotalData({...totalData,child:(e.target.value)})} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" onChange={(e)=>setTotalData({...totalData,name:(e.target.value)})} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0" onChange={(e)=>setTotalData({...totalData,contactNumber:(e.target.value)})} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email Address</label>
              <input type="text" className="otpinput m-0" onChange={(e)=>setTotalData({...totalData,email:(e.target.value)})}/>
            </div>
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={submodalOne}
            toggle={() => setSubmodalOne(!submodalOne)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => [
              setSubmodalOne(true),
              setContainerOne(false),
              console.log('modal1,submodal1',submodalOne,containerOne)
            ]}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerOne(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      {/* submodal for ramlingam park */}
      <Modal isOpen={submodalOne}>
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
              // console.log(modalNestedContainer,modalNested)
              setSubmodalOne(false), setContainerOne(true);
            }}
          >
            Change Number
          </button>{" "}
          <Link href="/booking-details">
            <button
              className="main-btn"
              onClick={() => {
                setSubmodalOne(false);
              }}
            >
              Done
            </button>
          </Link>
        </ModalFooter>
      </Modal>



      {/* MOdal 1 for all excep ramlingam park */}
      <Modal
        isOpen={containerTwo}
        toggle={() => setContainerTwo(!containerTwo)}
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
            isOpen={submodalTwo}
            toggle={() => setSubmodalTwo(!submodalTwo)}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <button
            className="main-btn"
            onClick={() => [
              setSubmodalTwo(true),
              setContainerTwo(false),
            ]}
          >
            Send OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerTwo(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
      

      {/* submodal for all except ramlingam park */}
      <Modal isOpen={submodalTwo}>
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
              setSubmodalTwo(false), setContainerTwo(true);
            }}
          >
            Change Number
          </button>{" "}
          <Link href="/booking-details">
            <button
              className="main-btn"
              onClick={() => {
                // setCloseAll(true);
                setSubmodalTwo(false);
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
