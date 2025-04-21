import React, { useState } from "react";
import { Drawer } from "antd";
import Slider from "react-slick";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import GoogleLoginButton from "./GoogleLoginBtn";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button className={className} style={style} onClick={onClick}>
      <FaAngleDoubleLeft />
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button className={className} style={style} onClick={onClick}>
      <FaAngleDoubleRight />
    </button>
  );
};

const BannerSlider = ( ) => {
  const [open, setOpen] = useState(false);
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleBrandClick = () => {
    setOpen(true);
  };

   

  return (
    <div>
      <Slider {...settings}>
        <div>
          <div className="img-wrapper" onClick={handleBrandClick}>
            <img src="./images/banner-survey1.jpeg" alt="" />
          </div>
        </div>
        <div>
          <div className="img-wrapper" onClick={handleBrandClick}>
            <img src="./images/banner-survey2.jpeg" alt="" />
          </div>
        </div>
        <div>
          <div className="img-wrapper" onClick={handleBrandClick}>
            <img src="./images/banner-survey3.jpeg" alt="" />
          </div>
        </div>
      </Slider>
      <Drawer className="brand-auth" onClose={onClose} open={open}>
        <GoogleLoginButton />
      </Drawer>
    </div>
  );
};

export default BannerSlider;
