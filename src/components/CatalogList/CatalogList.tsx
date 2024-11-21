import WebApp from '@twa-dev/sdk'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import CatalogHeader from '../CatalogHeader/CatalogHeader'
import CatalogItem from '../CatalogItem/CatalogItem'
import './CatalogList.css'

const apiClient = axios.create({
    baseURL: "http://185.197.75.220:8000/",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

export default function CatalogList() {
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [currency, setCurrency] = useState("")
    const [shopTitle, setShopTitle] = useState("")
    // let { shopId } = useParams();
    const tg = WebApp;
    let shopId = tg.initDataUnsafe.start_param


    // if (!startParam) {
    //     return (
    //         <>
    //         <h1>There is no items</h1>
    //         </>
    //     )
    // }

    // const fetchCatalog = () => {
    //     apiClient.get(`api/v1/catalog/${startParam}`)
    //         .then((response) => {
    //             setItems(response.data.items);
    //             setShopTitle(response.data.shop_title)
    //         })
    // }

    const fetchCatalog = (shop_id: number) => {
        apiClient.get(`api/v1/catalog/${shop_id}`)
            .then((response) => {
                setItems(response.data.items);
                setShopTitle(response.data.shop_title)
                setCurrency(response.data.currency)
            })
    }

    useEffect(() => {
        // fetchCatalog()
        fetchCatalog(Number(shopId))
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
        {/* <h1>{`count: ${itemCount}, cost: ${totalCost}`}</h1> */}
        <div className='catalogList'>
            <h1>{shopId}</h1>
            {items.map((item) => (
                <CatalogItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    cover_url={item.cover_url}
                    currency={currency}
                    shop_id={Number(shopId)}
                    onAdd={onAdd}
                />
            ))}
        </div>
        </>
    )
}