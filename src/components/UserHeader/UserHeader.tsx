import WebApp from '@twa-dev/sdk';
import './UserHeader.css';

export default function UserHeader() {
  const user = WebApp.initDataUnsafe.user;

  if (!user?.photo_url) return null;

  return (
    <div className="user-header">
      <img className="user-avatar" src={user.photo_url} alt="avatar" />
    </div>
  );
}