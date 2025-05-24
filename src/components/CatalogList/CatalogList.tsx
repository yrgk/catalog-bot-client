import WebApp from '@twa-dev/sdk'; // Импорт SDK для взаимодействия с Telegram WebApp
import axios from 'axios'; // Импорт библиотеки для выполнения HTTP-запросов
import { useEffect, useState } from 'react'; // Импорт хуков React для управления состоянием и побочными эффектами
import CatalogHeader from '../CatalogHeader/CatalogHeader'; // Импорт компонента
import CatalogItem from '../CatalogItem/CatalogItem'; // Импорт компонента отдельного элемента каталога
import LoadingScreen from '../LoadingScreen/LoadingScreen'; // Импорт компонента экрана загрузки
import './CatalogList.css'; // Импорт CSS-стилей для компонента CatalogList
import UserHeader from '../UserHeader/UserHeader';





const apiClient = axios.create({
    baseURL: "https://catalogio.space/",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

// Основной функциональный компонент
export default function CatalogList() {
    const [items, setItems] = useState<any[]>([]); // Список товаров из каталога
    const [currency, setCurrency] = useState(""); // Валюта магазина
    const [shopTitle, setShopTitle] = useState(""); // Название магазина
    const [banners, setBanners] = useState<any[]>([]);
    const [currentBanner, setCurrentBanner] = useState(0); // Индекс текущего баннера
    const [loading, setLoading] = useState(true); // Состояние загрузки
    //const shopId = Number(tg.initDataUnsafe.start_param)
    const tg = WebApp; // Инициализация объекта WebApp из SDK Telegram
    const shopId = 123; 



    // if (!shopId) {
    //     return (
    //         <>
    //         <h1>There is not items</h1>
    //         </>
    //     )
    // }

    // Функция для получения данных каталога с сервера
    const fetchCatalog = () => {
        setLoading(true); // Начинаем загрузку
        apiClient.get(`api/v1/catalog/${shopId}`)
            .then((response) => {
                setItems(response.data.items); // Установка товаров
                setShopTitle(response.data.shop_title); // Установка названия магазина
                setCurrency(response.data.currency); // Установка валюты
                setBanners(response.data.banners || []);
            })
            .catch((error) => {
              console.error('Ошибка загрузки каталога:', error);
            })
            .finally(() => {
              setLoading(false); // Завершаем загрузку
            });
    }; 

      useEffect(() => {
      fetchCatalog();
    }, []);

      useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const handleDotClick = (index: number) => {
    setCurrentBanner(index);
  };

  if (loading) {
    return <LoadingScreen />;
  }


  return (
    <>
      {/* Заголовок + аватар */}
      <div className="CatalogHeader">
        <CatalogHeader title={shopTitle} />
        <UserHeader />
      </div>

      {/* Баннер без свайпа */}
      {banners.length > 0 && (
        <div className="discount-banner">
          <img
            src={banners[currentBanner]?.cover_url}
            alt={banners[currentBanner]?.description || 'Banner'}
            className="banner-image"
          />
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
      )}

      {/* Список товаров */}
      <div className="catalogList">
        {items.map((item) => (
          <CatalogItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            cover_url={item.cover_url}
            currency={currency}
            shop_id={shopId}
          />
        ))}
      </div>
    </>
  );
}