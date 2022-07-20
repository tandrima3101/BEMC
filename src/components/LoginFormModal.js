import React, { useEffect, useState } from "react";
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
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm();


  // function for login

  const onSubmit = (logindata) => {
    generateOTP(logindata),
    setSubmodalLogin(true),
    setContainerLogin(false)
  }
console.log(errors3)
  
  // function fr signup

  const onRegistration =  (signUpData) => {

    generateOTP(signUpData),
    setSubmodalLogin(true),
    setContainerSignUp(false)
  }
  const [otpLoader, setOtpLoader] = useState()

  //validate otp api call

  const validateOtp = async () => {
    setOtpLoader(true)
    let apiTest = {
      method: 'post',
      url: "users/validateOtp",
      data: {
        phoneNumber: signUpData.phoneNumber,
        ...enteredOtp
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
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number<span className="text-danger"><b>*</b></span></label>
              <input {...register1("phoneNumber", {
                required: true, maxLength: 10, minLength: 10,pattern: {
                  value: /^[789]\d{9}$/,
                  message: "Invalid Phone Number"
                }
              })} onChange={(e) => { setSignUpData({ ...signUpData, phoneNumber: e.target.value }) }} />
              {errors1.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Phone Number is required</small> || errors1.phoneNumber?.type === 'minLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small> || errors1.phoneNumber?.type === 'maxLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small>}
              <small className="text-danger mt-2">{errors1.phoneNumber?.message}</small>
            </div>
          </div>
          <br />
        </ModalBody>
        <ModalFooter>
          <button className="main-btn" style={{ float: 'left', marginRight: 'auto' }} onClick={() => { setContainerSignUp(true), setContainerLogin(false) }}>Sign Up</button>
          <button
            className="main-btn"
            style={{ width: 'max-content' }}
            type='submit'
            onClick={handleSubmit1(onSubmit)}
          >
            SEND OTP
          </button>
          <button
            className="main-btn"
            onClick={() => setContainerLogin(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>


      {/* otp modal */}

      <Modal isOpen={submodalLogin}>
        <ModalHeader>Enter OTP</ModalHeader>
        <ModalBody style={{ display: "flex", flexDirection: "row" }}>
          <input {...register2("otp", {
            required: true, maxLength: 6, minLength: 6
          })} onChange={(e) => { setEnteredOtp({ ...enteredOtp, otp: e.target.value }) }} />
          {errors2.otp?.type === 'required' && <small className="text-danger mt-2 d-block">OTP is required</small> || errors2.otp?.type === 'minLength' && <small className="text-danger mt-2 d-block">OTP must be of 6 digits</small> || errors2.otp?.type === 'maxLength' && <small className="text-danger mt-2 d-block">OTP must be of 6 digits</small>}
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
          <button
            className="main-btn"
            disabled={otpLoader}
            type='submit'
            onClick={handleSubmit2(validateOtp)}
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
        </ModalFooter>
      </Modal>

      {/* modal for registration */}

      <Modal
        isOpen={containerSignUp}
        toggle={() => setContainerSignUp(!containerSignUp)}
      >
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Username</label>
              <input type="text" className="otpinput m-0"{...register3("userName", {
                required: true
              })}
                onChange={(e) => { setSignUpData({ ...signUpData, userName: e.target.value }) }} />
            </div>
            {errors3.userName?.type === 'required' && <small className="text-danger mt-2">Username is required</small>}
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Phone Number</label>
              <input type="number" className="otpinput m-0"{...register3("phoneNumber", {
                required: true, maxLength: 10, minLength: 10,pattern: {
                  value: /^[789]\d{9}$/,
                  message: "Invalid Phone Number"
                }
              })}
                onChange={(e) => { setSignUpData({ ...signUpData, phoneNumber: e.target.value }) }} />
            </div>
            {errors3.phoneNumber?.type === 'required' && <small className="text-danger mt-2">Phone Number is required</small> || errors3.phoneNumber?.type === 'minLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small> || errors3.phoneNumber?.type === 'maxLength' && <small className="text-danger mt-2">Phone Number must be of 10 digits</small>}
            <small className="text-danger mt-2">{errors3.phoneNumber?.message}</small>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Email</label>
              <input type="text1" className="otpinput m-0"{...register3("email", {
                required: true,pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address"
                }
                
              })}
                onChange={(e) => { setSignUpData({ ...signUpData, email: e.target.value }) }} />
            </div>
            {errors3.email?.type === 'required' && <small className="text-danger mt-2">Email is required</small>}
            <small className="text-danger mt-2">{errors3.email?.message}</small>
          </div>
          <br />
          <div className="text-center m-2"></div>
          {/* <Modal
            isOpen={submodalLogin}
            toggle={() => setSubmodalLogin(!submodalLogin)}
          ></Modal> */}
        </ModalBody>
        <ModalFooter>
          <button className="main-btn" style={{ float: 'left', marginRight: 'auto' }} onClick={() => { setContainerLogin(true), setContainerSignUp(false) }}>Login</button>
          <button
            className="main-btn"
            type="submit"
            // onClick={(e)=>{e.preventDefault(); handleSubmit3(onRegistrationSubmit())}}
            onClick={handleSubmit3(onRegistration)}
          >
           SEND OTP
          </button>

          <button
            className="main-btn"
            onClick={() => setContainerSignUp(false)}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LoginFormModal;
