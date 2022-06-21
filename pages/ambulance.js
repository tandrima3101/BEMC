import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import { Nav, Tab } from "react-bootstrap";
import BookingForm from "../src/components/bookingForm";

import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
  PlaceSliderTwo,
} from "../src/sliderProps";
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";



const Ambulance = () => {
  const [video, setVideo] = useState(false);

  const bannerSlider = [
    {
      heading: "BEMC  Seva: Ambulance",
      subHeading:
        "Day or Night, We do it Right! When seconds count we're there first.",
      bannerImageUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
    }
  ];
  // const showList = [
  //   {
  //     featured: true,
  //     imgUrl:
  //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
  //     buttonIconUrl: "",
  //     buttonName: "Book",
  //     showName: "Mo Odisha",
  //     reviews: "ratings-four",
  //     reviewNumber: "05",
  //     Price: "",
  //     contactNumber: "9876543210",
  //     location: "Odisha",
  //   },
  //   {
  //     featured: true,
  //     imgUrl:
  //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
  //     buttonIconUrl: "",
  //     buttonName: "Book",
  //     showName: "Bande Utkala",
  //     reviews: "ratings-four",
  //     reviewNumber: "05",
  //     Price: "",
  //     contactNumber: "9876543210",
  //     location: "Odisha",
  //   },
  //   {
  //     featured: false,
  //     imgUrl:
  //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
  //     buttonIconUrl: "",
  //     buttonName: "Book",
  //     showName: "Shivananda Show",
  //     reviews: "ratings-four",
  //     reviewNumber: "05",
  //     Price: "",
  //     contactNumber: "9876543210",
  //     location: "Odisha",
  //   },
  // ];
  const getFreeQuote = [
    {
      smallText: "Checkout List",
      mainText: "Professional planners for your vacation",
      paragraph:
        "Risus urnas Iaculis per amet vestibulum luctus tincidunt ultricies aenean quam eros eleifend sodales cubilia mattis quam.",
    },
  ];
  const clientSlider = [
    {
      imgUrl:
        "https://odisha.gov.in/themes/swf/theme/images/5t_logo.png",
    },
    {
      imgUrl:
        "https://www.berhampur.gov.in/wp-content/uploads/2020/08/Bemc-Logo-min.png",
    },
    {
      imgUrl:
        "https://pbs.twimg.com/profile_images/948877813414703104/JStN81Ro_400x400.jpg",
    },
    
    {
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Seal_of_Odisha.png/1200px-Seal_of_Odisha.png",
    },
    // {
    //   imgUrl:
    //     "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    // },
  ];
  const photoGallery = [
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_1.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_2.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_1.jpg",
    },
  ];
  const videoLink = [
    {link : "https://www.youtube.com/embed/JHlY8w69wSE"}
  ];

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner mainSlider={bannerSlider} activeForm='Ambulance' pageOf="Ambulance"/>
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}

      {/* <section className="listing-grid-area pt-115 pb-75">
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
                  <div
                    className="listing-item listing-grid-one mb-45"

                  >
                    <div className="listing-thumbnail">
                      <img
                        src={show.imgUrl}
                        alt="Listing Image"
                      />
                      {show.featured ? <span className="featured-btn">Featured</span> : <span className="featured-btn featured-btn-transparent"></span>}
                      <Link href='#'>
                        <div className="thumbnail-meta d-flex justify-content-between align-items-center">
                          <div className="meta-icon-title d-flex align-items-center">
                            <div className="icon">
                              <i className="flaticon-chef"></i>
                            </div>
                            <div className="title">
                              <h6>{show.buttonName}</h6>
                            </div>
                          </div>
                          <img
                            src="assets/images/right-arrow.png"
                            style={{ height: "32px", width: "32px" }}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="listing-content">
                      <h3 className="title">
                        <Link href="/listing-details-1">
                          <a>{show.showName}</a>
                        </Link>
                      </h3>
                      <div className="ratings">
                        <ul className={`ratings ${show.reviews}`}>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li className="star">
                            <i className="flaticon-star-1"></i>
                          </li>
                          <li>
                            <span>
                              <a href="#">({show.reviewNumber} Reviews)</a>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <span className="price">{show.Price}</span>
                      {show.contactNumber ? (
                        <span
                          className="phone-meta"
                          style={{ margin: "0px 5px 12px 0px" }}
                        >
                          <i className="ti-tablet"></i>
                          <a href="tel:+982653652-05">{show.contactNumber}</a>
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <div className="listing-meta">
                        <ul>
                          {show.location ? (
                            <li>
                              <span>
                                <i className="ti-location-pin"></i>
                                {show.location}
                              </span>
                            </li>
                          ) : (
                            <li></li>
                          )}

                          <li>
                            <span>
                              <i className="ti-star"></i>
                              <a href="#">Rate Us</a>
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
      </section> */}
      {/* <!--====== Start Place Section ======--> */}
      
      <Gallery gallery={photoGallery}/>
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      
      <Video video = {videoLink} quote= {getFreeQuote}/>
      {/* <!--====== Start Newsletter Section ======--> */}
      
      <Newsletter/>
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      
      <Clients clients={clientSlider}/>

    </Layout>
  );
};
export default Ambulance;
