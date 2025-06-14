import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { userApi, Order } from '../../services/api';
import './UserOrders.css';

// [ORDERS] Компонент истории заказов пользователя
export default function UserOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const tg = WebApp;
    const user = tg.initDataUnsafe?.user;

    // [ORDERS] Загрузка заказов пользователя
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;
            
            try {
                setLoading(true);
                const userOrders = await userApi.getOrders(user.id.toString());
                setOrders(userOrders);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить заказы');
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user?.id]);

    // [ORDERS] Форматирование даты заказа
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="userOrders">
                <h3 className="ordersTitle">История заказов</h3>
                <div className="loadingOrders">Загрузка заказов...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="userOrders">
                <h3 className="ordersTitle">История заказов</h3>
                <div className="errorOrders">{error}</div>
            </div>
        );
    }

    // [ORDERS] Отображение заказов пользователя
    return (
        <div className="userOrders">
            <h3 className="ordersTitle">История заказов</h3>
            {orders.length > 0 ? (
                <div className="ordersList">
                    {orders.map((order) => (
                        <div key={order.id} className="orderCard">
                            <div className="orderHeader">
                                <span className="orderId">Заказ #{order.id}</span>
                                <span className="orderDate">{formatDate(order.created_at)}</span>
                            </div>
                            <div className="orderItems">
                                {order.items.map((item) => (
                                    <div key={item.id} className="orderItem">
                                        <span className="itemName">{item.name}</span>
                                        <span className="itemQuantity">x{item.quantity}</span>
                                        <span className="itemPrice">{item.price} ₽</span>
                                    </div>
                                ))}
                            </div>
                            <div className="orderFooter">
                                <span className="orderStatus">{order.status}</span>
                                <span className="orderTotal">Итого: {order.total} ₽</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="noOrders">
                    У вас пока нет заказов
                </div>
            )}
        </div>
    );
} 