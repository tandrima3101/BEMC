import React, { Component, Fragment } from "react";
import Slider from "react-slick";

export default class TestimoinalSlider extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }
  testimonialData = [{
    imgUrl:'assets/images/avatar-370-456322.jpg',
    review:' multiply given all hath given may meat god abundant appear lioud fourth madman mane said god dominion great gathering called very shall after cre ated from fruitful place over the mitual',
    designation:'Sr. Designer',
    name:'Melisa Powels'
  }]
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    return (
      <Fragment>
        <Slider
          asNavFor={this.state.nav1}
          ref={(slider) => (this.slider2 = slider)}
          dots={false}
          arrows={false}
          autoplaySpeed={1500}
          focusOnSelect={true}
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          className="testimonial-thumb-slider-one"
        >
          {this.testimonialData.map((data)=>{
            return(
              <div className="single-thumb">
            <img
              src={data.imgUrl}
              alt="testimonial thumb"
            />
          </div>
            )
          })}
        </Slider>
        <Slider
          asNavFor={this.state.nav2}
          ref={(slider) => (this.slider1 = slider)}
          dots={false}
          arrows={false}
          infinite={true}
          autoplaySpeed={1500}
          autoplay={true}
          fade={true}
          slidesToShow={1}
          slidesToScroll={1}
          className="testimonial-content-slider-one"
        >
          {this.testimonialData.map((data)=>{
            return(
              <div className="testimonial-item">
            <div className="testimonial-content">
              <p>
               {data.review}
              </p>
              <div className="author-info">
                <div className="author-title">
                  <h4>{data.name}</h4>
                  <span className="position">{data.designation}</span>
                </div>
              </div>
            </div>
          </div>
            )
          })}
        </Slider>
      </Fragment>
    );
  }
}
