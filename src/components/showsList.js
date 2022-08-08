import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Rate from './ratings';
import GiveReviewModal from './giveReviewModal';
import CardFormModal from './cardFormModal';
import { callApi } from '../apiHandlers/callApi';
import SeeAllReviewModal from './seeallreviewModal';

const ShowsList = (props) => {
  const [modalOpen, setMOdalOpen] = useState(false)
  const [cardModalOpen, setCardMOdalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()
  const [eventId, setEventId] = useState()
  const [showList, setShowList] = useState([])
  const [eventIdForList, setEventIdForList] = useState(null)
  const [reviewListModal, setReviewListModal] = useState(false)
  const [departmentForIndex, setDepartmentForIndex] = useState()

  const closeReviewMOdal = (data) => {
    setMOdalOpen(data)
  }
  const togglecardModal = (data) => {
    setCardMOdalOpen(data)
  }
  const closeReviewListMOdal = (data) => {
    setReviewListModal(data)
  }
  const reviewedItem = localStorage.getItem("reviewedItem")
  const [isReviewed, setIsReviewed] = useState(JSON.parse(reviewedItem))
  console.log(isReviewed, 'revieweddddddddd')
  const handleBookingButton = (show) => {
    setCardMOdalOpen(!cardModalOpen),
      setSelectedEvent(show)
    if (show.eventId) {
      setDepartmentForIndex('ramlingamPark')
    } else if (show.townhallId) {
      setDepartmentForIndex('townhall')
    } else if (show.mandapId) {
      setDepartmentForIndex('kalyanMandap')
    }
  }
  const handleReviewData = (show) => {
    setMOdalOpen(!modalOpen), setEventId(show.eventId || show.townhallId || show.mandapId)
    if (show.eventId) {
      setDepartmentForIndex('ramlingamPark')
    } else if (show.townhallId) {
      setDepartmentForIndex('townhall')
    } else if (show.mandapId) {
      setDepartmentForIndex('kalyanMandap')
    }
  }
  let showData = [];
  useEffect(async () => {
    console.log(props.overallData, 'overall data on change')
    for (let i = 0; i < props.overallData?.length; i++) {
      let getReviewData = {
        method: 'post',
        url: 'ramalingampark/event/getReview',
        data: {
          eventId: props.overallData[i].eventId || props.overallData[i].townhallId || props.overallData[i].mandapId
        }
      }
      let response = await callApi(getReviewData)
      console.log(response.data.data, 'response for review')
      let avgRating = 0
      response.data.data?.map((x) => {
        avgRating = avgRating + x.rating
      })
      !(props.overallData[i].ambulanceName) && showData.push({ department: props.pageOf, price: props.overallData[i].price, cPrice: props.overallData[i].cPrice, eventId: props.overallData[i].eventId, townhallId: props.overallData[i].townhallId, mandapId: props.overallData[i].mandapId, eventName: props.overallData[i].eventName, townhallName: props.overallData[i].townhallName, mandapName: props.overallData[i].mandapName, location: props.overallData[i].location, card: props.overallData[i].card, review: props.overallData[i].review, reviewCount: props.overallData[i].reviewCount, seatCategory: props.overallData[i].seatCategory, dates: props.overallData[i].dateAndTime?.map((x) => { return x.date }), dateAndTime: props.overallData[i].dateAndTime, eventDefaultTime: props.overallData[i].eventDefaultTime, eventTag: props.overallData[i].eventTag, rating: Math.round(avgRating / response.data.data.length) })
      if (props.overallData[i].ambulanceName) {
        showData.push({ department: props.pageOf, ambulanceId: props.overallData[i]?.vehicles[0]?.vehicleId, ambulanceName: props.overallData[i]?.ambulanceName, card: props.overallData[i].card, eventTag: props.overallData[i].tag ||props.overallData[i].townhallTag || props.overallData[i].mandapTag, price: 'Depends on distance', status: props.overallData[i].status })
      }
    }
    setShowList(showData)
  }, [props.overallData])
  console.log(showList, 'showList outside')
  return (
    <section className="listing-grid-area pt-115 pb-75">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-75">
              <h2>Shows List </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {showList.map((show) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="listing-item listing-grid-one mb-45">
                  <div className="listing-thumbnail">
                    <img src={show?.card?.card_image} alt="Listing Image" style={{ height: "300px", objectFit: "cover", width: "100%" }} />
                    {show?.card?.card_featured ? (
                      <span className="featured-btn">Featured</span>
                    ) : (
                      <span className="featured-btn featured-btn-transparent"></span>
                    )}
                    <div className="thumbnail-meta d-flex justify-content-between align-items-center">
                      <div className="meta-icon-title d-flex align-items-center">
                        <div className="icon">
                          <i className="flaticon-chef"></i>
                        </div>
                        <div className="title">
                          <button style={{ backgroundColor: 'transparent' }} onClick={() => handleBookingButton(show)}>{show?.card?.card_buttonName}</button>
                        </div>
                      </div>
                      <img
                        src="assets/images/right-arrow.png"
                        style={{ height: "32px", width: "32px" }}
                      />
                    </div>
                  </div>
                  <div className="listing-content">
                    <h3 className="title">
                      <Link href="/listing-details-1">
                        <a>{show.eventName || show.townhallName || show.mandapName || show.ambulanceName}</a>
                      </Link>
                    </h3>
                    {show.eventTag && show.eventTag.map((x) => { return (<span className='badge badge-warning ml-0 mr-2 mb-2 text-capitalize'>{x}</span>) })}
                    <Rate size='25' align='start' rating={show?.rating} canHover={false} />
                    <h6 className="price ml-0 mt-0">Price:{show?.price}</h6>
                    {show?.contactNumber ? (
                      <span
                        className="phone-meta"
                        style={{ margin: "0px 5px 12px 0px" }}
                      >
                        <i className="ti-tablet"></i>
                        <a href="tel:+982653652-05">{show?.contactNumber}</a>
                      </span>
                    ) : (
                      <span></span>
                    )}

                    <div className="listing-meta">
                      <ul>
                        {show?.location ? (
                          <li>
                            <span>
                              <i className="ti-location-pin"></i>
                              {show?.location}
                            </span>
                          </li>
                        ) : (
                          show.status ? (
                            <li>
                              <span className='escalate-badge escalate-badge-success' style={{padding:'5px 20px',fontSize:'13px'}}>
                                {show?.status}
                              </span>
                            </li>
                          ) : <li></li>
                        )}
                        {isReviewed ? isReviewed.includes(show.eventId || show.townhallId || show.mandapId) ? <li className='d-flex flex-column'>
                          <span>
                            <i className="ti-check"></i>
                            <span className='text-success ml-0'>Reviewed</span>
                          </span>
                          <button style={{ backgroundColor: 'transparent' }} className='mt-2 ml-auto' onClick={() => { setReviewListModal(true), setEventIdForList(show.eventId || show.townhallId || show.mandapId) }}>See All Reviews</button>
                        </li> : <li className='d-flex flex-column'>
                          <span>
                            <i className="ti-star"></i>
                            <button style={{ backgroundColor: 'transparent' }} onClick={() => { handleReviewData(show) }}>Give a Review</button>
                          </span>
                          <button style={{ backgroundColor: 'transparent' }} className='mt-2 ml-auto' onClick={() => { setReviewListModal(true), setEventIdForList(show.eventId || show.townhallId || show.mandapId) }}>See All Reviews</button>
                        </li> : <li className='d-flex flex-column'>
                          <span>
                            <i className="ti-star"></i>
                            <button style={{ backgroundColor: 'transparent' }} onClick={() => { handleReviewData(show) }}>Give a Review</button>
                          </span>
                          <button style={{ backgroundColor: 'transparent' }} className='mt-2 ml-auto' onClick={() => { setReviewListModal(true), setEventIdForList(show.eventId || show.townhallId || show.mandapId) }}>See All Reviews</button>
                        </li>}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GiveReviewModal activeReview={modalOpen} eventId={eventId} closeReviewMOdal={closeReviewMOdal} department={props.pageOf == 'index' ? departmentForIndex : props.pageOf} />
      <CardFormModal activeModal={cardModalOpen} eventInfo={selectedEvent} toggleFunc={togglecardModal} department={props.pageOf == 'index' ? departmentForIndex : props.pageOf} />
      <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
    </section>
  )
}

export default ShowsList