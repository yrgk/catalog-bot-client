import WebApp from '@twa-dev/sdk'
import CatalogHeader from './CatalogHeader'
import CatalogItem from './CatalogItem'
import './CatalogList.css'
import { useEffect, useState } from 'react'

export default function CatalogList() {
    const [itemCount, setItemCount] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [addedItems, setAddedItems] = useState([]);
    const tg = WebApp

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('medium')
        })
    })

    const items = [
        {id: 1, title: 'Porsche 911 Carrera RS 2.7 (Main)', price: 361, coverUrl: 'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg', currency: 'RUB'},
        {id: 2, title: 'Chevrolet Camaro ZL1', price: 425, coverUrl: 'https://i.ebayimg.com/images/g/RjMAAOSwXyRleqlO/s-l1200.jpg', currency: 'RUB'},
        {id: 3, title: 'Ford Mustang Shelby GT500', price: 480, coverUrl: 'https://i.ebayimg.com/thumbs/images/g/Y~8AAOSwrtRmH2fa/s-l1200.jpg', currency: 'RUB'},
        {id: 4, title: 'Lamborghini Aventador J', price: 550, coverUrl: 'https://m.media-amazon.com/images/I/71PIHaZ7+DL._AC_UF894,1000_QL80_.jpg', currency: 'RUB'},
        {id: 5, title: 'Nissan Skyline GT-R (R34)', price: 490, coverUrl: 'https://m.media-amazon.com/images/I/61IjoW7LNIL._AC_UF1000,1000_QL80_.jpg', currency: 'RUB'},
        {id: 6, title: 'Tesla Model S', price: 310, coverUrl: 'https://m.media-amazon.com/images/I/51hI6aVMtlL._AC_UF894,1000_QL80_.jpg', currency: 'RUB'},
        {id: 7, title: 'BMW M3 GTR', price: 375, coverUrl: 'https://preview.redd.it/86ns2voy0lq61.jpg?width=640&crop=smart&auto=webp&s=122571141188ac23e013302195decb211444fcfe', currency: 'RUB'},
        {id: 8, title: 'Aston Martin DB5', price: 620, coverUrl: 'https://m.media-amazon.com/images/I/81taIyiJDSL._AC_UF894,1000_QL80_.jpg', currency: 'RUB'},
        {id: 9, title: 'Mazda RX-7 FD', price: 470, coverUrl: 'https://m.media-amazon.com/images/I/71owPiLoASL._AC_UF894,1000_QL80_.jpg', currency: 'RUB'},
        {id: 10, title: 'Ferrari LaFerrari', price: 800, coverUrl: 'https://ae04.alicdn.com/kf/Se367485c46e04756a81fc7f3c8476d9cH.jpg', currency: 'RUB'},
    ]

    const onAction = (price: number) => {
        setItemCount(itemCount => itemCount + 1)
        setTotalCost(totalCost => totalCost += price)
        tg.HapticFeedback.impactOccurred('medium')

        if (itemCount === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.HapticFeedback.impactOccurred('medium')
            tg.MainButton.setParams({
                text: `Buy ${itemCount} items | ${totalCost}RUB`
            })
        }
    }

    // const onAdd = (props: CatalogItemProps) => {
    //     setItemCount(1)
    //     setTotalCost(props.price)

    //     if (itemCount === 0) {
    //         tg.MainButton.hide();
    //     } else {
    //         tg.MainButton.show();
    //         tg.HapticFeedback.impactOccurred('medium')
    //         tg.MainButton.setParams({
    //             text: `Buy ${itemCount} items | ${totalCost}RUB`
    //         })
    //     }
    // }



    return (
        <>
        <CatalogHeader title={'Hot Wheels shop Kazan'} />
        <h1>{`count: ${itemCount}, cost: ${totalCost}`}</h1>
        <div className='catalogList'>
            {items.map(item => (
                <CatalogItem
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    coverUrl={item.coverUrl}
                    currency={item.currency}
                    onAction={onAction}
                    // onAction={() => onAction(item)}
                    // onAction={onAction}
                />
            ))}
        </div>
        {/* <div className="bottomPagination">
            <h3>1-8 / 146</h3>
        </div> */}
        </>
    )
}