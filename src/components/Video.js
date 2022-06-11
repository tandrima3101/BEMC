import React, {useState} from "react";
import VideoPopup from "./VideoPopup";


function Video(props) {
  const [video, setVideo] = useState(false);
  return (
    <>
      {video && <VideoPopup close={setVideo} />}
      <section className="intro-video" style={{ position: "relative" }}>
      <div className="col-lg-12">
        <iframe
          width="560"
          height="315"
          controls='false'
          src={props.video[0].link}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
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
          top: "15%",
          right: "10%",
          width: "43%",
        }}
      >
        {props.quote.map((items) => {
          return (
            <div className="intro-content-box intro-content-box-one">
              <div className="section-title section-title-left section-title-white mb-35">
                <span className="sub-title">{items.smallText}</span>
                <h2>{items.mainText}</h2>
              </div>
              <p>{items.paragraph}</p>
            </div>
          );
        })}
      </div>
    </section>
    </>

    
  );
}

export default Video;
