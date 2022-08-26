import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import Ratings from '../../src/components/ratings'
import { callApi } from "../apiHandlers/callApi";
import Slider from "react-slick";
import { PlaceSliderTwo } from "../sliderProps";

function MembershipDetails({ activeMembership , toggle, membership }) {
    // for main modal
    const [containerReview, setContainerReview] = useState(activeMembership);

    useEffect(() => {
        setContainerReview(activeMembership);
    }, [activeMembership])
    return (
        <>
            {
                membership && <Modal isOpen={containerReview} toggle={() => { toggle(false), setContainerReview(!containerReview) }}>
                    <ModalHeader>{membership[0]?.membershipName} {membership[0]?.bookingStatus == "Not Booked" && <span style={{color:'green',fontSize:'20px',fornWeight:'bold'}}>{membership[0]?.bookingStatus}</span>} {membership[0]?.bookingStatus == "Booked" && <span style={{color:'red',fontSize:'20px',fornWeight:'bold'}}>{membership[0]?.bookingStatus}</span>}</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            {
                                                <img src={membership[0]?.sportsArena.banner.bannerImageUrl} style={{ width: '100%' }} />
                                            }
                                            <h5 className="mt-2">{membership[0]?.sportsArena.arenaName.toUpperCase()}</h5>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card p-3">
                                                {
                                                    membership[0]?.planInformation.length > 1 && <h6 className="mt-2">Plan Information : {membership[0]?.planInformation.map((x, index) => {
                                                        return (
                                                            <ul>
                                                                <li key={index}>{x}</li>
                                                            </ul>
                                                        )
                                                    })}</h6>
                                                }
                                                {
                                                    membership[0]?.plans.length > 0 && <h6 className="mt-2"><b>Plans :</b> {membership[0]?.plans.map((x, index) => {
                                                        return (
                                                            <ul className="mt-4">
                                                                <li key={index}>{`Tenure : ${x.tenure} , Age Limit : ${x.ageLimit} ,Price : ${x.price}`}</li>
                                                            </ul>
                                                        )
                                                    })}</h6>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        membership[0]?.activities.length > 0 && <h6 className="mt-2"><b>Activities :</b> {membership[0]?.activities.map((x, index) => {
                                            return (
                                                <ul className="mt-4">
                                                    <li key={index}>
                                                        <div className="card">
                                                            {
                                                                x.activityPhotos.map((x, index) => {
                                                                    return (<img src={x} style={{ width: '200px' }} className="m-4" />)
                                                                })
                                                            }
                                                            <h5 className="ml-4">{x.activityName.toUpperCase()}</h5>
                                                            <p className="ml-4">{x.activityDescription}</p>
                                                            {
                                                                x.facilitiesProvided.length > 0 && <h6 className="mt-2 ml-4"><b>Facilities Provided :</b> {x.facilitiesProvided?.map((x) => {
                                                                    return (
                                                                        <ul className="mt-2">
                                                                            <li className="mt-2">{x.key} : {x.value}</li>
                                                                        </ul>
                                                                    )
                                                                })}</h6>
                                                            }
                                                        </div>
                                                    </li>
                                                </ul>
                                            )
                                        })}</h6>
                                    }
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="main-btn"
                            onClick={() => {toggle(false), setContainerReview(!containerReview)}}
                        >
                            Close
                        </button>
                    </ModalFooter>
                </Modal>
            }
        </>
    );
}

export default MembershipDetails;
