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
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    let testimonialData = this.props.data
    console.log(testimonialData, 'testimonial data')
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
          {testimonialData?.map((data) => {
            return (
              <div className="single-thumb">
                <h5 className="mb-4"><b>{data.eventId}</b></h5>
                <img
                  src='assets\images\avatar-370-456322.jpg'
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
          {testimonialData?.map((data) => {
            return (
              <div className="testimonial-item">
                <div className="testimonial-content">
                  <p className="text-capitalize">
                    {data.review}
                  </p>
                  <div className="author-info">
                    <div className="author-title">
                      <h4>{data.userName}</h4>
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
