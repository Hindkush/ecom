// redux/slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null, // For single product details
    loading: false,
    error: null,
  },
  reducers: {
    // For fetching all products
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    // For fetching a single product by ID
    fetchProductByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess(state, action) {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductByIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export all actions
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} = productsSlice.actions;

// Action creators to trigger Sagas
export const fetchProducts = () => ({ type: 'products/fetchProducts' });
export const fetchProductById = (id) => ({ 
  type: 'products/fetchProductById', 
  payload: id 
});

export default productsSlice.reducer;