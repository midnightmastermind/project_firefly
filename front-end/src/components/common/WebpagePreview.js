import React, { useState } from 'react';

const WebPagePreview = ({ url }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="preview-box">
      {loading && <p>Loading...</p>}
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
