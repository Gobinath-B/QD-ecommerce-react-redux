import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../components/ProductCard'
import firebase from '../config/firebase'
import { setProducts } from '../redux/reducer/products'
import BannerSlider from '../components/BannerSlider'

export default function Dashboard() {
  const ProductList = useSelector((state) => state.products.products)
  const dispatch = useDispatch();

  const images = [
    {
        label: 'First Picture',
        imgPath: '/banner.jpg',
    },
    {
        label: 'Second Picture',
        imgPath: '/ban.jpg',
    },
    {
        label: 'Third Picture',
        imgPath: '/BA.jpg',
    },
];

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
<>
    <div>
            <BannerSlider images={images} />
        </div>
    <div className='d-flex flex-wrap gap-2 justify-content-center'>

      {ProductList.map((Product) => <ProductCard {...Product} />)}
    </div>
    </>
  )
}

