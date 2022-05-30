import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import { Nav, Tab } from "react-bootstrap";


import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
  PlaceSliderTwo
} from "../src/sliderProps";

const Index = () => {
  const [video, setVideo] = useState(false);

  const bannerSlider = [
    {
      heading: 'Lorem Ipsum is simply ',
      subHeading: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bannerImageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735'
    },
    {
      heading: 'dummy text of the',
      subHeading: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bannerImageUrl: 'https://media.istockphoto.com/photos/winding-coast-road-in-corsica-picture-id1350993173?b=1&k=20&m=1350993173&s=170667a&w=0&h=vvgGktYjPV3IWLYTvWLsQnSsDsCChR_FO3d8e7touwk='
    },
    {
      heading: 'printing and typesetting industry',
      subHeading: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bannerImageUrl: 'https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E='
    }
  ];
  const showList = [
    {
      featured: true,
      imgUrl: 'https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=',
      buttonIconUrl: '',
      buttonName: 'Book',
      showName:'Mo Odisha',
      reviews: 'ratings-four',
      reviewNumber:'05',
      Price: '',
      contactNumber: '9876543210',
      location: 'Odisha'
    },
    {
      featured: true,
      imgUrl: 'https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=',
      buttonIconUrl: '',
      buttonName: 'Book',
      showName:'Bande Utkala',
      reviews: 'ratings-four',
      reviewNumber:'05',
      Price: '',
      contactNumber: '9876543210',
      location: 'Odisha'
    },
    {
      featured: false,
      imgUrl: 'https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=',
      buttonIconUrl: '',
      buttonName: 'Book',
      showName:'Shivananda Show',
      reviews: 'ratings-four',
      reviewNumber:'05',
      Price: '',
      contactNumber: '9876543210',
      location: 'Odisha'
    }
  ]
  const getFreeQuote = [
    {
      smallText: 'Checkout List',
      mainText: 'Professional planners for your vacation',
      paragraph: 'Risus urnas Iaculis per amet vestibulum luctus tincidunt ultricies aenean quam eros eleifend sodales cubilia mattis quam.'
    }
  ]

  const photoGallery = [
    {
      imageid : 1,
      imageurl : 'https://picsum.photos/id/237/200/300'
    },
    {
      imageid : 2,
      imageurl : 'https://picsum.photos/seed/picsum/200/300'
    },
    {
      imageid : 3,
      imageurl : 'https://picsum.photos/200/300?grayscale'
    },
    {
      imageid : 4,
      imageurl : 'https://picsum.photos/200/300/?blur=2'
    },
    {
      imageid : 5,
      imageurl : 'https://picsum.photos/seed/picsum/200/300'
    },
    {
      imageid : 6,
      imageurl : 'https://picsum.photos/seed/picsum/200/300'
    },
  ]

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      
      <section className="hero-area">
        <div className="hero-wrapper-one">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-7" style={{ padding: '0px' }}>
                <div className="hero-content">
                <Slider
                    {...PlaceSliderTwo}
                    className="banner-slider-one wow fadeInDown"
                  >
                    {bannerSlider.map((x) => {
                      return (

                        <div className="banner-items">
                          <img src={x.bannerImageUrl} alt="" className="banner-background-image" />
                          <div className="banner-text">
                            <div className="banner-text-inner">
                              <h1 className="wow fadeInUp" wow-data-delay="30mss">
                                {x.heading}
                              </h1>
                              <h3 className="wow fadeInDown" wow-data-delay="50ms">
                                {x.subHeading}
                              </h3>
                            </div>
                          </div>
                        </div>

                      )
                    })}
                  </Slider>
                  {/* <div
                    className="hero-search-wrapper wow fadeInUp"
                    wow-data-delay="70ms"
                  >
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-lg-5 col-md-4 col-sm-12">
                          <div className="form_group">
                            <input
                              type="search"
                              className="form_control"
                              placeholder="Search By Category"
                              name="search"
                              required
                            />
                            <i className="ti-ink-pen"></i>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form_group">
                            <input
                              type="text"
                              className="form_control"
                              placeholder="Location"
                              name="location"
                              required
                            />
                            <i className="ti-location-pin"></i>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                          <div className="form_group">
                            <button className="main-btn icon-btn">
                              Search Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div> */}
                  {/* <p className="tags">
                    <span>Popular:</span>
                    <a href="#">Saloon</a>,<a href="#">Restaurant</a>,
                    <a href="#">Game</a>,<a href="#">Counter</a>,
                    <a href="#">Train Station</a>,<a href="#">Parking</a>,
                    <a href="#">Shooping</a>
                  </p> */}
                </div>
              </div>
              <div className="col-lg-5" style={{ padding: '0px' }}>
                <Tab.Container defaultActiveKey={"flight"}>
                  <form onSubmit={(e) => e.preventDefault()} className="banner-booking-form">
                    <div className="form-inner">
                      <div className="row align-items-center">
                        <div className="col-lg-12">
                          <div className="search-nav mb-10">
                            <Nav as="ul" className="nav nav-tabs" style={{ borderBottom: '0px' }}>
                              <Nav.Item>
                                <Nav.Link
                                  as="a"
                                  className="c-pointer"
                                  eventKey="flight"
                                >
                                  <i className="far fa-plane-departure" />
                                  Flight
                                </Nav.Link>
                              </Nav.Item>
                              <li className="nav-item">
                                <Nav.Link
                                  as="a"
                                  className="c-pointer"
                                  eventKey="hotels"
                                >
                                  <i className="far fa-building" />
                                  Hotels
                                </Nav.Link>
                              </li>
                              <li className="nav-item">
                                <Nav.Link
                                  as="a"
                                  className="c-pointer"
                                  eventKey="rentcar"
                                >
                                  <i className="far fa-car" />
                                  Rent a Car
                                </Nav.Link>
                              </li>
                            </Nav>
                          </div>
                        </div>
                      </div>
                      <div className="hero-search-form tab-content">
                        <Tab.Pane className="show active">
                          <div className="row">
                            <div className="col-lg-12 col-md-6">
                              <div className="form_group">
                                <input
                                  type="text"
                                  className="form_control"
                                  placeholder="Search By Category"
                                  name="search"
                                  required
                                />
                                <i className="ti-ink-pen"></i>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-6">
                              <div className="form_group">
                                <select className="wide">
                                  <option value="01">Museums</option>
                                  <option value="02">Restaurant</option>
                                  <option value="03">Party Center</option>
                                  <option value="04">Fitness Zone</option>
                                  <option value="05">Game Field</option>
                                  <option value="06">Job & Feeds</option>
                                  <option value="07">Shooping</option>
                                  <option value="08">Art Gallery</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-6">
                              <div className="form_group">
                                <input
                                  type="text"
                                  className="form_control"
                                  placeholder="Location"
                                  name="location"
                                  required
                                />
                                <i className="ti-location-pin"></i>
                              </div>
                            </div>
                            <div className="col-lg-10 col-md-6">
                              <button className="main-btn icon-btn">
                                Search Now
                              </button>
                            </div>
                          </div>
                        </Tab.Pane>
                      </div>
                    </div>
                  </form>

                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </section>






      


      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Category Section ======--> */}
      {/* <section className="category-area">
        <div className="container">
          <div className="category-wrapper-one wow fadeInDown">
            <div className="row no-gutters">
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-government"></i>
                    </div>
                    <h6>Museums</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-serving-dish"></i>
                    </div>
                    <h6>Restaurant</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-game-controller"></i>
                    </div>
                    <h6>Game Field</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-suitcase"></i>
                    </div>
                    <h6>Job & Feed</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-gift-box"></i>
                    </div>
                    <h6>Party Center</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 category-column">
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon">
                      <i className="flaticon-dumbbell"></i>
                    </div>
                    <h6>Fitness Zone</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!--====== End Category Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      
      <section className="listing-grid-area pt-115 pb-75">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-75 wow fadeInUp">
                <h2>Shows List </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {showList.map((show) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="listing-item listing-grid-one mb-45 wow fadeInUp"
                    dta-wow-delay="10ms"
                  >
                    <div className="listing-thumbnail">
                      <img
                        src={show.imgUrl}
                        alt="Listing Image"
                      />
                      {show.featured?<span className="featured-btn">Featured</span>:<span></span>}
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
                          <img src="assets/images/right-arrow.png" />
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
                      {show.contactNumber?<span className="phone-meta">
                        <i className="ti-tablet"></i>
                        <a href="tel:+982653652-05">{show.contactNumber}</a>
                      </span>:<span></span>}
                      
                      <div className="listing-meta">
                        <ul>
                          {show.location?<li>
                            <span>
                              <i className="ti-location-pin"></i>{show.location}
                            </span>
                          </li>:<li></li>}
                          
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
              )
            })}
          </div>
        </div>
      </section>

      {/* <!--====== End Listing Section ======--> */}
      {/* <!--====== Start offer Section ======--> */}
      {/* <section className="cta-area">
        <div
          className="cta-wrapper-one bg_cover"
          style={{ backgroundImage: `url(assets/images/bg/cta-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="cta-content-box text-center wow fadeInUp">
                  <img src="assets/images/icon-1.png" alt="offer icon" />
                  <h2>Splash Yourself Bigger Offer on Everyday</h2>
                  <Link href="/how-work">
                    <a className="main-btn icon-btn">Explore Now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!--====== End offer Section ======--> */}
      {/* <!--====== Start Features Section ======--> */}
      {/* {/* <section className="features-area">
        <div className="features-wrapper-one pt-120">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="features-img wow fadeInLeft">
                  <img
                    src="assets/images/features/features-1.jpg"
                    alt="Features Image"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="features-content-box features-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Our Speciality</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <h5>
                    Risus urnas Iaculis per amet vestibulum luctus.tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </h5>
                  <ul className="features-list-one">
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="10ms"
                    >
                      <div className="icon">
                        <i className="flaticon-find"></i>
                      </div>
                      <div className="content">
                        <h5>Find What You Want</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="20ms"
                    >
                      <div className="icon">
                        <i className="flaticon-place"></i>
                      </div>
                      <div className="content">
                        <h5>Easy Choose Your Place</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                    <li
                      className="list-item wow fadeInUp"
                      data-wow-delay="30ms"
                    >
                      <div className="icon">
                        <i className="flaticon-social-care"></i>
                      </div>
                      <div className="content">
                        <h5>Live Online Assistance</h5>
                        <p>
                          Rhoncus dolor quam etiam mattis, tincidunt nec
                          lobortis sociis facilisi aenean netus tempor duis.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!--====== End Features Section ======--> */}
      {/* <!--====== Start Place Section ======--> */}
      <section className="place-area pt-115 pb-110">
        <div className="container-fluid place-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <h2>Photo Gallery</h2>
              </div>
            </div>
          </div>
          <Slider
            {...PlaceSliderOne}
            className="place-slider-one wow fadeInDown"
          >

            {photoGallery.map((photo) => {
              return(
                <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src={photo.imageurl} alt="Place Image" />
              </div>
            </div>
              )
            })}
            
            {/* <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid">
                      <a className="arrow-btn">
                        <i className="ti-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid">
                      <a className="arrow-btn">
                        <i className="ti-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid">
                      <a className="arrow-btn">
                        <i className="ti-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid">
                      <a className="arrow-btn">
                        <i className="ti-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-item place-item-one">
              <div className="place-thumbnail">
                <img src="https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=" alt="Place Image" />
                <div className="place-overlay">
                  <div className="place-content text-center">
                    <span className="listing">10 Listing</span>
                    <h3 className="title">Australia</h3>
                    <Link href="/listing-grid">
                      <a className="arrow-btn">
                        <i className="ti-arrow-right"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>w
            </div> */}
          </Slider>
        </div>
      </section>
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Download Section ======--> */}
      {/* <section className="download-app">
        <div className="download-wrapper-one pt-115">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="app-img wow fadeInLeft">
                  <img src="assets/images/app-1.png" alt="App Image" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="download-content-box download-content-box-one">
                  <div className="section-title section-title-left mb-25 wow fadeInUp">
                    <span className="sub-title">Downlaod App</span>
                    <h2>Comprehnsive All Great Destination Here</h2>
                  </div>
                  <p>
                    Dictumst integer tellus eros quam vestibulum ante tortor
                    mollis adipisn pharetra curae curae and pulvinar porttitor
                  </p>
                  <ul className="button wow fadeInDown">
                    <li>
                      <Link href="/">
                        <a className="app-btn">
                          <div className="icon">
                            <i className="ti-android"></i>
                          </div>
                          <div className="info">
                            <span>get it on</span>
                            <h6>Goole Play</h6>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <a className="app-btn">
                          <div className="icon">
                            <i className="ti-apple"></i>
                          </div>
                          <div className="info">
                            <span>get it on</span>
                            <h6>App Store</h6>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <div className="counter-area pt-120">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Member</span>Professional
                            </h4>
                            <h3>
                              <Counter end={220} /> +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Listing</span>Received
                            </h4>
                            <h3>
                              <Counter end={72} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-ms-12">
                        <div className="counter-item counter-item-one wow fadeInUp">
                          <div className="info">
                            <h4>
                              <span>Client</span>Satisfaction
                            </h4>
                            <h3>
                              <Counter end={50} />K +
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/*<!--====== End Download Section ======--> */}
      {/* <!--====== Start Popular Listing Section ======--> */}
      {/* <section className="listing-grid-area pt-75 pb-110">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Featured List</span>
                <h2>Explore Destination</h2>
              </div>
            </div>
          </div>
          <Slider
            {...ListingSliderOne}
            className="listing-slider-one wow fadeInDown"
          >
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-7.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-four">
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
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">
                    <a>Pizza Recipe</a>
                  </Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-8.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-dumbbell"></i>
                </a>
                <ul className="ratings ratings-three">
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
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">Gym Ground</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-close">close</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-9.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-government"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-five">
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
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">City Palace</Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="listing-item listing-grid-item-two">
              <div className="listing-thumbnail">
                <img
                  src="assets/images/listing/listing-grid-1.jpg"
                  alt="Listing Image"
                />
                <a href="#" className="cat-btn">
                  <i className="flaticon-chef"></i>
                </a>
                <span className="featured-btn">Featured</span>
                <ul className="ratings ratings-two">
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
                      <a href="#">(02 Reviews)</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="listing-content">
                <h3 className="title">
                  <Link href="/listing-details-1">
                    <a>Pizza Recipe</a>
                  </Link>
                </h3>
                <p>Popular restaurant in california</p>
                <span className="phone-meta">
                  <i className="ti-tablet"></i>
                  <a href="tel:+982653652-05">+98 (265) 3652 - 05</a>
                  <span className="status st-open">Open</span>
                </span>
                <div className="listing-meta">
                  <ul>
                    <li>
                      <span>
                        <i className="ti-location-pin"></i>California, USA
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="ti-heart"></i>
                        <a href="#">Save</a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section> */}
      {/* <!--====== End Popular Listing Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      <section className="intro-video" style={{ position: 'relative' }}>
        <div className="col-lg-12">

          <iframe width="560" height="315" src="https://www.youtube.com/embed/JHlY8w69wSE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style={{ height: '80vh', width: '100vw' }}></iframe>
        </div>
        <div className="col-lg-7" style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '43%'
        }}>
          {getFreeQuote.map((items) => {
            return (<div className="intro-content-box intro-content-box-one wow fadeInRight">
              <div className="section-title section-title-left section-title-white mb-35">
                <span className="sub-title">{items.smallText}</span>
                <h2>{items.mainText}</h2>
              </div>
              <p>
                {items.paragraph}
              </p>
            </div>)
          })}
        </div>
        {/* <div
          className="intro-wrapper-one bg_cover pt-115"
          style={{ backgroundImage: `url(assets/images/bg/video-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row align-items-center">

              <div className="col-lg-5">
                <div className="play-content play-content-one text-center wow fadeInLeft">
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
                  <h5>Play Video</h5>
                </div>
              </div>
              <div className="col-lg-7">
                {getFreeQuote.map((items) => {
                  return (<div className="intro-content-box intro-content-box-one wow fadeInRight">
                    <div className="section-title section-title-left section-title-white mb-35">
                      <span className="sub-title">{items.smallText}</span>
                      <h2>{items.mainText}</h2>
                    </div>
                    <p>
                      {items.paragraph}
                    </p>
                  </div>)
                })}
              </div>
            </div>
          </div>
        </div> */}
      </section>
      {/* <section className="intro-video">
        <div
          className="intro-wrapper-one bg_cover pt-115"
          style={{ backgroundImage: `url(assets/images/bg/video-bg-1.jpg)` }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="play-content play-content-one text-center wow fadeInLeft">
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
                  <h5>Play Video</h5>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="intro-content-box intro-content-box-one wow fadeInRight">
                  <div className="section-title section-title-left section-title-white mb-35">
                    <h2>Professional planners for your vacation</h2>
                  </div>
                  <p>
                    Risus urnas Iaculis per amet vestibulum luctus tincidunt
                    ultricies aenean quam eros eleifend sodales cubilia mattis
                    quam.
                  </p>
                  <Link href="/listing-grid">
                    <a className="main-btn icon-btn">Explore List</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!--====== End Intro Video Section ======--> */}
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
                <div className="newsletter-content-box-one wow fadeInLeft">
                  <div className="icon">
                    <i className="flaticon-email"></i>
                  </div>
                  <div className="content">
                    <h2>Get Special Rewards</h2>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="newsletter-form wow fadeInRight">
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
            <Slider
              {...ClientSliderOne}
              className="client-slider-one wow fadeInDown"
            >
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/01.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/03.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/04.png" alt="Client Image" />
                  </a>
                </div>
              </div>
              <div className="client-item">
                <div className="client-img">
                  <a href="#">
                    <img src="assets/images/client/02.png" alt="Client Image" />
                  </a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      {/* <!--====== End Client Section ======--> */}
      {/* <!--====== Start Blog Section ======--> */}
      {/* <section className="blog-area pt-115 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Recent Articles</span>
                <h2>Every Single Journal</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="10ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <a>
                      <img
                        src="assets/images/blog/blog-1.jpg"
                        alt="Blog Image"
                      />
                    </a>
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Duis nonummy socios mattis tempus penatibus</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="20ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <a>
                      <img
                        src="assets/images/blog/blog-2.jpg"
                        alt="Blog Image"
                      />
                    </a>
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i>Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Litora phasellus in phasellus curabitur porta eun</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="blog-post-item blog-post-item-one mb-40 wow fadeInUp"
                data-wow-delay="310ms"
              >
                <div className="post-thumbnail">
                  <Link href="/blog-details">
                    <a>
                      <img
                        src="assets/images/blog/blog-3.jpg"
                        alt="Blog Image"
                      />
                    </a>
                  </Link>
                  <div className="post-date">
                    <a href="#">
                      20 <span>Oct</span>
                    </a>
                  </div>
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    <i className="ti-bookmark-alt"></i> Tours & Travel
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Mattis parturent tortor lectus lestie sapien Dapus</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="ti-comments-smiley"></i>
                          <a href="#">0 Comment</a>
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="ti-id-badge"></i>
                          <a href="#">By admin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="button text-center mt-40">
                <Link href="/blog">
                  <a className="main-btn icon-btn">View Blog</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!--====== End Blog Section ======--> */}
    </Layout>
  );
};
export default Index;
