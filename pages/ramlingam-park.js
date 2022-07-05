import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import { Nav, Tab } from "react-bootstrap";
import BookingForm from "../src/components/bookingForm";
import PreLoader from "../src/components/PreLoader";

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
  const [ramlingamData,setRamlingamData] = useState([])
  const [isLoaded,setIsLoaded] = useState(false)
  // const [bannerSlider,setBannerSlider] = useState([])

  /**************fetch ramlingam park events*********************/


  async function fetchEvents() {
    let apiTest={
      method:'post',
      url:"ramalingampark/event/getEvent"
  }
    let response = await  callApi(apiTest)
    if(response.data.code==201){
      setIsLoaded(true)
      setRamlingamData(response.data.data)
    }
  }
  useEffect(()=>{
    fetchEvents()
  },[])
// console.log(ramlingamData)

  /*****************set banner data****************************/
  const bannerSlider = [];
  for (let i=0;i<ramlingamData.length;i++){
    bannerSlider.push(ramlingamData[i].banner)
  }
  
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
  const photoGallery = [];
  for (let i=0;i<ramlingamData.length;i++){
    photoGallery.push(...(ramlingamData[i].photoGallery))
    // console.log()
  }
  // console.log(photoGallery,'photos')
  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];

  return (
    (!isLoaded)?
    <PreLoader/>:
    <Layout>
    {video && <VideoPopup close={setVideo} />}
    {/* <!--====== Start Hero Section ======--> */}
    <Banner overallData={ramlingamData} mainSlider={bannerSlider} activeForm='Ramlingam Park' pageOf="Ramlingam Park" />
    {/* <!--====== End Hero Section ======--> */}
    {/* <!--====== Start Listing Section ======--> */}
    <ShowsList overallData={ramlingamData}/>
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
