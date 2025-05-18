
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CatalogHeader from '../CatalogHeader/CatalogHeader';
import CatalogItem from '../CatalogItem/CatalogItem';
// import LoadingScreen from '../LoadingScreen'; // Импорт компонента экрана загрузки
import './CatalogList.css';


const apiClient = axios.create({
    baseURL: "https://catalogio.space/",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

// Баннеры с изображениями
const banners = [
  {
    imageUrl: 'https://i.ytimg.com/vi/khjuByhWRmk/maxresdefault.jpg', 
  },
  {
    imageUrl: 'https://i.ytimg.com/vi/gozL5s0qbyM/maxresdefault.jpg',   
  },
  {
    imageUrl: 'https://malish-am.ru/wa-data/public/photos/30/01/130/130.970.jpg', 
  },
  {
    imageUrl: 'https://zazaschool.com/wp-content/uploads/2018/11/4916-bf-1525x612-updatingfor2017-data-min.png',
  },
];

export default function CatalogList() {
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [items, setItems] = useState<any[]>([]);
    const [currency, setCurrency] = useState("");
    const [shopTitle, setShopTitle] = useState("");
    const [currentBanner, setCurrentBanner] = useState(0);
    // const [loading, setLoading] = useState(true); // Состояние загрузки
    //const shopId = Number(tg.initDataUnsafe.start_param)
    const tg = WebApp;
    const shopId = 123;



    // if (!shopId) {
    //     return (
    //         <>
    //         <h1>There is not items</h1>
    //         </>
    //     )
    // }

    const fetchCatalog = () => {
        // setLoading(true); // Начинаем загрузку
        apiClient.get(`api/v1/catalog/${shopId}`)
            .then((response) => {
                setItems(response.data.items);
                setShopTitle(response.data.shop_title);
                setCurrency(response.data.currency);
            })
            // .catch((error) => {
            //     console.error('Ошибка загрузки каталога:', error);
            // })
            // .finally(() => {
            //     setLoading(false); // Завершаем загрузку
            // });
    }

    useEffect(() => {
        fetchCatalog();
        tg.onEvent('mainButtonClicked', function () {
            tg.HapticFeedback.impactOccurred('heavy');
        });
        
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000); // Переход каждые 5 секунд
        
        return () => clearInterval(interval);
    }, []);

    const onAdd = (price: number) => {
        setItemCount((prevItemCount) => prevItemCount + 1);
        setTotalCost((prevTotalCost) => prevTotalCost + price);

        // Показать главную кнопку после первого добавления товара
        tg.MainButton.show();
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.setParams({
            text: `${itemCount + 1} товаров | ${totalCost + price} ${currency}`,
        });
    };

    // Функция для переключения баннера по клику на точку
    const handleDotClick = (index: number) => {
        setCurrentBanner(index);
    };

    // if (loading) {
    //     return <LoadingScreen />; // Показать экран загрузки, пока данные не загружены
    // }

    return (
        <>
            <CatalogHeader title={shopTitle} />
            
            {/* Баннер с картинками и анимацией */}
            <div className="discount-banner">
                <img src={banners[currentBanner].imageUrl} alt={`Banner ${currentBanner}`} className="banner-image" />
                <div className="dots-container">
                    {banners.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentBanner ? 'active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            </div>

            <div className='catalogList'>
                {items.map((item) => {
                    // const discountPercentage = calculateDiscountPercentage(item.price, item.discount_price);
                    return (
                        <CatalogItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            // discountPrice={item.discount_price} // Добавляем скидочную цену
                            cover_url={item.cover_url}
                            currency={currency}
                            shop_id={shopId}
                            onAdd={onAdd}
                            // discountPercentage={discountPercentage} // Процент скидки
                        />
                    );
                })}
            </div>
        </>
    );
}