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
                        <span className="label">Telegram ID:</span>
                        <span className="value">{user?.id || 'Not available'}</span>
                    </div>
                    <div className="infoItem">
                        <span className="label">Phone:</span>
                        <span className="value">{user?.phone_number || 'Not available'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 