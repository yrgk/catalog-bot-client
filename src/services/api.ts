import axios from 'axios';

const API_URL = 'https://catalogio.space/api/v1/order/';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface Order {
    id: string;
    created_at: string;
    state: string;
    total: number;
    items: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
}

export const userApi = {
    getOrders: async (userId: string): Promise<Order[]> => {
        try {
            const response = await api.get(`https://catalogio.space/api/v1/order/list?userId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },
}; 