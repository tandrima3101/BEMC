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

function LoginFormModal({ activeLogin, setLogin }) {

  // for main modal
  const [containerLogin, setContainerLogin] = useState(activeLogin);

  //for submodal
  const [submodalLogin, setSubmodalLogin] = useState(false);
  const [submodal, setSubmodal] = useState(false);


  useEffect(() =>{
    setContainerLogin(activeLogin);
  },[activeLogin])

  return (
    <>

        <Modal
            isOpen={containerLogin}
            toggle={() => setContainerLogin(!containerLogin)}
        >
            <ModalBody>
                <div className="row">
                    <div className="col-lg-12 col-md-6 mt-2">
                        <label>Enter Phone Number</label>
                        <input type="number" className="otpinput m-0" />
                    </div>
                </div>
                <br />
                <div className="text-center m-2"></div>
                <Modal
                    isOpen={submodalLogin}
                    toggle={() => setSubmodalLogin(!submodalLogin)}
                ></Modal>
            </ModalBody>
            <ModalFooter>
                <button
                    className="main-btn"
                    onClick={() => [
                        setSubmodalLogin(true),
                        setContainerLogin(false),
                    ]}
                >
                    Send OTP
                </button>
                <button
                    className="main-btn"
                    onClick={() => setContainerLogin(false)}
                >
                    Cancel
                </button>
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

      {/* submodal for all except ramlingam park */}
      <Modal isOpen={submodalLogin}>
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
              setSubmodalLogin(false), setContainerLogin(true);
            }}
          >
            Change Number
          </button>{" "}
          <Link href="#">
            <button
              className="main-btn"
              onClick={() => [
                // setCloseAll(true);
                setSubmodalLogin(false),
                setLogin(true)

              ]}
            >
              Done
            </button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LoginFormModal;
