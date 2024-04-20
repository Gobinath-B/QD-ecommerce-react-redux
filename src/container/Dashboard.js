import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import firebase from '../config/firebase'
import { setProducts } from '../redux/reducer/products'

export default function Dashboard() {
  const ProductList = useSelector((state) => state.products.products)
  const dispatch = useDispatch()

  const getAllProducts = async () => {
    try {
      const db = firebase.firestore();
      const products = await db.collection('products').get();
      await dispatch(setProducts(products.docs.map((doc) => doc.data())))
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <div className='d-flex flex-wrap gap-2 justify-content-center'>

      {ProductList.map((Product) => <ProductCard {...Product} />)}
    </div>
  )
}

