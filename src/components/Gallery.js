import React from "react";
import { PlaceSliderOne } from "../sliderProps";
import Slider from "react-slick";

function Gallery(props) {
  return (
    <section className="place-area pt-115 pb-110">
      <div className="container-fluid place-container container-small">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-60">
              <h2>Photo Gallery</h2>
            </div>
          </div>
        </div>
        <Slider {...PlaceSliderOne} className="place-slider-one">
          {props.gallery.map((photo) => {
            return (
              <div className="place-item place-item-one" key={photo.imgId}>
                <div className="place-thumbnail">
                  <img src={photo.imgUrl} alt="Place Image" style={{height: '250px',objectFit: 'cover'}} />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}

export default Gallery;
