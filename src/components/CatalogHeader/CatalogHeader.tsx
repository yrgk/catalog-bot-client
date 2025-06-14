import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import './CatalogHeader.css'
import UserHeader from '../UserHeader/UserHeader';

// [HEADER] Компонент заголовка каталога
export default function CatalogHeader(props: CatalogHeaderProps) {
    const navigate = useNavigate();
    const tg = WebApp;

    // [HEADER] Обработка клика по кнопке корзины
    const handleCartClick = () => {
        navigate('/cart');
        tg.HapticFeedback.impactOccurred('light'); // [HEADER] Тактильная отдача
    };

    return (
        <div className='Header'>
            {/* [HEADER] Название магазина */}
            <h2 className='headerTitle'>{props.title}</h2>
            <div className="headerRight">
                {/* [HEADER] Кнопка корзины */}
                <button 
                    className="cartButton"
                    onClick={handleCartClick}
                > 
                    🛒
                </button>
                {/* [HEADER] Блок пользователя */}
                <UserHeader />
            </div>
        </div>
    )
}