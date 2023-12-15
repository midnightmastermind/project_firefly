// VideoComponent.js
import React from 'react';

const VideoComponent = ({ videoUrl }) => {
  return <video controls width="100%" height="auto"><source src={videoUrl} type="video/mp4" /></video>;
};

export default VideoComponent;
