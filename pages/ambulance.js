import Link from "next/link";
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
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";
import { callApi } from "../src/apiHandlers/callApi";



const Ambulance = () => {
  const [video, setVideo] = useState(false);
  const [ambulanceData,setAmbulanceData] = useState()
  const getAllAmbulance = async () => {
    let apiTest = {
      method: 'post',
      url: "ambulance/ambulance/getAllAmbulance"
    }
    let response = await callApi(apiTest)
    console.log(response,'ambulance response')
    setAmbulanceData(response.data.data)
  }
  const bannerSlider = [
    {
      heading: "BEMC  Seva: Ambulance",
      subHeading:
        "Day or Night, We do it Right! When seconds count we're there first.",
      bannerImageUrl:
        "assets/images/BEMCAssets/ambulance_4.jpg",
    }
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
useEffect(()=>{
  getAllAmbulance()
},[])
  return (
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner mainSlider={bannerSlider} activeForm='Ambulance' pageOf="ambulance"/>
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
export default Ambulance;
