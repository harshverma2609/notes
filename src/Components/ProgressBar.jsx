import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value }) => {
  return (
    <div className="progress">
      <progress value={value} max="100"></progress>
    </div>
  );
};

export default ProgressBar;
