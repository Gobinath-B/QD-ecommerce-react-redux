
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducer/cart';
import productReducer from './reducer/products';

export default configureStore({
     reducer: {
          cart: cartReducer,
          products: productReducer
     }
});