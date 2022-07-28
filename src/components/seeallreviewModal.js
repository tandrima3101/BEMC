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
import Slider from "react-slick";
import { PlaceSliderTwo } from "../sliderProps";

function SeeAllReviewModal({ activeReview, eventId, closeReviewMOdal }) {
    // for main modal
    const [containerReview, setContainerReview] = useState(activeReview);

    //for submodal
    const [reviewDetails, setReviewDetails] = useState()

    const showReview = async () => {
        console.log('hiiiii')
        let reviewData = {
            method: 'post',
            url: 'ramalingampark/event/getReview',
            data: {
                eventId: eventId
            }
        }
        let response = await callApi(reviewData)
        console.log(response.data, 'responseeeeeeeeeee')
        if (response.data.code == 201) {
            setReviewDetails(response.data.data)
        }
    }

    useEffect(async () => {
        console.log(eventId, 'EVENTID')
        await showReview()
    }, [eventId])
    useEffect(() => {
        console.log(reviewDetails, 'detailsssssssssssss')
    }, [reviewDetails])

    useEffect(() => {
        setContainerReview(activeReview);
    }, [activeReview])
    return (
        <>

            <Modal isOpen={containerReview} toggle={() => { setContainerReview(!containerReview), closeReviewMOdal(false) }}>
                <ModalHeader>Review List</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Slider {...PlaceSliderTwo} className="place-slider-one">
                                    {reviewDetails?.map((review,index) => {
                                        return (
                                            <div key={index}>
                                                <div style={{
                                                padding: '20px 10px',
                                                boxShadow: '0px 0px 16px #b3e6eb',
                                                borderRadius: '10px',
                                                margin: '10px'}}>
                                                <div className="single-thumb d-flex flex-column justify-content-center align-items-cnter">
                                                    <img
                                                        src='\assets\images\avatar-370-456322.jpg'
                                                        alt="testimonial thumb"
                                                        width='100px'
                                                        className="mx-auto mb-3"
                                                    />
                                                </div>
                                                <Ratings size='40' canHover={false} align='center' rating={review.rating} />
                                                <h5 className="text-center mt-2">{review.userName}</h5>
                                                <p className="text-center text-capitalize">{review.review}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Link href="#">
                        <button
                            className="main-btn"
                            onClick={ () => { setContainerReview(!containerReview), closeReviewMOdal(false),setReviewDetails(null) }}
                        >
                            Close
                        </button>
                    </Link>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default SeeAllReviewModal;
