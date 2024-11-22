// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './components/CatalogItem/CatalogItem'
// import CatalogItem from './components/CatalogItem'
import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import Cart from './components/Cart/Cart'
import CatalogList from './components/CatalogList/CatalogList'
import OneCatalogItem from './components/OneCatalogItem/OneCatalogItem'


const tg = WebApp

function App() {
  useEffect(() => {
    tg.ready();
    tg.disableVerticalSwipes()
  }, [])

  // const onClose = () => {
  //   tg.close()
  // }


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<h1>Main page</h1>}/> */}
        <Route index element={<CatalogList />}/>
        <Route path='/catalog/:shopId' element={<CatalogList />} />
        <Route path='/item/:itemId' element={<OneCatalogItem/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App