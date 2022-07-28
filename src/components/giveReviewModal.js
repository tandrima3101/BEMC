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

function GiveReviewModal({ activeReview, toggle, eventId, closeReviewMOdal }) {
  // for main modal
  const [containerReview, setContainerReview] = useState(activeReview);

  //for submodal
  const [submodal, setSubmodal] = useState(false);
  const [reviewDetails, setReviewDetails] = useState()
  const userId = useSelector((state) => state.login.userId)
  const [otpLoader, setOtpLoader] = useState()
  const reviewedItem = localStorage.getItem("reviewedItem")
  const [isReviewed, setIsReviewed] = useState(JSON.parse(reviewedItem))



  // console.log(JSON.parse(userId))
  const handleCreateReview = async () => {
    setOtpLoader(true)
    let reviewData = {
      method: 'post',
      url: 'ramalingampark/event/createReview',
      data: reviewDetails
    }
    let response = await callApi(reviewData)
    // console.log(response.data,'responseeeeeeeeeee')
    if (response.data.code == 201) {
      setOtpLoader(false)
      setContainerReview(false),
        closeReviewMOdal(false)
      setSubmodal(true)
      if (isReviewed != null) {
        setIsReviewed([...isReviewed, eventId])
      }
      else{
        setIsReviewed([eventId])
      }
    }
    // console.log(reviewDetails)
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
    // console.log(eventId,'iddddddddddd')
    setReviewDetails({ eventId: eventId })
    // setIsReviewed([{eventId:eventId,is_reviewed:false}])
  }, [eventId])

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
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Enter Ratings</label>
              <Ratings size='40' align='left' canHover={true} callBack={setRatingsForEvent} />
            </div>
            <div className="col-lg-12 col-md-6 mt-2">
              <label>Add Your Review</label>
              <textarea className="otpinput m-0 w-100" onChange={(e) => setReviewDetails({ ...reviewDetails, review: e.target.value })} />
            </div>
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
