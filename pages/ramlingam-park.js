import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Banner from "../src/components/Slider/banner";
import Gallery from "../src/components/Gallery";
import ShowsList from "../src/components/showsList";
import Video from "../src/components/video";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import { apiSecret, apiUrl, token } from "../src/constants/defaultValues";
import { callApi } from "../src/apiHandlers/callApi";

const Index = () => {
  const [video, setVideo] = useState(false);
  async function fetchEvents() {
    let apiTest={
      methot:'get',
      url:"user/sampleApi",
      data:{
          data_one:"fskuj0",
          data_two:"fskuj0",
          data_three:"fskuj0",
      }
  }
    let response =await  callApi(apiTest)
    console.log(response)
  }

  useEffect(()=>{
    fetchEvents()
  },[])
  const bannerSlider = [
    {
      heading: "LORD OF THE UNIVERSE: ",
      subHeading:
        "The Story Of MAHADEV in 3D laser show with musical fountain at Ramalingeswar Park.",
      bannerImageUrl: "assets/images/BEMCAssets/rmpark_1_slider.png",
    },
  ];
  const showList = [
    {
      featured: true,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_3.jpg",
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
        "assets/images/BEMCAssets/rmpark_4.jpg",
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
        "assets/images/BEMCAssets/rmpark_2.jpg",
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
        "assets/images/BEMCAssets/rmpark_2.jpg",
    },
    {
      imgId: 2,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_3.jpg",
    },
    {
      imgId: 3,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_4.jpg",
    },
    {
      imgId: 4,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_5.jpg",
    },
    {
      imgId: 5,
      imgUrl:
        "assets/images/BEMCAssets/rmpark_1_slider.png",
    },
  ];

  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];

  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner mainSlider={bannerSlider} activeForm='Ramlingam Park' />
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      <ShowsList list={showList} />
      {/* <!--====== Start Place Section ======--> */}
      <Gallery gallery={photoGallery} />
      {/* <!--====== End Place Section ======--> */}
      {/* <!--====== Start Intro Video Section ======--> */}
      <Video video={videoLink} quote={getFreeQuote} />
      {/* <!--====== Start Newsletter Section ======--> */}
      <Newsletter />
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <Clients clients={clientSlider} />
    </Layout>
  );
};
export default Index;
