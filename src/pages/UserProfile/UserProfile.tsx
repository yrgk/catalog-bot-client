import WebApp from '@twa-dev/sdk';
import UserHeader from '../../components/UserHeader/UserHeader';
import './UserProfile.css';

export default function UserProfile() {
    const tg = WebApp;
    const user = tg.initDataUnsafe?.user;

    return (
        <div className="userProfile">
            <div className="userProfileContent">
                <UserHeader />
                <div className="userInfo">
                    <div className="infoItem">
                        <span className="label">Имя:</span>
                        <span className="value">{user?.first_name || 'Не указано'}</span>
                    </div>
                    <div className="infoItem">
                        <span className="label">Фамилия:</span>
                        <span className="value">{user?.last_name || 'Не указано'}</span>
                    </div>
                    <div className="infoItem">
                        <span className="label">Telegram ID:</span>
                        <span className="value">{user?.id || 'Не указано'}</span>
                    </div>
                    <div className="infoItem">
                        <span className="label">Телефон:</span>
                        <span className="value">{user?.phone_number || 'Не указано'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 