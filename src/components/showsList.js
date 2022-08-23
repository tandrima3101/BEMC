import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Rate from './ratings';
import GiveReviewModal from './giveReviewModal';
import CardFormModal from './cardFormModal';
import { callApi } from '../apiHandlers/callApi';
import SeeAllReviewModal from './seeallreviewModal';
import PreLoader from './PreLoader';

const ShowsList = (props) => {
  const [modalOpen, setMOdalOpen] = useState(false)
  const [cardModalOpen, setCardMOdalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState()
  const [eventId, setEventId] = useState()
  const [eventParentId, setEventParentId] = useState()
  const [showList, setShowList] = useState([])
  const [eventIdForList, setEventIdForList] = useState(null)
  const [reviewListModal, setReviewListModal] = useState(false)
  const [departmentForIndex, setDepartmentForIndex] = useState()
  const [isLoaded,setIsLoadeed]=useState(false)
  const userData = (JSON.parse(localStorage.getItem('userData')))

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
    }else if (show.ambulanceName) {
      setDepartmentForIndex('ambulance')
    }else if (show.harseName) {
      setDepartmentForIndex('harse')
    }
  }
  const handleReviewData = (show) => {
    setEventParentId(show._id)
    setMOdalOpen(!modalOpen)
    if(props.pageOf == 'ambulance'){
      setEventId('AMB001')
    }
    else if (props.pageOf == 'harse'){
      setEventId("HAR001")
    }
    else{
      setEventId(show.eventId || show.townhallId || show.mandapId)
    }
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
    setShowList(props.overallData)
    setIsLoadeed(true)
  }, [props.overallData])
  console.log(showList, 'showList outside')

  
  return (
   (!isLoaded)?<PreLoader/>: <section className="listing-grid-area pt-115 pb-75">
   <div className="container">
     <div className="row justify-content-center">
       <div className="col-lg-8">
         <div className="section-title text-center mb-75">
           <h2>Shows List</h2>
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
                      <img src='/assets/images/booking.png' style={{margin:'10px',width:'70%'}}/>
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
                     <a>{show.eventName || show.townhallName || show.mandapName || show.ambulanceName || show.harseName || show.arenaName}</a>
                   </Link>
                 </h3>
                 {show.eventTag && show.eventTag.map((x) => { return (<span className='badge badge-warning ml-0 mr-2 mb-2 text-capitalize'>{x}</span>) })}
                  <div className='d-flex align-items-center' style={{cursor:'pointer'}} onClick={() => { setReviewListModal(true), setEventIdForList(show.eventId || show.townhallId || show.mandapId || 'AMB001' || 'HAR001') }}>
                  <Rate size='25' align='start' rating={show?.reviewAvg} canHover={false} />{show?.reviews?.length > 1 ?<h6 className='ml-2'>({show?.reviews?.length} Reviews)</h6> :show?.reviews?.length==0?<h6 className='ml-2'>(No Reviews yet)</h6>:<h6 className='ml-2'>({show?.reviews?.length} Review)</h6>}
                  </div>
                 {
                  (!show.ambulanceName && !show.harseName)?<h6 className="price ml-0 mt-0">Price: Rs {show?.price} /- {show.cPrice && <h6 className="price ml-0 mt-2">Child Price: Rs {show?.cPrice} /-</h6>}</h6>:<></>
                 }
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
                         <li className='pl-2'>
                           <span className='escalate-badge escalate-badge-success' style={{padding:'5px 20px',fontSize:'13px'}}>
                             {show?.status}
                           </span>
                         </li>
                       ) : <li></li>
                     )}
                     {show.reviewedBy? show.reviewedBy.includes(userData?._id) ? <li className='d-flex flex-column'>
                       <span>
                         <i className="ti-check"></i>
                         <span className='text-success ml-0'>Reviewed</span>
                       </span>
                     </li> : <li className='d-flex flex-column'>
                       <span>
                         <i className="ti-star"></i>
                         <button style={{ backgroundColor: 'transparent' }} onClick={() => { handleReviewData(show) }}>Give a Review</button>
                       </span>
                     </li> : <li className='d-flex flex-column'>
                       <span>
                         <i className="ti-star"></i>
                         <button style={{ backgroundColor: 'transparent' }} onClick={() => { handleReviewData(show) }}>Give a Review</button>
                       </span>
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
   <GiveReviewModal activeReview={modalOpen} eventId={eventId} eventParentId={eventParentId} closeReviewMOdal={closeReviewMOdal} department={props.pageOf == 'index' ? departmentForIndex : props.pageOf} />
   <CardFormModal activeModal={cardModalOpen} eventInfo={selectedEvent} toggleFunc={togglecardModal} department={props.pageOf == 'index' ? departmentForIndex : props.pageOf} />
   <SeeAllReviewModal activeReview={reviewListModal} eventId={eventIdForList} closeReviewMOdal={closeReviewListMOdal} />
 </section>
  )
}

export default ShowsList