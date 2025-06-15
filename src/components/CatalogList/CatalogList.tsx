import WebApp from '@twa-dev/sdk'; // Импорт SDK для взаимодействия с Telegram WebApp
import axios from 'axios'; // Импорт библиотеки для выполнения HTTP-запросов
import { useEffect, useState } from 'react'; // Импорт хуков React для управления состоянием и побочными эффектами
import CatalogHeader from '../CatalogHeader/CatalogHeader'; // Импорт компонента
import CatalogItem from '../CatalogItem/CatalogItem'; // Импорт компонента отдельного элемента каталога
import LoadingScreen from '../LoadingScreen/LoadingScreen'; // Импорт компонента экрана загрузки
import './CatalogList.css'; // Импорт CSS-стилей для компонента CatalogList
// import UserHeader from '../UserHeader/UserHeader';

// [ФИЛЬТР] Компонент сортировки товаров с выдвижным меню и вариантами сортировки
function SortBar({ value, onChange }: { value: SortType; onChange: (v: SortType) => void }) {
  const [open, setOpen] = useState(false);
  // [ФИЛЬТР] Варианты сортировки
  const options = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price_asc', label: 'По возрастанию цены' },
    { value: 'price_desc', label: 'По убыванию цены' },
    { value: 'new', label: 'По новинкам' },
    { value: 'best', label: 'Сначала выгодные' },
  ];
  const current = options.find(opt => opt.value === value);

  // [UX] Закрытие меню при клике вне фильтра
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.sortbar-dropdown')) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', fontSize: 15, margin: '16px 0 8px 12px' }}>
      <span style={{ userSelect: 'none', color: 'var(--tg-theme-text-color)' }}>Сортировка: </span>
      <span
        style={{ color: 'var(--tg-theme-button-color)', cursor: 'pointer', userSelect: 'none' }}
        // [HAPTIC] Тактильная отдача при открытии фильтра
        onClick={() => {
          setOpen(o => !o);
          if (WebApp?.HapticFeedback) WebApp.HapticFeedback.impactOccurred('light');
        }}
      >
        {current?.label} <span style={{ fontSize: 12 }}>▼</span>
      </span>
      {open && (
        <div
          className="sortbar-dropdown"
          style={{
            position: 'absolute',
            // [UX] Цвета из темы Telegram для гармоничного внешнего вида
            background: 'var(--tg-theme-bg-color)',
            border: '1px solid var(--tg-theme-hint-color)',
            zIndex: 10,
            minWidth: 200,
            marginTop: 2,
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '8px 0',
          }}
        >
          {options.map(opt => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 18px',
                cursor: 'pointer',
                fontWeight: value === opt.value ? 600 : 400,
                color: value === opt.value ? 'var(--tg-theme-button-color)' : 'var(--tg-theme-text-color)',
                background: value === opt.value ? 'var(--tg-theme-secondary-bg-color, #f0f0f0)' : 'transparent',
              }}
              // [HAPTIC] Тактильная отдача при выборе фильтра
              onClick={() => {
                onChange(opt.value as SortType);
                setOpen(false);
                if (WebApp?.HapticFeedback) WebApp.HapticFeedback.impactOccurred('medium');
              }}
            >
              <input
                type="radio"
                checked={value === opt.value}
                readOnly
                // [UX] Цвет радиокнопки из темы Telegram
                style={{ accentColor: 'var(--tg-theme-button-color)', marginRight: 10 }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

type SortType = 'popular' | 'price_asc' | 'price_desc' | 'new' | 'best';

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
    const [sortType, setSortType] = useState<SortType>('popular');
    //const shopId = Number(tg.initDataUnsafe.start_param)
    const tg = WebApp; // Инициализация объекта WebApp из SDK Telegram
    const shopId = 123; 

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

  // Сортировка товаров
  let sortedItems = [...items];
  if (sortType === 'price_asc') {
    sortedItems.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sortType === 'price_desc') {
    sortedItems.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  }

  return (
    <>
      {/* Заголовок + аватар */}
      <div className="CatalogHeader">
        <CatalogHeader title={shopTitle} />
        {/* <UserHeader /> */}
      </div>

      {/* Баннер */}
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

      {/* Сортировка */}
      <SortBar value={sortType} onChange={setSortType} />

      {/* Список товаров */}
      <div className="catalogList">
        {sortedItems.map((item) => (
          <CatalogItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            cover_url={item.cover_url}
            currency={currency}
            shop_id={shopId}
            discountPrice={item.discountPrice || 0}
            discountPercentage={item.discountPercentage || 0}
          />
        ))}
      </div>
    </>
  );
}