import Link from "next/link";
import React, { useState, useEffect } from "react";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import TestimoinalSlider from "../src/components/Slider/TestimonialSlider";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";
import { callApi } from "../src/apiHandlers/callApi";
import ShowsList from "../src/components/showsList";
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import PreLoader from "../src/components/PreLoader";

const Index = () => {
  const [video, setVideo] = useState(false);
  const [ramlingamData, setRamlingamData] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)
  const [reviews, setReviews] = useState([])
  const [activities,setActivities] = useState();
  const [membership,setMembership] = useState();

  //fetch events

  async function fetchEvents() {
    let tempArr = []
    let apiTest = {
      method: 'post',
      url: "ramalingampark/event/getEvent"
    }
    let response = await callApi(apiTest)
    tempArr.push(...response.data.data)
    if (response.data.code == 201) {
      let apiTest = {
        method: 'post',
        url: "townhall/createTownhall/getTownhallList"
      }
      let response = await callApi(apiTest)
      tempArr.push(...response.data.data)
      if (response.data.code == 201) {
        let apiTest = {
          method: 'post',
          url: "kalyanMandap/createKalyanMandap/getKalyanMandapList"
        }
        let response = await callApi(apiTest)
        tempArr.push(...response.data.data)
        if (response.data.code == 201) {
          let apiTest = {
            method: 'post',
            url: "ambulance/ambulance/getAllAmbulance"
          }
          let response = await callApi(apiTest)
          tempArr.push(...response.data.data)
          if (response.data.code == 201) {
            let apiTest = {
              method: 'post',
              url: "harse/harse/getAllHarse"
            }
            let response = await callApi(apiTest)
            tempArr.push(...response.data.data)
            if (response.data.code == 201) {
              let apiTest = {
                method: 'post',
                url: "sportsArena/sportsArena/getAllSportsArena"
              }
              let response = await callApi(apiTest)
              tempArr.push(...response.data.data)
            }
          }
          setRamlingamData(tempArr)
        }
      }
    }
  }
  async function fetchActivities(){
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllActivity"
    }
    let response = await callApi(apiTest)
    setActivities(response.data.data)
    console.log(response.data.data,'responseeeeeeeeee')
  }
  async function fetchMembership(){
    let apiTest = {
      method: 'post',
      url: "sportsArena/sportsArena/getAllMembership"
    }
    let response = await callApi(apiTest)
    setMembership(response.data.data)
  }
  //fetch reviews
  async function fetchReviews() {
    let apiTest = {
      method: 'get',
      url: "ramalingampark/event/getAllReview"
    }
    let response = await callApi(apiTest)
    console.log(response, 'responseeeeeeeeee')
    if (response.data.code == 201) {
      setReviews(response.data.data)
    }
  }
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
  const photoGallery = [];
  for (let i = 0; i < ramlingamData.length; i++) {
    photoGallery.push(...(ramlingamData[i].photoGallery))
  }
  const videoLink = [
    { link: "https://www.youtube.com/embed/JHlY8w69wSE" }
  ];
  const bannerSlider = [];
  for (let i = 0; i < ramlingamData.length; i++) {
    bannerSlider.push(ramlingamData[i].banner)
  }

  useEffect(() => {
    fetchEvents()
    fetchReviews()
    fetchActivities()
    fetchMembership()
  }, [])
  
  useEffect(() => {
    ramlingamData.length, bannerSlider.length && photoGallery.length && setIsLoaded(true)
  }, [ramlingamData, bannerSlider, photoGallery])


  return (
    (!isLoaded) ? <PreLoader /> : <Layout>
      {video && <VideoPopup close={setVideo} />}
      {/* <!--====== Start Hero Section ======--> */}
      <Banner overallData={ramlingamData} mainSlider={bannerSlider} activities={activities} membership={membership} activeForm='ramlingamPark' pageOf="index" />
      {/* <!--====== End Hero Section ======--> */}
      {/* <!--====== Start Category Section ======--> */}
      <section className="category-area">
        <div className="container">
          <div className="category-wrapper-one">
            <div className="row no-gutters d-flex justify-content-center">
              <div className="category-column" style={{ flex: "1" }}>
                <div className="category-item category-item-one">
                  <div className="info text-center">
                    <div className="icon" style={{ height: '70px' }}>
                      <img src="assets/images/featureicons/black/park.png" alt="" style={{ width: "60px", height: "60px" }} />
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
                    <div className="icon" style={{ height: '74px' }}>
                      <img
                        src="assets/images/featureicons/black/townhall.png"
                        alt=""
                        style={{ width: "60px", height: "60px", marginTop: '4px' }}
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img
                        src="assets/images/featureicons/black/kalyanimandap.png"
                        alt=""
                        style={{ width: "60px", height: "60px" }}
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img
                        src="assets/images/featureicons/black/sportsarena.png"
                        alt=""
                        style={{ width: "60px", height: "60px" }}
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img
                        src="assets/images/featureicons/black/ambulance.png"
                        alt=""
                        style={{ width: "60px", height: "60px" }}
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img src="assets/images/featureicons/black/hearse.png" alt="" style={{ width: "60px", height: "60px" }} />
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img src="assets/images/featureicons/black/tax.png" alt="" style={{ width: "60px", height: "60px" }} />
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
                    <div className="icon" style={{ height: '70px' }}>
                      <img
                        src="assets/images/featureicons/black/grievance.png"
                        alt=""
                        style={{ width: "60px", height: "60px" }}
                      />
                    </div>
                    <h6>Grievance</h6>
                  </div>
                  <Link href="/authroutes/my-complains">
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
      <ShowsList overallData={ramlingamData} pageOf="index" />
      {/* <!--====== Start Intro Video Section ======--> */}
      <Video video={videoLink} quote={getFreeQuote} />
      {/* <!--====== End Intro Video Section ======--> */}
      {/* <!--====== Start Place Section ======--> */}
      <Gallery gallery={photoGallery} />
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
                  <TestimoinalSlider data={reviews} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/* <!--====== Start Newsletter Section ======--> */}
      <Newsletter />
      {/* <!--====== End Newsletter Section ======--> */}
      {/* <!--====== Start Client Section ======--> */}
      <Clients clients={clientSlider} />
    </Layout>
  );
};
export default Index;


