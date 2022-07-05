import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Rate from './ratings';
import GiveReviewModal from './giveReviewModal';
import CardFormModal from './cardFormModal';

function ShowsList(props) {
  const [modalOpen,setMOdalOpen] = useState(false)
  const [cardModalOpen,setCardMOdalOpen] = useState(false)
  const [selectedEvent,setSelectedEvent] = useState()

  const togglemodal = (data) =>{
    setMOdalOpen(data)
  }
  const togglecardModal = (data) =>{
    setCardMOdalOpen(data)
  }  
  // useEffect(()=>{
  //   console.log(props.overallData,'overallDataa')
  // },[props.overallData])
  const showList=[]
  for (let i =0;i<props.overallData.length;i++){
    showList.push({price:props.overallData[i].price,eventName:props.overallData[i].eventName,location:props.overallData[i].location,card:props.overallData[i].card,review:props.overallData[i].review,reviewCount:props.overallData[i].reviewCount,seatCategory:props.overallData[i].seatCategory,dates:props.overallData[i].eventDates,time:props.overallData[i].eventTime    })
  }
  console.log(showList)

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
                            <button style={{backgroundColor:'transparent'}} onClick={()=>{setCardMOdalOpen(!cardModalOpen),setSelectedEvent(show)}}>{show?.card?.card_buttonName}</button>
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
                        <a>{show.eventName}</a>
                      </Link>
                    </h3>
                    <Rate size='20' align='start' rating={show?.review} canHover='false'/>
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
                          <li></li>
                        )}
                        <li>
                          <span>
                            <i className="ti-star"></i>
                            <button style={{backgroundColor:'transparent'}} onClick={()=>setMOdalOpen(!modalOpen)}>Give a Review</button>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GiveReviewModal activeReview={modalOpen} toggle={togglemodal}/>
      <CardFormModal activeModal={cardModalOpen} eventInfo={selectedEvent} toggleFunc={togglecardModal}/>
    </section>
  )
}

export default ShowsList