import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Button, Spinner } from 'react-bootstrap'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import SuccessGif from '../../public/assets/images/successGif.gif';
import Ratings from '../../src/components/ratings'
import { callApi } from "../apiHandlers/callApi";

function GiveReviewModal({ activeReview, toggle, eventId, closeReviewMOdal, department }) {
  console.log(department, 'department')
  // for main modal
  const [containerReview, setContainerReview] = useState(activeReview);

  //for submodal
  const [submodal, setSubmodal] = useState(false);
  const [reviewDetails, setReviewDetails] = useState()
  const userId = useSelector((state) => state.login.userId)
  const [otpLoader, setOtpLoader] = useState()
  const reviewedItem = localStorage.getItem("reviewedItem")
  const [isReviewed, setIsReviewed] = useState(JSON.parse(reviewedItem))
  const [errors, setErrors] = useState({ field: '', message: '' })
  const handleCreateReview = async () => {
    if (reviewDetails && !reviewDetails.userName) {
      setErrors({ field: 'name', message: 'Please enter your name !!' })
    } else if (reviewDetails && !reviewDetails.review) {
      setErrors({ field: 'review', message: 'Please enter your review !!' })
    } else if (reviewDetails && !reviewDetails.rating) {
      setErrors({ field: 'rating', message: 'Please enter your ratings !!' })
    } else {
      setOtpLoader(true)
      let reviewData = {
        method: 'post',
        url: 'ramalingampark/event/createReview',
        data: reviewDetails
      }
      let response = await callApi(reviewData)
      if (response.data.code == 201) {
        setOtpLoader(false)
        setContainerReview(false),
          closeReviewMOdal(false)
        setSubmodal(true)
        if (isReviewed != null) {
          setIsReviewed([...isReviewed, eventId])
        }
        else {
          setIsReviewed([eventId])
        }
      }
    }
  }
  const setRatingsForEvent = (data) => {
    setReviewDetails({ ...reviewDetails, rating: data })
  }
  const handleSubmit = async () => {
    setSubmodal(false);
    console.log(isReviewed, 'is_reviewd')
    await localStorage.setItem('reviewedItem', JSON.stringify(isReviewed))
  }
  useEffect(() => {
    setContainerReview(activeReview);
  }, [activeReview])

  useEffect(() => {
    setReviewDetails({ eventId: eventId, department: department })
  }, [eventId, department])

  useEffect(() => {
    console.log(reviewDetails, 'detailsssssssssssss')
  }, [reviewDetails])
  useEffect(() => {
    console.log(isReviewed, 'isreviewd')
  }, [isReviewed])
  return (
    <>

      <Modal isOpen={containerReview} toggle={() => { setContainerReview(!containerReview), closeReviewMOdal(false) }}>
        <ModalHeader>Give Your Review</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Name</label>
              <input type="text" className="otpinput m-0" onChange={(e) => setReviewDetails({ ...reviewDetails, userName: e.target.value, userId: JSON.parse(userId) })} />
            </div>
            {
              errors && errors.field == 'name' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Ratings</label>
              <Ratings size='40' align='left' canHover={true} callBack={setRatingsForEvent} />
            </div>
            {
              errors && errors.field == 'rating' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Add Your Review</label>
              <textarea className="otpinput m-0 w-100" onChange={(e) => setReviewDetails({ ...reviewDetails, review: e.target.value })} />
            </div>
            {
              errors && errors.field == 'review' && <h6 className="text-danger mt-1">{errors.message}</h6>
            }
          </div>
          <br />
          <div className="text-center m-2"></div>
          <Modal
            isOpen={submodal}
            toggle={() => { setSubmodal(!submodal) }}
          ></Modal>
        </ModalBody>
        <ModalFooter>
          <Link href="#">
            <button
              className="main-btn"
              onClick={() => [
                handleCreateReview()
              ]}
            >{otpLoader && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
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
                handleSubmit()
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

export default GiveReviewModal;
