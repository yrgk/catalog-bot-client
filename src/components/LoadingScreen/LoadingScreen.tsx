import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-wrapper">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;