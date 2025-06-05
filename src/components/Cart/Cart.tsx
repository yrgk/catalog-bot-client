import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import WebApp from '@twa-dev/sdk';
import './Cart.css';

export default function Cart() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const tg = WebApp;
        tg.BackButton.show();
        
        tg.BackButton.onClick(() => {
            navigate(-1);
        });

        return () => {
            tg.BackButton.hide();
        };
    }, [navigate]);

    if (items.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-header">Корзина</div>
                <div className="empty-cart-wrapper">
                    <div className="empty-cart">
                        Ваша корзина пуста
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">Корзина</div>
            <div className="cart-items">
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <div className="cart-item-image">
                            <img src={item.cover_url} alt={item.title} />
                        </div>
                        <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p>{item.price} {item.currency}</p>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                    </div>
                ))}
                <div className="cart-total">
                    <h3>Итого: {totalPrice} ₽</h3>
                    <button className="checkout-button">Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}