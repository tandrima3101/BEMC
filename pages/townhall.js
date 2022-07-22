// import Link from "next/link";
// import React, { useState } from "react";
// import Slider from "react-slick";
// import Counter from "../src/components/Counter";
// import VideoPopup from "../src/components/VideoPopup";
// import Layout from "../src/layouts/Layout";
// import { Nav, Tab } from "react-bootstrap";
// import BookingForm from "../src/components/bookingForm";

// import {
//   ClientSliderOne,
//   ListingSliderOne,
//   PlaceSliderOne,
//   PlaceSliderTwo,
// } from "../src/sliderProps";
// import PreLoader from "../src/components/PreLoader";

// import Gallery from "../src/components/Gallery";
// import Newsletter from "../src/components/newsletter";
// import Clients from "../src/components/clients";
// import Banner from "../src/components/Slider/banner";
// import Video from "../src/components/video";


// const Index = () => {
//   const [video, setVideo] = useState(false);

//   const bannerSlider = [
//     {
//       heading: "Town-Hall: BEMC Conference Hall",
//       subHeading:
//         "AC Auditorium available for booking with a capacity of 1000 pax maintained by BEMC",
//       bannerImageUrl:
//         "https://4ww1y37tl91gmoej12r01u1c-wpengine.netdna-ssl.com/wp-content/uploads/2019/08/8BFC5A45-C291-890F-3C5CEE495EC4402D.jpg",
//     }
//   ];
//   // const showList = [
//   //   {
//   //     featured: true,
//   //     imgUrl:
//   //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
//   //     buttonIconUrl: "",
//   //     buttonName: "Book",
//   //     showName: "Mo Odisha",
//   //     reviews: "ratings-four",
//   //     reviewNumber: "05",
//   //     Price: "",
//   //     contactNumber: "9876543210",
//   //     location: "Odisha",
//   //   },
//   //   {
//   //     featured: true,
//   //     imgUrl:
//   //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
//   //     buttonIconUrl: "",
//   //     buttonName: "Book",
//   //     showName: "Bande Utkala",
//   //     reviews: "ratings-four",
//   //     reviewNumber: "05",
//   //     Price: "",
//   //     contactNumber: "9876543210",
//   //     location: "Odisha",
//   //   },
//   //   {
//   //     featured: false,
//   //     imgUrl:
//   //       "https://media.istockphoto.com/photos/driving-on-idyllic-roads-picture-id1303391856?b=1&k=20&m=1303391856&s=170667a&w=0&h=RvzNO06n8AZHSw8B0xm6Lac0bBe6WLdsw5kMNSxgc5E=",
//   //     buttonIconUrl: "",
//   //     buttonName: "Book",
//   //     showName: "Shivananda Show",
//   //     reviews: "ratings-four",
//   //     reviewNumber: "05",
//   //     Price: "",
//   //     contactNumber: "9876543210",
//   //     location: "Odisha",
//   //   },
//   // ];
//   const getFreeQuote = [
//     {
//       smallText: "Checkout List",
//       mainText: "Professional planners for your vacation",
//       paragraph:
//         "Risus urnas Iaculis per amet vestibulum luctus tincidunt ultricies aenean quam eros eleifend sodales cubilia mattis quam.",
//     },
//   ];
//   const clientSlider = [
//     {
//       imgUrl:
//         "https://odisha.gov.in/themes/swf/theme/images/5t_logo.png",
//     },
//     {
//       imgUrl:
//         "https://www.berhampur.gov.in/wp-content/uploads/2020/08/Bemc-Logo-min.png",
//     },
//     {
//       imgUrl:
//         "https://pbs.twimg.com/profile_images/948877813414703104/JStN81Ro_400x400.jpg",
//     },
    
//     {
//       imgUrl:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Seal_of_Odisha.png/1200px-Seal_of_Odisha.png",
//     },
//     // {
//     //   imgUrl:
//     //     "https://images.unsplash.com/photo-1488646953014-85cb44e25828?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735",
//     // },
//   ];
//   const photoGallery = [
//     {
//       imgId: 1,
//       imgUrl:
//         "assets/images/BEMCAssets/thall_2.jpg",
//     },
//     {
//       imgId: 1,
//       imgUrl:
//         "assets/images/BEMCAssets/thall_1.jpg",
//     },
//     {
//       imgId: 1,
//       imgUrl:
//         "assets/images/BEMCAssets/thall_2.jpg",
//     },
//     {
//       imgId: 1,
//       imgUrl:
//         "assets/images/BEMCAssets/thall_1.jpg",
//     },
//     {
//       imgId: 1,
//       imgUrl:
//         "assets/images/BEMCAssets/thall_2.jpg",
//     },
//   ];
//   const videoLink = [
//     {link : "https://www.youtube.com/embed/JHlY8w69wSE"}
// ];

//   return (
//     <Layout>
//       {video && <VideoPopup close={setVideo} />}
//       {/* <!--====== Start Hero Section ======--> */}
      
//       <Banner mainSlider={bannerSlider} activeForm='Townhall Booking' pageOf="Townhall Booking" />

//       {/* <!--====== End Hero Section ======--> */}
//       {/* <!--====== Start Listing Section ======--> */}

//       {/* <!--====== Start Place Section ======--> */}
//       <Gallery gallery={photoGallery}/>

//       {/* <!--====== End Place Section ======--> */}
//       {/* <!--====== Start Intro Video Section ======--> */}
//       <Video video = {videoLink} quote= {getFreeQuote}/>

//       {/* <!--====== Start Newsletter Section ======--> */}
//       <Newsletter/>

//       {/* <!--====== End Newsletter Section ======--> */}
//       {/* <!--====== Start Client Section ======--> */}
//       <Clients clients={clientSlider}/>

//     </Layout>
//   );
// };
// export default Index;
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
import TestimoinalSlider from '../src/components/Slider/TestimonialSlider'
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
  const [reviews,setReviews] = useState([])
  // const [bannerSlider,setBannerSlider] = useState([])

  /**************fetch ramlingam park events*********************/


  async function fetchEvents() {
    let apiTest={
      method:'post',
      url:"townhall/createTownhall/getTownhallList"
  }
    let response = await  callApi(apiTest)
    if(response.data.code==201){
      setIsLoaded(true)
      setRamlingamData(response.data.data)
    }
  }
  async function fetchReviews() {
    let apiTest={
      method:'get',
      url:"ramalingampark/event/getAllReview"
  }
    let response = await  callApi(apiTest)
    // console.log(response,'responseeeeeeeeee')
    if(response.data.code==201){
      setReviews(response.data.data)
    }
  }
  useEffect(()=>{
    fetchEvents()
    fetchReviews()
  },[])
console.log(reviews,'reviewssssssss')

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
    <Banner overallData={ramlingamData} mainSlider={bannerSlider} activeForm='Townhall Booking' pageOf="Townhall" />
    {/* <!--====== End Hero Section ======--> */}
    {/* <!--====== Start Listing Section ======--> */}
    <ShowsList overallData={ramlingamData}/>
    {/* <!--====== Start Place Section ======--> */}
    <Gallery gallery={photoGallery} />
    {/* <!--====== End Place Section ======--> */}
    {/* <!--=================start testimonial section==============--> */}
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
                  <TestimoinalSlider data={reviews}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--==============end testimonial section==============--> */}
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

