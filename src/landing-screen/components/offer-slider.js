import React from 'react';
import Slider from "react-slick";
import { FaAngleDoubleLeft ,FaAngleDoubleRight } from "react-icons/fa";

const OfferSlider = () => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4.1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // centerPadding: '40px',
    prevArrow: (
        <button className="slick-prev slick-arrow">
<FaAngleDoubleLeft />
        </button>
      ),
      nextArrow: (
        <button className="slick-next slick-arrow">
       <FaAngleDoubleRight />
        </button>
      ),
  };

  return (
    <div>
  
      <Slider {...settings}>
        <div>
         <div className="img-wrapper">
         <img src="./images/offer1.png" alt="Slide 1"/>
         </div>
        </div>
        <div>
         <div className="img-wrapper">
         <img src="./images/offer2.png" alt="Slide 1"/>
         </div>
        </div>
        <div>
         <div className="img-wrapper">
         <img src="./images/offer3.png" alt="Slide 1"/>
         </div>
        </div>
        <div>
         <div className="img-wrapper">
            <img src="./images/offer1.png" alt="Slide 1"/>
         </div>
        </div>
        <div>
         <div className="img-wrapper">
         <img src="./images/offer2.png" alt="Slide 1"/>
         </div>
        </div>
        <div>
         <div className="img-wrapper">
         <img src="./images/offer3.png" alt="Slide 1"/>
         </div>
        </div>
      
      </Slider>
    </div>
  );
}

export default OfferSlider;
