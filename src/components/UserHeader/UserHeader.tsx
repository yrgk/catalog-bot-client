import React, { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserHeader.css';

// [USERHEADER] Компонент аватара пользователя и перехода в профиль
export default function UserHeader() {
  const user = WebApp.initDataUnsafe.user;
  const navigate = useNavigate();
  const location = useLocation();
  const tg = WebApp;
  const BackButton = tg.BackButton;

  const isProfilePage = location.pathname === '/profile';

  // [USERHEADER] Обработка аппаратной кнопки "Назад" Telegram
  useEffect(() => {
    if (isProfilePage) {
      BackButton.show();
      const backHandler = () => {
        navigate(-1);
        tg.HapticFeedback.impactOccurred('light');
      };
      WebApp.onEvent('backButtonClicked', backHandler);
      return () => {
        WebApp.offEvent('backButtonClicked', backHandler);
      };
    }
  }, [isProfilePage]);

  if (!user?.photo_url) return null;

  // [USERHEADER] Переход в профиль с тактильной отдачей
  const handleClick = () => {
    navigate('/profile');
    tg.HapticFeedback.impactOccurred('light');
  };

  return (
    <div className={`user-header ${isProfilePage ? 'profile-page' : ''}`} onClick={!isProfilePage ? handleClick : undefined}>
      {/* [USERHEADER] Аватар пользователя */}
      <img className="user-avatar" src={user.photo_url} alt="avatar" />
      {isProfilePage && (
        <div className="user-info">
          <span className="username">@{user.username || 'user'}</span>
        </div>
      )}
    </div>
  );
}