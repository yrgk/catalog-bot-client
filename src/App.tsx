// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './components/CatalogItem'
// import CatalogItem from './components/CatalogItem'
import CatalogList from './components/CatalogList'
import OneCatalogItem from './components/OneCatalogItem'
// import CatalogItem from './components/CatalogItem'

const desc = "Машинка Hot Wheels коллекционная в ассортименте C4982 Масштабные литые модели автомобилей под брендом Hot Wheels выпускаются с 1968 года. За эти годы Hot Wheels превратился в глобальный всемирно известный бренд. Сегодня Hot Wheels выпускает ежегодно более 400 моделей, создавая самые крутые и необычные машинки. Линейка литых автомобилей Hot Wheels разделена на множество мини-коллекций. Каждая мини-коллекция включает в себя тематические транспортные средства, начиная от маслкаров, спортивных автомобилей, гоночных автомобилей, пикапов и трендовых родстеров и заканчивая фантазийными автомобилями необычного дизайна. Соберите все модели машинок Hot Wheels и пополните свою коллекцию новыми интересными экземплярами (каждая машинка продается отдельно). Hot Wheels и связанные с ним товарные знаки, и фирменный стиль принадлежат Mattel."

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/catalog' element={<CatalogList />} />
        <Route path='/item' element={<OneCatalogItem title={'Porsche 911 carrera RS 2.7 (Main)'} price={361} description={desc} coverUrl={'https://ae03.alicdn.com/kf/S0cd54ee82b714fc083f139f0ce254794B.jpg'} currency={'RUB'} shopID={1} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App