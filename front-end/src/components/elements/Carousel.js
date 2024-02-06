import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carousel = ({ items }) => {
  return (
    <ResponsiveCarousel>
      {items.map((item, index) => (
        <div key={index}>
          {item.type === 'image' && <img src={item.src} alt={`Slide ${index}`} />}
          {item.type === 'video' && (
            <video controls>
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
