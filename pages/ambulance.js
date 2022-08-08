import React, { useEffect, useState } from "react";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";
import { callApi } from "../src/apiHandlers/callApi";
import ShowsList from "../src/components/showsList";
import PreLoader from "../src/components/PreLoader";

const Ambulance = () => {
  const [video, setVideo] = useState(false);
  const [ambulanceData, setAmbulanceData] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const getAllAmbulance = async () => {
    let apiTest = {
      method: 'post',
      url: "ambulance/ambulance/getAllAmbulance"
    }
    let response = await callApi(apiTest)
    setAmbulanceData(response.data.data)
  }
  console.log(ambulanceData, 'ambulance response')
useEffect(()=>{
  {ambulanceData && setIsLoaded(true)}
},[ambulanceData])
const bannerSlider = [];
for (let i = 0; i < ambulanceData?.length; i++) {
  bannerSlider.push(ambulanceData[i].banner)
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
  const photoGallery = [];
  for (let i = 0; i < ambulanceData?.length; i++) {
    photoGallery.push(...(ambulanceData[i].photoGallery))
  }
  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];
  useEffect(() => {
    getAllAmbulance()
  }, [])
  return (
    (!isLoaded) ? <PreLoader /> : <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner overallData={ambulanceData} mainSlider={bannerSlider} activeForm='ambulance' pageOf="ambulance" />
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Listing Section ======--> */}
      <ShowsList overallData={ambulanceData} pageOf="ambulance" />
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
export default Ambulance;
