import WebApp from '@twa-dev/sdk';
import './OneCatalogItem.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';

export default function OneCatalogItem() {
    const { itemId } = useParams();
    const navigate = useNavigate()

    const tg = WebApp;
    const BackButton = tg.BackButton;

    tg.MainButton.hide()
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate(-1)
        tg.HapticFeedback.impactOccurred('light')
    });

    const [item, setItem] = useState<CatalogItem>();

    const fetchItem = (item_id: number) => {
        axios.get(`https://catalogio.space/api/v1/item/${item_id}`)
            .then((response) => {
                setItem(response.data)
            })
    }

    // const handleAddToCart = () => {
    //     tg.HapticFeedback.impactOccurred('medium');
    //     setInCart(true);
    //     setItemCount(1);
    //     setTotalCost(prevCost => prevCost + price)
    // };

    // const handleIncrement = () => {
    //     tg.HapticFeedback.impactOccurred('medium');
    //     setItemCount(prevCount => prevCount + 1);
    //     setTotalCost(prevCost => prevCost + price)
    //     console.log(totalCost)
    // };

    // const handleDecrement = () => {
    //     tg.HapticFeedback.impactOccurred('medium');
    //     setItemCount(prevCount => Math.max(prevCount - 1, 0));
    //     setTotalCost(prevCost => prevCost - price)
    //     if (itemCount === 1) {
    //         setInCart(false);
    //     }
    // };

    useEffect(() => {
        fetchItem(Number(itemId))
    }, []);

    return (
        <>
            <div className="OneCatalogItem">
                <div className="OneCatalogItemCoverBox">
                    <img className="catalogItemCover" src={ item?.cover_url } alt="Not loaded" loading="lazy" />
                </div>
                <div className="OneCatalogItemTextBox">

                    <div className='priceTitleBlock'>
                        <h1 className="onePrice">{ String(item?.price) }{ item?.currency }</h1>
                        <h2 className='oneTitle'>{ item?.title }</h2>
                    </div>

                    <h4 className='descriptionTitle'>Описание</h4>
                    <div className="descriptionBlock">
                        <h5>{ item?.description }</h5>
                    </div>

                    {/* <footer className='oneFooter'>

                            {inCart ?
                                (
                                    <div className='cartBuild'>

                                    <div onClick={handleDecrement} className="cart" id='left'>
                                        <h4 className='inButtonTitle'>-</h4>
                                    </div>
                                    <div className="cart" id='center'>
                                        <h4 className='inButtonTitle'>{itemCount}</h4>
                                    </div>
                                    <div onClick={handleIncrement} className="cart" id='right'>
                                        <h4 className='inButtonTitle'>+</h4>
                                    </div>

                                    </div>
                                ) : (
                                    <div className="cartButton" onClick={handleAddToCart}>
                                        <h4 className='inButtonTitle'>В корзину</h4>
                                    </div>
                                )
                            }

                    </footer> */}
                </div>
            </div>
        </>
    )
}