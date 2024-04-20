import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Dashboard from './Dashboard';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';
import Success from './Success';
import { ToastContainer } from 'react-bootstrap';
export default function Home() {
  return (
    <div >
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout'>
          <Route path='' element={<Checkout />} />
          <Route path=':id' element={<Checkout />} />
        </Route>
        <Route path='success' element={<Success />} />
      </Routes>
    </div>
  )
}
