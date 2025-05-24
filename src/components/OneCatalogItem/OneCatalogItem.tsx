import WebApp from '@twa-dev/sdk';
import './OneCatalogItem.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

type CatalogItem = {
    id: number;
    title: string;
    description: string;
    price: number;
    currency: string;
    cover_url: string;
};

export default function OneCatalogItem() {
    const { itemId } = useParams<{ itemId: string }>();
    const navigate = useNavigate();

    const tg = WebApp;
    const BackButton = tg.BackButton;

    const [item, setItem] = useState<CatalogItem>();
    const [loading, setLoading] = useState(true);
    
  // Навигация назад
  useEffect(() => {
    BackButton.show();
    const backHandler = () => {
        navigate(-1);
      tg.HapticFeedback.impactOccurred('light');
    };
    WebApp.onEvent('backButtonClicked', backHandler);
    return () => {
      WebApp.offEvent('backButtonClicked', backHandler);
    };
  }, []);

  // Получение товара
  useEffect(() => {
    if (itemId) {
        fetchItem(Number(itemId));
    }
  }, [itemId]);

  const fetchItem = (item_id: number) => {
    setLoading(true);
    axios.get<CatalogItem>(`https://catalogio.space/api/v1/item/${item_id}`)
      .then((response) => {
        setItem(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // MainButton: Купить
  useEffect(() => {
    if (!item) return;

    tg.MainButton.setParams({
      text: `Купить за ${item.price} ${item.currency}`,
    });
    tg.MainButton.show();

    const onClick = () => {
      const payload = {
        action: 'buy_one',
        item: {
          id: item.id,
          title: item.title,
          price: item.price,
          currency: item.currency,
          quantity: 1,
        },
      };
      tg.sendData(JSON.stringify(payload));
      tg.HapticFeedback.notificationOccurred('success');
    };

    tg.onEvent('mainButtonClicked', onClick);

    return () => {
      tg.MainButton.hide();
      tg.offEvent('mainButtonClicked', onClick);
    };
  }, [item]);

   if (loading) return <LoadingScreen />;

  return (
    <div className="OneCatalogItem">
      <div className="OneCatalogItemCoverBox">
        <img
          className="catalogItemCover"
          src={item?.cover_url}
          alt="Not loaded"
          loading="lazy"
        />
      </div>

      <div className="OneCatalogItemTextBox">
        <div className="priceTitleBlock">
          <h1 className="onePrice">
            {item?.price} {item?.currency}
          </h1>
          <h2 className="oneTitle">{item?.title}</h2>
        </div>

        <h4 className="descriptionTitle">Описание</h4>
        <div className="descriptionBlock">
          <h5>{item?.description}</h5>
        </div>
      </div>
    </div>
  );
}
