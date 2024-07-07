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
        'Content-Type': 'application/json', //this line solved cors
    },
});

export default function CatalogList() {
    const [itemCount, setItemCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [shopTitle, setShopTitle] = useState("")
    const { shopId } = useParams();
    const tg = WebApp;


    const fetchCatalog = (shop_id: number) => {
        apiClient.get(`/catalog/${shop_id}`)
            .then((response) => {
                setItems(response.data.items);
                setShopTitle(response.data.shop_title)
            })
    }

    useEffect(() => {
        fetchCatalog(Number(shopId))
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('medium')
        })
    }, []);

    const onAdd = (price: number) => {
        setItemCount(itemCount => itemCount + 1)
        setTotalCost(totalCost => totalCost += price)
        tg.HapticFeedback.impactOccurred('light')
        if (itemCount !== 0) {
            tg.MainButton.show();
            tg.HapticFeedback.impactOccurred('medium')
            tg.MainButton.setParams({
                text: `${itemCount} товаров | ${totalCost}RUB`
            })
        }
    }

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
                    onAdd={onAdd}
                />
            ))}
        </div>
        {/* <div className="bottomPagination">
            <h3>1-8 / 146</h3>
        </div> */}
        </>
    )
}