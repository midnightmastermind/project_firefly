// ProgressBar.js
import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const progress = useSelector((state) => state.progress);

  return (
    <div>
      <div style={{ width: `${progress}%`, height: '20px', backgroundColor: 'green' }} />
    </div>
  );
};

export default ProgressBar;