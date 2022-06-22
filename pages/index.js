import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import { Nav, Tab } from "react-bootstrap";
import TestimoinalSlider from "../src/components/Slider/TestimonialSlider";
import BookingForm from "../src/components/bookingForm";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";

import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
  PlaceSliderTwo,
} from "../src/sliderProps";
import ShowsList from "../src/components/showsList";
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";

const Index = () => {
  const [video, setVideo] = useState(false);

  const bannerSlider = [
    {
      heading: "LORD OF THE UNIVERSE: ",
      subHeading:
        "The Story Of MAHADEV in 3D laser show with musical fountain at Ramalingeswar Park.",
      bannerImageUrl:
        "assets/images/BEMCAssets/rmpark_1_slider.png",
    },
    {
      heading: "In the SPORTS ARENA",
      subHeading:
        "You have to train your mind as much as your body.",
      bannerImageUrl:
        "assets/images/BEMCAssets/SportsComplex_2.png",
    },
    {
      heading: "BEMC  Seva: Ambulance",
      subHeading:
        "Day or Night, We do it Right! When seconds count we're there first.",
      bannerImageUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
    },
    {
      heading: "Kalyan Mandap",
      subHeading:
        "with a sense of history and Southern charm, within the reach of your fingertips",
      bannerImageUrl:
        "assets/images/BEMCAssets/kalyanmandap_2.jpeg",
    },
    {
      heading: "Town-Hall: BEMC Conference Hall",
      subHeading:
        "AC Auditorium available for booking with a capacity of 1000 pax maintained by BEMC",
      bannerImageUrl:
        "https://4ww1y37tl91gmoej12r01u1c-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/8BFC5A45-C291-890F-3C5CEE495EC4402D.jpg",
    }
  ];
  const showList = [
    {
      featured: true,
      imgUrl:
        "assets/images/BEMCAssets/SportsComplex_2.png",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Sports Arena",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_2_slider.png",
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
      featured: true,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_1_slider.png",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Shivananda Show",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "https://4ww1y37tl91gmoej12r01u1c-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/8BFC5A45-C291-890F-3C5CEE495EC4402D.jpg",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Townhall",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "assets/images/hearse.jpg",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Hearse",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "assets/images/BEMCAssets/kalyanmandap_2.jpeg",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Kalyan-Mandap",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
    {
      featured: false,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_5.jpg",
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
      featured: false,
      imgUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
      buttonIconUrl: "",
      buttonName: "Book",
      showName: "Ambulance",
      reviews: "ratings-four",
      reviewNumber: "05",
      Price: "",
      contactNumber: "9876543210",
      location: "Odisha",
    },
  ];
  const getFreeQuote = [
    {
      smallText: "LORD OF THE UNIVERSE",
      mainText: "The Story Of MAHADEV in 3D laser show with musical fountain at Ramalingeswar Park.",
      paragraph:
        "",
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
  const categorySection = [
    {
      icon: "assetsimages\featureiconspark.png",
      category: "Ramlingam Park",
    },
    {
      icon: "C:UserssanimDesktopBEMCpublicassetsimages\featureicons\townhall.png",
      category: "Town Hall",
    },
    {
      icon: "C:UserssanimDesktopBEMCpublicassetsimages\featureiconskalyanimandap.png",
      category: "Kalyan Mandap",
    },
    {
      icon: "publicassetsimages\featureiconssportsarena.png",
      category: "Sports Arena",
    },
    {
      icon: "feature1",
      category: "Ambulance",
    },
  ];
  const photoGallery = [
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/kalyanmandap_2.jpeg",
    },
    {
      imgId: 2,
      imgUrl: "assets/images/BEMCAssets/rmpark_2_slider.png",
    },
    {
      imgId: 3,
      imgUrl: "assets/images/BEMCAssets/kalyanmandap_1.jpeg",
    },
    {
      imgId: 4,
      imgUrl: "assets/images/BEMCAssets/SportsComplex_2.png",
    },
    {
      imgId: 5,
      imgUrl: "assets/images/BEMCAssets/ambulance_4.jpg",
    },
  ];
  const videoLink = [
    {link : "https://www.youtube.com/embed/JHlY8w69wSE"}
];
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner mainSlider={bannerSlider} activeForm='Ramlingam Park' pageOf="index"/>
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Category Section ======--> */}
      <section className="category-area">
        <div className="container">
          <div className="category-wrapper-one">
            <div className="row no-gutters d-flex justify-content-center">
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img src="assets/images/featureicons/black/park.png" alt="" style={{width: "60px", height: "60px"}}/>
                    </div>
                    <h6>Ramlingam Park</h6>
                  </div>
                  <Link href="/ramlingam-park">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '74px'}}>
                      <img
                        src="assets/images/featureicons/black/townhall.png"
                        alt=""
                        style={{width: "60px", height: "60px",marginTop:'4px'}}
                      />
                    </div>
                    <h6>Town Hall</h6>
                  </div>
                  <Link href="/townhall">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img
                        src="assets/images/featureicons/black/kalyanimandap.png"
                        alt=""
                        style={{width: "60px", height: "60px"}}
                      />
                    </div>
                    <h6>Kalyan Mandap</h6>
                  </div>
                  <Link href="/kalyan-mandap">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img
                        src="assets/images/featureicons/black/sportsarena.png"
                        alt=""
                        style={{width: "60px", height: "60px"}}
                      />
                    </div>
                    <h6>Sports Arena</h6>
                  </div>
                  <Link href="/sports-arena">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img
                        src="assets/images/featureicons/black/ambulance.png"
                        alt=""
                        style={{width: "60px", height: "60px"}}
                      />
                    </div>
                    <h6>Ambulance</h6>
                  </div>
                  <Link href="/ambulance">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img src="assets/images/featureicons/black/hearse.png" alt="" style={{width: "60px", height: "60px"}}/>
                    </div>
                    <h6>Hearse</h6>
                  </div>
                  <Link href="/hearse">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img src="assets/images/featureicons/black/tax.png" alt="" style={{width: "60px", height: "60px"}}/>
                    </div>
                    <h6>Tax</h6>
                  </div>
                  <Link href="/">
                    <a className="category-btn">
                      <i className="ti-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style = {{height: '70px'}}>
                      <img
                        src="assets/images/featureicons/black/grievance.png"
                        alt=""
                        style={{width: "60px", height: "60px"}}
                      />
                    </div>
                    <h6>Grievance</h6>
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
      </section>
      {/* <!--====== End Category Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}

      <ShowsList list={showList}/>
      {/* <!--====== Start Intro Video Section ======--> */}
      <Video video = {videoLink} quote= {getFreeQuote}/>
      {/* <!--====== End Intro Video Section ======--> */}
      {/* <!--====== Start Place Section ======--> */}
      <Gallery gallery={photoGallery}/>
      {/* <!--====== End Place Section ======--> */}

      {/*====== Start Testimonial Section ======*/}
      <section
        className="testimonial-area bg_cover pt-110 pb-140"
        style={{
          backgroundImage: "url(assets/images/bg/testimonial-bg-1.jpg)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title section-title-two section-title-white text-center mb-55">
                <h2>
                  <span className="line">Customer</span> Feedack
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="testimonial-wrapper-one text-center">
                <div className="testimonial-review-area">
                  <TestimoinalSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/* <!--====== Start Newsletter Section ======--> */}
      <Newsletter/>
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <Clients clients={clientSlider}/>
    </Layout>
  );
};
export default Index;


