import WebApp from '@twa-dev/sdk'
import CatalogHeader from './CatalogHeader'
import CatalogItem from './CatalogItem'
import './CatalogList.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const apiClient = axios.create({
    baseURL: "https://catalog-bot-api.onrender.com/",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export default function CatalogList() {
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [shopTitle, setShopTitle] = useState("")
    const { shopId } = useParams();
    const tg = WebApp;
    let startParam = Number(tg.initDataUnsafe.start_param)


    if (!startParam) {
        return (
            <>
            <h1>There is no items</h1>
            </>
        )
    }

    // const fetchCatalog = (shop_id: number) => {
    const fetchCatalog = () => {
        apiClient.get(`/catalog/${startParam}`)
            .then((response) => {
                setItems(response.data.items);
                setShopTitle(response.data.shop_title)
            })
    }

    useEffect(() => {
        fetchCatalog()
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('heavy')
        })
    }, []);

    const onAdd = (price: number) => {
        setItemCount(prevItemCount => {
            const newCount = prevItemCount + 1;
            return newCount;
        });
        setTotalCost(prevTotalCost => prevTotalCost + price);

        // Показать главную кнопку после первого добавления товара
        tg.MainButton.show();
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.setParams({
            text: `${itemCount + 1} товаров | ${totalCost + price}RUB`
        });
    };

    return (
        <>
        <CatalogHeader title={shopTitle}/>
        {/* <h1>{`shop: ${shopId}`}</h1> */}
        {/* <h1>{`count: ${itemCount}, cost: ${totalCost}`}</h1> */}
        <div className='catalogList'>
            {items.map((item) => (
                <CatalogItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    cover_url={item.cover_url}
                    currency={item.currency}
                    shop_id={Number(shopId)}
                    onAdd={onAdd}
                />
            ))}
        </div>
        </>
    )
}