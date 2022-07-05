import React from "react";
import Slider from "react-slick";

import { PlaceSliderTwo } from "../../sliderProps";
import BookingForm from "../bookingForm";

function Banner(props) {
return (
    <section className="hero-area">
      <div className="hero-wrapper-one mobile-view-banner" >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7" style={{ padding: "0px" }}>
              <div className="hero-content d-none d-lg-block d-xl-block">
                {(props.blur)?
                <Slider {...PlaceSliderTwo} className="banner-slider-one">
                  {props.mainSlider.map((x) => {
                    return (
                      <div className="banner-items hearse-banner-items">
                        <img
                          src={x?.bannerImageUrl}
                          alt=""
                          className="banner-background-image"
                        />
                        <div className="banner-text">
                          <div className="banner-text-inner">
                            <h1 className="">{x?.heading}</h1>
                            <h3 className="">{x?.subHeading}</h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>:
                <Slider {...PlaceSliderTwo} className="banner-slider-one">
                {props.mainSlider.map((x) => {
                  return (
                    <div className="banner-items">
                      <img
                        src={x?.bannerImageUrl}
                        alt=""
                        className="banner-background-image"
                      />
                      <div className="banner-text">
                        <div className="banner-text-inner">
                          <h1 className="">{x?.heading}</h1>
                          <h3 className="">{x?.subHeading}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
                }   
              </div>
            </div>
            <div className="col-lg-5" style={{ padding: "0px" }}>
              <BookingForm active={props.activeForm} pageOf={props.pageOf} data={props.overallData}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
