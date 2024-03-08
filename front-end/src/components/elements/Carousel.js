import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carousel = ({ items, settings, onCarouselChange }) => {
  console.log(items);
  const handleCarouselChange = (index) => {
    console.log(index);
    if (onCarouselChange) {
      onCarouselChange(index);
    }
  };

  return (
    <ResponsiveCarousel
      {...settings}
      infiniteLoop={true}
      onChange={handleCarouselChange} // Use the onChange prop to set up the callback
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.type.includes('image') && <img src={item.src || item.source} alt={`Slide ${index}`} />}
          {item.type.includes('video') && (
            <video controls>
              <source src={item.src || item.source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
