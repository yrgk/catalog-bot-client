import WebApp from '@twa-dev/sdk'
import CatalogHeader from './CatalogHeader'
import CatalogItem from './CatalogItem'
import './CatalogList.css'
// import { useState } from 'react'

export default function CatalogList() {
    // const [itemCount, setItemCount] = useState(0)
    // const [totalCost, setTotalCost] = useState(0)
    const tg = WebApp

    tg.onEvent('mainButtonClicked', function() {
        tg.HapticFeedback.selectionChanged()
    })

    // if (itemCount === 0) {
    //     tg.MainButton.hide();
    // } else {
    //     tg.MainButton.show();
    //     tg.MainButton.setParams({
    //         // text: `Buy ${itemCount} items | ${totalCost}RUB`
    //     })
    // }

    return (
        <>
        <CatalogHeader title={'Hot Wheels shop Kazan'} />
        <div className='catalogList'>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://www.eberhart.ru/upload/resize_cache/webp/iblock/c2a/584_367_140cd750bba9870f18aada2478b24840a/bern.webp'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
            <CatalogItem id={'1'} title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'}/>
        </div>
        {/* <div className="bottomPagination">
            <h3>1-8 / 146</h3>
        </div> */}
        </>
    )
}