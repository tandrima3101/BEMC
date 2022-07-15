import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Spinner } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { callApi } from "../apiHandlers/callApi";
import Router from "next/router";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { generateOTP } from "../utils";
import { useDispatch, useSelector } from 'react-redux'
import { setlogin, setToken } from "../../redux/slices/loginSlice";


function LoginFormModal({ activeLogin, setLogin }) {

  // state for modal
  const [containerLogin, setContainerLogin] = useState(activeLogin);
  const [containerSignUp, setContainerSignUp] = useState(false);
  const [submodalLogin, setSubmodalLogin] = useState(false);

  const dispatch = useDispatch()
  //state for storing form data

  const [signUpData, setSignUpData] = useState({})
  const [enteredOtp, setEnteredOtp] = useState()


  //state for useForm
  const { register, handleSubmit, formState: { errors } } = useForm({
    criteriaMode: 'all'
  });
  const onSubmit = (signUpData) => {
    generateOTP(signUpData),
      setSubmodalLogin(true),
      setContainerLogin(false)
  }
  const onRegistrationSubmit = (signUpData) => {
    generateOTP(signUpData), setSubmodalLogin(true),
      setContainerSignUp(false)
  }
  const [otpLoader, setOtpLoader] = useState()
  console.log(register, 'register')
  //signup api call

  async function validateOtp() {
    setOtpLoader(true)
    let apiTest = {
      method: 'post',
      url: "users/validateOtp",
      data: {
        phoneNumber: signUpData.phoneNumber,
        otp: enteredOtp
      }
    }
    let response = await callApi(apiTest)
    console.log(response, 'responseeeeeeeeee')
    if (response.data.status == 'SUCCESS') {
      dispatch(setlogin(true))
      dispatch(setToken(JSON.stringify(response.data.data.token)))
      setOtpLoader(false)
      Router.push("#")
      setSubmodalLogin(false),
      setContainerSignUp(false)
    }
  }


  useEffect(() => {
    setContainerLogin(activeLogin);
  }, [activeLogin])

  return (
    <>
      {/* Modal for login */}


      <Modal
        isOpen={containerLogin}
        toggle={() => setContainerLogin(!containerLogin)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="row">
              <div className="col-lg-12 col-md-6 mt-2">
                <label>Enter Phone Number<span className="text-danger"><b>*</b></span></label>
                <input {...register("phoneNumber", {
                  required: true, maxLength: 10, minLength: 10
                })} onChange={(e) => { setSignUpData({ phoneNumber: e.target.value }) }} />
                {errors.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Phone Number is required</small> || errors.phoneNumber?.type === 'minLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small> || errors.phoneNumber?.type === 'maxLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small>}
                {/* {errors.phoneNumber?.type === 'pattern' && <small className="text-danger mt-2">Phone Number is only of number</small>} */}
              </div>
              <div className="col-lg-12 col-md-6 mt-4">
                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setContainerSignUp(true), setContainerLogin(false) }}>Sign Up</button>
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
              type='submit'
            >

              Send OTP</button>
            <button
              className="main-btn"
              onClick={() => setContainerLogin(false)}
            >
              Cancel
            </button>
          </ModalFooter>
        </form>

      </Modal>


      {/* otp modal */}
      <Modal isOpen={submodalLogin}>
        <ModalHeader>Enter OTP</ModalHeader>
        <ModalBody style={{ display: "flex", flexDirection: "row" }}>
          <input type="number" onChange={(e) => { setEnteredOtp(e.target.value) }} />
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
              disabled={otpLoader}
              onClick={() =>
                validateOtp()
              }
            >
              {otpLoader && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Done
            </button>
          </Link>
        </ModalFooter>
      </Modal>

      {/* modal for registration */}
      <Modal
        isOpen={containerSignUp}
        toggle={() => setContainerSignUp(!containerSignUp)}
      >
        <form onSubmit={handleSubmit(onRegistrationSubmit)}>
          <ModalBody>
            <div className="row">
              <div className="col-lg-12 col-md-6 mt-2">
                <label>Enter Username</label>
                <input type="text" className="otpinput m-0"{...register("phoneNumber", {
                  required: true, minLength: 10
                })}
                  onChange={(e) => { setSignUpData({ ...signUpData, userName: e.target.value }) }} />
              </div>
              {errors.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Username is required</small> || errors.phoneNumber?.type === 'minLength' && <small className="text-danger mt-2">Username must be of 10 characters</small>}
              <div className="col-lg-12 col-md-6 mt-2">
                <label>Enter Phone Number</label>
                <input type="number" className="otpinput m-0"{...register("phoneNumber", {
                  required: true, maxLength: 10, minLength: 10
                })}
                  onChange={(e) => { setSignUpData({ ...signUpData, phoneNumber: e.target.value }) }} />
              </div>
              {errors.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Phone Number is required</small> || errors.phoneNumber?.type === 'minLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small> || errors.phoneNumber?.type === 'maxLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small>}
              <div className="col-lg-12 col-md-6 mt-2">
                <label>Enter Email</label>
                <input type="text1" className="otpinput m-0"{...register("phoneNumber", {
                  required: true, maxLength: 10, minLength: 10
                })}
                  onChange={(e) => { setSignUpData({ ...signUpData, email: e.target.value }) }} />
              </div>
              {errors.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Email is required</small>}
              <div className="col-lg-12 col-md-6 mt-4">
                <button style={{ backgroundColor: 'transparent' }} onClick={() => { setContainerLogin(true), setContainerSignUp(false) }}>Login</button>
              </div>
            </div>
            <br />
            <div className="text-center m-2"></div>
            <Modal
              isOpen={submodalLogin}
              toggle={() => setSubmodalLogin(!submodalLogin)}
            ></Modal>
          </ModalBody>
        </form>
        <ModalFooter>
          <button
            className="main-btn"
            type="submit"
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
    </>
  );
}

export default LoginFormModal;
