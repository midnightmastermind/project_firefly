import React, { useState, useEffect } from 'react';
import pageres from 'pageres';

const WebpagePreview = ({ url }) => {
  const [screenshotUrl, setScreenshotUrl] = useState(null);

  useEffect(() => {
    const capturePreview = async () => {
      try {
        const result = await pageres({ urls: [`http://localhost:8081${url}`], filename: 'screenshot', format: 'png', delay: 2 }).run();
        const base64Image = `data:image/png;base64,${result[0].data.toString('base64')}`;
        setScreenshotUrl(base64Image);
      } catch (error) {
        console.error('Error capturing preview:', error);
      }
    };

    capturePreview();
  }, [url]);

  return (
    <div>
      {screenshotUrl ? (
        <img src={screenshotUrl} alt="Webpage Preview" />
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default WebpagePreview;
