import React, { useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import WebApp from '@twa-dev/sdk';
import './Cart.css';

// [CART] Основной компонент корзины
export default function Cart() {
    // [CART] Получаем данные и методы корзины из контекста
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const tg = WebApp;
    const BackButton = tg.BackButton;

    // [CART] Обработка аппаратной кнопки "Назад" Telegram
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

    // [CART] Оформление заказа
    const handleCheckout = async () => {
        const tg = WebApp;
        const userId = tg.initDataUnsafe?.user?.id;

        if (!userId) {
            alert("Не удалось получить ID пользователя Telegram.");
            return;
        }

        try {
            const response = await fetch('https://catalogio.space/api/v1/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                    data_list: items.map(item => ({
                        title: item.title,
                        price: item.price
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при оформлении заказа');
            }

            const data = await response.json();
            console.log('Заказ успешно оформлен:', data);
            alert('Заказ успешно оформлен!');
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            alert('Заказ успешно оформлен!');
        } finally {
            clearCart(); // [CART] Очищаем корзину после оформления заказа
        }
    };

    // [CART] Если корзина пуста
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

    // [CART] Отображение товаров в корзине
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
                    <button className="checkout-button" onClick={handleCheckout}>
                        Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    );
}
