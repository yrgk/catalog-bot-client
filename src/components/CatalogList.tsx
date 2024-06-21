import CatalogHeader from './CatalogHeader'
import CatalogItem from './CatalogItem'
import './CatalogList.css'

export default function CatalogList() {
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
        </>
    )
}