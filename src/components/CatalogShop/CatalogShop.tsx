import CatalogList from '../CatalogList/CatalogList';
import './CatalogShop.css';

// [SHOP] Главная страница магазина, обертка для каталога
export default function CatalogShop() {
  return (
    <div className="catalog-shop">
      {/* [SHOP] Список товаров каталога */}
      <CatalogList />
    </div>
  );
}