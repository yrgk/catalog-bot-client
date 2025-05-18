import WebApp from '@twa-dev/sdk';
import './OneCatalogItem.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

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
    const [inCart, setInCart] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        tg.MainButton.hide();
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

    useEffect(() => {
        if (itemId) {
            fetchItem(Number(itemId));
        }
    }, [itemId]);

    const fetchItem = (item_id: number) => {
        axios.get<CatalogItem>(`https://catalogio.space/api/v1/item/${item_id}`)
            .then((response) => {
                setItem(response.data);
            });
    };

    const handleAddToCart = () => {
        if (!item) return;
        tg.HapticFeedback.impactOccurred('medium');
        setInCart(true);
        setItemCount(1);
        setTotalCost(item.price);
    };

    const handleIncrement = () => {
        if (!item) return;
        tg.HapticFeedback.impactOccurred('medium');
        setItemCount(prev => prev + 1);
        setTotalCost(prev => prev + item.price);
    };

    const handleDecrement = () => {
        if (!item) return;
        tg.HapticFeedback.impactOccurred('medium');
        if (itemCount === 1) {
            setInCart(false);
            setItemCount(0);
            setTotalCost(0);
        } else {
            setItemCount(prev => prev - 1);
            setTotalCost(prev => prev - item.price);
        }
    };

    return (
        <div className="OneCatalogItem">
            <div className="OneCatalogItemCoverBox">
                <img className="catalogItemCover" src={item?.cover_url} alt="Not loaded" loading="lazy" />
            </div>
            <div className="OneCatalogItemTextBox">
                <div className="priceTitleBlock">
                    <h1 className="onePrice">{item?.price}{item?.currency}</h1>
                    <h2 className="oneTitle">{item?.title}</h2>
                </div>

                <h4 className="descriptionTitle">Описание</h4>
                <div className="descriptionBlock">
                    <h5>{item?.description}</h5>
                </div>

                <footer className="oneFooter">
                    {inCart ? (
                        <div className="cartBuild">
                            <div onClick={handleDecrement} className="cart" id="left">
                                <h4 className="inButtonTitle">-</h4>
                            </div>
                            <div className="cart" id="center">
                                <h4 className="inButtonTitle">{itemCount}</h4>
                            </div>
                            <div onClick={handleIncrement} className="cart" id="right">
                                <h4 className="inButtonTitle">+</h4>
                            </div>
                        </div>
                    ) : (
                        <div className="cartButton green" onClick={handleAddToCart}>
                            <h4 className="inButtonTitle">В корзину</h4>
                        </div>
                    )}
                </footer>
            </div>
        </div>
    );
}