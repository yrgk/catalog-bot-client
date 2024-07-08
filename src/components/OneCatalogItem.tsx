import WebApp from '@twa-dev/sdk';
import './OneCatalogItem.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// const CartButton = ({ initialCount = 0 }) => {
//     const [count, setCount] = useState<number>(initialCount);
//     const [inCart, setInCart] = useState<boolean>(false);

//     const handleAddToCart = () => {
//         setInCart(true);
//         setCount(1);
//     };

//     const handleIncrement = () => {
//         setCount(prevCount => prevCount + 1);
//     };

//     const handleDecrement = () => {
//         setCount(prevCount => Math.max(prevCount - 1, 0));
//         if (count === 1) {
//             setInCart(false);
//         }
//     };

//     return (
//         <div>
//             {inCart ? (
//             <div>
//                 <h2 onClick={handleDecrement}>-</h2>
//                 <span>{count}</span>
//                 <h2 onClick={handleIncrement}>+</h2>
//             </div>
//             ) : (
//             <div onClick={handleAddToCart}>В корзину</div>
//             )}
//         </div>
//     );
// };


export default function OneCatalogItem() {
    const navigate = useNavigate()
    const location = useLocation();
    const tg = WebApp;
    const { title, price, cover_url, currency, description, shop_id } = location.state as CatalogItemProps;

    const BackButton = WebApp.BackButton;
    BackButton.show();
    BackButton.onClick(function() {
        BackButton.hide();
    });
    WebApp.onEvent('backButtonClicked', function() {
        navigate(`/catalog/${shop_id}`)
        tg.HapticFeedback.impactOccurred('light')
    });

    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [inCart, setInCart] = useState<boolean>(false);


    const handleAddToCart = () => {
        setInCart(true);
        setItemCount(1);
        setTotalCost(prevCost => prevCost + price)
    };

    const handleIncrement = () => {
        setItemCount(prevCount => prevCount + 1);
        setTotalCost(prevCost => prevCost + price)
        console.log(totalCost)
    };

    const handleDecrement = () => {
        setItemCount(prevCount => Math.max(prevCount - 1, 0));
        setTotalCost(prevCost => prevCost - price)
        if (itemCount === 1) {
            setInCart(false);
        }
    };

    return (
        <>
            {/* <h1>Item {itemCount} {totalCost}</h1> */}
            <div className="OneCatalogItem">
                <div className="OneCatalogItemCoverBox">
                    <img className="catalogItemCover" src={ cover_url } alt="Not loaded" loading="lazy" />
                </div>
                <div className="OneCatalogItemTextBox">

                    <div className='priceTitleBlock'>
                        <h1 id="onePrice">{ String(price) }{ currency }</h1>
                        <h2 className='oneTitle'>{ title }</h2>
                    </div>

                    <h4 className='descriptionTitle'>Описание</h4>
                    <div className="descriptionBlock">
                        <h4>{ description }</h4>
                    </div>

                    <footer className='oneFooter'>

                        {/* <div className="cart" onClick={handleAddToCart}> */}

                            {inCart ?
                                (
                                    <div className='cartBuild'>

                                    <div className="cart" id='left'>
                                        <h2 className='inButtonTitle' onClick={handleDecrement}>-</h2>
                                    </div>
                                    <div className="cart" id='center'>
                                        <h2 className='inButtonTitle'>{itemCount}</h2>
                                    </div>
                                    <div className="cart" id='right'>
                                        <h2 className='inButtonTitle' onClick={handleIncrement}>+</h2>
                                    </div>

                                    </div>
                                ) : (
                                    <div className="cart" onClick={handleAddToCart}>
                                        <h2 className='inButtonTitle'>В корзину</h2>
                                    </div>
                                )
                            }

                    </footer>
                </div>
            </div>
        </>
    )
}