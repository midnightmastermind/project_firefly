// ImageComponent.js
import React from 'react';

const ImageComponent = ({ imageUrl, alt }) => {
  return <img src={imageUrl} alt={alt} style={{ width: '100%', height: 'auto' }} />;
};

export default ImageComponent;
