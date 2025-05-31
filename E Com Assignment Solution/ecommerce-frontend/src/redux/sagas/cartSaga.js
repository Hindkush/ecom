import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { clearCart } from '../slices/cartSlice';

function* placeOrder(action) {
  try {
    const { orderData } = action.payload;
    yield call(axios.post, 'http://localhost:5000/api/orders', orderData);
    yield put(clearCart());
    alert('Order placed successfully!');
  } catch (error) {
    alert('Failed to place order: ' + error.message);
  }
}

export function* cartSaga() {
  yield takeLatest('cart/placeOrder', placeOrder);
}