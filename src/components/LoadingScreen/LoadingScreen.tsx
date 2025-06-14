import React from 'react';
import './LoadingScreen.css';

// [LOADING] Компонент экрана загрузки
const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-wrapper">
      {/* [LOADING] Анимированный спиннер */}
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;