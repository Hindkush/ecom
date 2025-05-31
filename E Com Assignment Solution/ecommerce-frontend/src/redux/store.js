import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import { productsSaga } from './sagas/productsSaga';
import { cartSaga } from './sagas/cartSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(productsSaga);
sagaMiddleware.run(cartSaga);