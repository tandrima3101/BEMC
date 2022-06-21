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

import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";


const Index = () => {
  const [video, setVideo] = useState(false);

  const bannerSlider = [
    {
      heading: "Town-Hall: BEMC Conference Hall",
      subHeading:
        "AC Auditorium available for booking with a capacity of 1000 pax maintained by BEMC",
      bannerImageUrl:
        "https://4ww1y37tl91gmoej12r01u1c-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/8BFC5A45-C291-890F-3C5CEE495EC4402D.jpg",
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
        "assets/images/BEMCAssets/thall_2.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/thall_1.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/thall_2.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/thall_1.jpg",
    },
    {
      imgId: 1,
      imgUrl:
        "assets/images/BEMCAssets/thall_2.jpg",
    },
  ];
  const videoLink = [
    {link : "https://www.youtube.com/embed/JHlY8w69wSE"}
];

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      
      <Banner mainSlider={bannerSlider} activeForm='Townhall Booking' pageOf="Townhall Booking" />

      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}

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
export default Index;
