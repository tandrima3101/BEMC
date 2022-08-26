import React, { useEffect, useState } from "react";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import PreLoader from "../src/components/PreLoader";
import Banner from "../src/components/Slider/banner";
import ShowsList from "../src/components/showsList";
import Gallery from "../src/components/Gallery";
import Video from "../src/components/video";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import { callApi } from "../src/apiHandlers/callApi";

const Index = () => {
  const [video, setVideo] = useState(false);
  const [arenaData, setArenaData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [membership,setMembership] = useState();

  async function fetchEvents() {
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllSportsArena"
    }
    let response = await callApi(apiTest)
    if (response.data.code == 201) {
      setIsLoaded(true)
      setArenaData(response.data.data)
    }
  }
  async function fetchMembership(){
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllMembership"
    }
    let response = await callApi(apiTest)
    setMembership(response.data.data)
  }
  useEffect(() => {
    fetchEvents();
    fetchMembership();
  },[])
  const bannerSlider = [];
  for (let i = 0; i < arenaData.length; i++) {
    bannerSlider.push(arenaData[i].banner)
  }
  const photoGallery = [];
  for (let i = 0; i < arenaData.length; i++) {
    photoGallery.push(...(arenaData[i].photoGallery))
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
  ];
  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];

  return (
    !isLoaded ? <PreLoader /> : 
    <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner mainSlider={bannerSlider} activeForm='sportsArena'membership={membership} pageOf="sportsArena" overallData={arenaData}/>
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      <h2 className="section-title text-center mb-75 mt-75"><b>Sports Arena List</b></h2>
      <ShowsList overallData={arenaData} pageOf="sportsArena" />
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
