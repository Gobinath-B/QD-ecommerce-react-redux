import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

const ProductsReducer = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload
        }
    }
});

export const { setProducts } = ProductsReducer.actions

export default ProductsReducer.reducer