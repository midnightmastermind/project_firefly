import React, { useState } from 'react';
import { Overlay2, Card, Elevation } from '@blueprintjs/core';
import Carousel from 'components/elements/Carousel'; // Assuming the Carousel component is in a separate file

const FilePreviewModal = ({ isOpen, onClose, selectedFile, files, setSelectedFile }) => {
  const handleCarouselChange = (index) => {
    setSelectedFile(index);
  };

  return (
    <Overlay2 isOpen={isOpen} onClose={onClose}>
      <Card elevation={Elevation.TWO} className="file-manager-modal">
        <div className="file-manager-file-preview-section">
          <div className="file-manager-header-container"><h3>{selectedFile.name}</h3></div>
          <div className="file-content">
            {/* Use Carousel and pass onCarouselChange callback */}
            <Carousel
              items={files}
              settings={{ showStatus: false, showIndicators: false, showThumbs: false }}
              onCarouselChange={handleCarouselChange}
              file={selectedFile}
            />
          </div>
        </div>
        <div className="file-manager-file-info-section">
          {
            Object.keys(selectedFile).map(key => <div className="file-manager-file-info" key={key}><div style={{fontWeight: 'bold', marginRight: '10px', width: '100px'}}>{`${key}:`}</div><div style={{color: 'gray'}}>{selectedFile[key]}</div></div>)
          }
        </div>
      </Card>
    </Overlay2>
  );
};

export default FilePreviewModal;
