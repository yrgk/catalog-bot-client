// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './components/CatalogItem'
// import CatalogItem from './components/CatalogItem'
import CatalogList from './components/CatalogList'
import OneCatalogItem from './components/OneCatalogItem'
import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import Cart from './components/Cart'
// import CatalogItem from './components/CatalogItem'
//
//
//

const tg = WebApp

function App() {
  useEffect(() => {
    tg.ready();
  }, [])

  // const onClose = () => {
  //   tg.close()
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<h1>Main page</h1>}/>
        <Route path='/catalog' element={<CatalogList />} />
        <Route path='/item/:itemId' element={<OneCatalogItem/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App