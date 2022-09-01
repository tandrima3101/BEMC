import React, { useState } from "react";
import { PlaceSliderOne, PlaceSliderTwo } from "../sliderProps";
import Slider from "react-slick";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function Gallery(props) {
  const [openModal, setOpenModal] = useState(false)
  const [openImg,setOpenImg] = useState('')
  const handleImagePopup = (img) => {
    setOpenModal(true)
    setOpenImg(img)
  }
  console.log(props.gallery,'galleryyyyyyyyyyyyyy')
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
          {props.gallery.map((photo,index) => {
            return (
                <div className="place-item place-item-one" key={index}>
                  <div className="place-thumbnail">
                    <img src={photo} alt="Place Image" style={{ height: '300px', objectFit: 'cover' }} onClick={() => { handleImagePopup(photo) }} />
                  </div>
                </div>
            );
          })}
          {/* {
            props.gallery.map((e) => {
              return(
                <div>
                  <p>POD</p>
                  {console.log(e,"POD MARANI")}
                </div>
              )
            })
          } */}
        </Slider>


        {/* /***************image popup modal************** */}
        <Modal isOpen={openModal}
          toggle={() => setOpenModal(false)}
          className='imagePopupModal'>
          <ModalBody>
            <img src={openImg} width='100%'/>
          </ModalBody>
        </Modal>
      </div>
    </section>
  );
}

export default Gallery;
