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


const Hearse = () => {
  const [video, setVideo] = useState(false);
  const [hearseData, setHearseData] = useState();
  const [isLoaded, setIsLoaded] = useState(false)
  const getAllHarse = async () => {
    let apiTest = {
      method: 'post',
      url: "harse/harse/getAllHarse"
    }
    let response = await callApi(apiTest)
    setHearseData(response.data.data)
    setIsLoaded(true)
  }
  const bannerSlider = [];
  for (let i = 0; i < hearseData?.length; i++) {
    bannerSlider.push(hearseData[i].banner)
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
  for (let i = 0; i < hearseData?.length; i++) {
    photoGallery.push(...(hearseData[i].photoGallery))
  }
  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];
  useEffect(() => {
    getAllHarse()
  }, [])
  return (
    !isLoaded ? <PreLoader /> : <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner overallData={hearseData} mainSlider={bannerSlider} activeForm='harse' pageOf="harse" />
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      <ShowsList overallData={hearseData} pageOf="harse" />
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
export default Hearse;
