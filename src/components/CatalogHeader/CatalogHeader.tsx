import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import './CatalogHeader.css'
import UserHeader from '../UserHeader/UserHeader';

export default function CatalogHeader(props: CatalogHeaderProps) {
    const navigate = useNavigate();
    const tg = WebApp;

    const handleCartClick = () => {
        navigate('/cart');
        tg.HapticFeedback.impactOccurred('light');
    };

    return (
        <div className='Header'>
            <h2 className='headerTitle'>{props.title}</h2>
            <div className="headerRight">
                <button 
                    className="cartButton"
                    onClick={handleCartClick}
                >
                    🛒
                </button>
                <UserHeader />
            </div>
        </div>
    )
}