// redux/sagas/productsSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from '../slices/productsSlice';

// Fetch all products
function* fetchProducts() {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/products');
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

// Fetch single product by ID
function* fetchProductById(action) {
  try {
    const { payload: id } = action;
    const response = yield call(axios.get, `http://localhost:5000/api/products/${id}`);
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchProductByIdFailure(error.message));
  }
}


export function* productsSaga() {
  yield takeLatest('products/fetchProducts', fetchProducts);
  yield takeLatest('products/fetchProductById', fetchProductById);
}