import React from 'react'
import { ClientSliderOne } from '../sliderProps';
import Slider from "react-slick";

function Clients(props) {
  return (
    <section className="client-area pt-120">
        <div className="client-wrapper-one pb-120">
          <div className="container">
            <Slider {...ClientSliderOne} className="client-slider-one">
              {props.clients.map((clientImg) => {
                return (
                  <div className="client-item">
                    <div className="client-img">
                      <a href="#">
                        <img src={clientImg.imgUrl} alt="Client Image" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
  )
}

export default Clients