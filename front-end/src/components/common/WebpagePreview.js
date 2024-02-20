import React, { useState } from 'react';
import LoadingBar from './LoadingBar';

const WebPagePreview = ({ url }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="preview-box">
      {loading && <LoadingBar />}
      <iframe
        src={url}
        title="Web Page Preview"
        frameBorder="0"
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
};

export default WebPagePreview;
