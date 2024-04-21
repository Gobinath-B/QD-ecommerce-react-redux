import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true, // Shows dots for navigation
    infinite: true, // Enables infinite loop
    speed: 500, // Slide speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.src}
            alt={image.alt}
            height={350}
            width={400}
            className="border-radius-9"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
