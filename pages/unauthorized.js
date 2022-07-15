import Link from "next/link";
import React, { useState,useEffect } from "react";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import VideoPopup from "../src/components/VideoPopup";
import Layout from "../src/layouts/Layout";
import { Nav, Tab } from "react-bootstrap";
import TestimoinalSlider from "../src/components/Slider/TestimonialSlider";
import BookingForm from "../src/components/bookingForm";
import Banner from "../src/components/Slider/banner";
import Video from "../src/components/video";
import { callApi } from "../src/apiHandlers/callApi";

import {
  ClientSliderOne,
  ListingSliderOne,
  PlaceSliderOne,
  PlaceSliderTwo,
} from "../src/sliderProps";
import ShowsList from "../src/components/showsList";
import Gallery from "../src/components/Gallery";
import Newsletter from "../src/components/newsletter";
import Clients from "../src/components/clients";
import { useDispatch } from "react-redux";
import { setlogin, setToken } from "../redux/slices/loginSlice";
import Router from "next/router";

const Unauthorized = () => {
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(setToken(null))
    dispatch(setlogin(false))
    setTimeout(()=>{
      Router.push("/")
    },1500)
  },[])
  return (
    <Layout>
        <div style={{height:'100vh'}} className='d-flex align-items-center justify-content-center flex-column'>
            <img src="assets/images/error-404.png" width='200px'/>
            <h5 className="mt-3">Page Not Found</h5>
            <p>You are unauthorized to access this page, You will be autometically redirected to homepage in some time.</p>
            <a className="main-btn mt-4" href="/">Go Back</a>
        </div>
    </Layout>
  );
};
export default Unauthorized;


