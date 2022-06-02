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
import PreLoader from "../src/components/PreLoader";

const Index = () => {
  const [video, setVideo] = useState(false);

  const bannerSlider = [
    {
      heading: "Lorem Ipsum is simply ",
      subHeading:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      bannerImageUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
    {
      heading: "dummy text of the",
      subHeading:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      bannerImageUrl:
        "https://media.istockphoto.com/photos/winding-coast-road-in-corsica-picture-id1350993173?b=1&k=20&m=1350993173&s=170667a&w=0&h=vvgGktYjPV3IWLYTvWLsQnSsDsCChR_FO3d8e7touwk=",
    },
    {
      heading: "printing and typesetting industry",
      subHeading:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      bannerImageUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
  ];
  const showList = [
    {
      featured: true,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Mo Odisha",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: true,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Bande Utkala",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Shivananda Show",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
  ];
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
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
    },
  ];
  const photoGallery = [
    {
      imgId: 1,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
    {
      imgId: 1,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
    {
      imgId: 1,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
    {
      imgId: 1,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
    {
      imgId: 1,
      imgUrl:
        "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
    },
  ];

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <section className="hero-area">
        <div className="hero-wrapper-one">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7" style={{ padding: "0px" }}>
                <div className="hero-content d-none d-lg-block d-xl-block">
                  <Slider {...PlaceSliderTwo} className="banner-slider-one">
                    {bannerSlider.map((x) => {
                      return (
                        <div className="banner-items">
                          <img
                            src={x.bannerImageUrl}
                            alt=""
                            className="banner-background-image"
                          />
                          <div className="banner-text">
                            <div className="banner-text-inner">
                              <h1>{x.heading}</h1>
                              <h3>{x.subHeading}</h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              <div className="col-lg-5" style={{ padding: '0px' }}>
                <BookingForm active="Townhall Booking" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}

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
      </section>
      {/* <!--====== Start Place Section ======--> */}
      <section className="place-area pt-115 pb-110">
        <div className="container-fluid place-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60">
                <h2>Photo Gallery</h2>
              </div>
            </div>
          </div>
          <Slider {...PlaceSliderOne} className="place-slider-one">
            {photoGallery.map((photo) => {
              return (
                <div className="place-item place-item-one" key={photo.imgId}>
                  <div className="place-thumbnail">
                    <img src={photo.imgUrl} alt="Place Image" />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      <section className="intro-video" style={{ position: "relative" }}>
        <div className="col-lg-12">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/JHlY8w69wSE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{ height: "80vh", width: "100%" }}
          ></iframe>
        </div>
        <a
          href="#"
          className="video-popup"
          onClick={(e) => {
            e.preventDefault();
            setVideo(true);
          }}
        >
          <i className="flaticon-play-button"></i>
        </a>
        <div
          className="col-lg-7"
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: "43%",
          }}
        >
          {getFreeQuote.map((items) => {
            return (
              <div className="intro-content-box intro-content-box-one">
                <div className="section-title section-title-left section-title-white mb-35">
                  <span className="sub-title">{items.smallText}</span>
                  <h2>{items.mainText}</h2>
                </div>
                <p>{items.paragraph}</p>
              </div>
            );
          })}
        </div>
      </section>
      {/* <!--====== Start Newsletter Section ======--> */}
      <section className="newsletter-area">
        <div className="container">
          <div
            className="newsletter-wrapper newsletter-wrapper-one bg_cover"
            style={{
              backgroundImage: `url(assets/images/bg/newsletter-bg-1.jpg)`,
            }}
          >
            <div className="row">
              <div className="col-lg-5">
                <div className="newsletter-content-box-one">
                  <div className="icon">
                    <i className="flaticon-email"></i>
                  </div>
                  <div className="content">
                    <h2>Get Special Rewards</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form">
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Enter Address"
                      name="email"
                      required
                    />
                    <i className="ti-location-pin"></i>
                    <button className="main-btn">Subscribe +</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <section className="client-area pt-120">
        <div className="client-wrapper-one pb-120">
          <div className="container">
            <Slider {...ClientSliderOne} className="client-slider-one">
              {clientSlider.map((clientImg) => {
                return (
                  <div className="client-item">
                    <div className="client-img">
                      <a href="#">
                        <img src={clientImg.imgUrl} alt="Client Image" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Index;
