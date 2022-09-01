import React, { useState } from "react";
import Slider from "react-slick";
import { PlaceSliderTwo } from "../sliderProps";
import VideoPopup from "./VideoPopup";


function Video(props) {
  const [video, setVideo] = useState(false);
  console.log(props.videoDetails, 'VIDEODETAILS')
  return (
    <>
      {video && <VideoPopup close={setVideo} />}
      <Slider {...PlaceSliderTwo}>
        {
          props.videoDetails.map((x,index) => {
            return (
              <section className="intro-video" style={{position:'relative'}}>
                <div className="col-lg-12">
                  <iframe
                    width="560"
                    height="315"
                    controls='false'
                    src="https://www.youtube.com/embed/JHlY8w69wSE"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    style={{ height: "80vh", width: "100%" }}
                  ></iframe>
                </div>
                <a
                  href="#"
                  className="video-popup"
                  onClick={(e) => {
                    e.preventDefault();
                    setVideo(true);
                  }}
                >
                  <i className="flaticon-play-button"></i>
                </a>
                <div
                  className="col-lg-7"
                  style={{
                    position: "absolute",
                    top: "0%",
                    right: "0%",
                    width: "43%",
                    zIndex:'9999',
                    height:'100%'
                  }}
                >
                  <div key={`ind-${index}`} className="intro-content-box intro-content-box-one">
                    <div className="section-title section-title-left section-title-white mb-35">
                      <h2>{x.heading}</h2>
                    </div>
                    <p>{x.description}</p>
                  </div>
                </div>
              </section>
            )
          })
        }
      </Slider>
    </>


  );
}

export default Video;
