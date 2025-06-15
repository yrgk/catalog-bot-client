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
                console.log('user.id', user?.id);
                console.log('Загружаю заказы...');
                const userOrders = await userApi.getOrders(user.id.toString());
                console.log('Получены заказы:', userOrders);
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
    {orders
      .slice(-1) // берем последниий заказ
      .map((order: any) => (
        <div key={order.OrderId} className="orderCard">
          <div className="orderHeader">
            <span className="orderId">Заказ #{order.OrderId}</span>
            <span className="orderDate">Дата: 16.06.2025</span>
          </div>
          <div className="orderItems">
            {order.Units.map((item: any) => (
              <div key={item.ID} className="orderItem">
                <span className="itemName">{item.Title}</span>
                <span className="itemQuantity">x1</span>
                <span className="itemPrice">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="orderFooter">
            <span className="orderStatus">{order.state}</span>
            <span className="orderTotal">Итого: {order.Units.reduce((sum: number, item: { price: number }) => sum + item.price, 0)} ₽</span>
          </div>
        </div>
      ))}
  </div>
) : (
  <div className="noOrders">У вас пока нет заказов</div>
)}
        </div>
    );
} 