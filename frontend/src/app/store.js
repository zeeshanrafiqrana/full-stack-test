import { configureStore } from '@reduxjs/toolkit'
import stockSliceReducer from '../features/stockSlice'

export const store = configureStore({
  reducer: {
    stock: stockSliceReducer,
  },
})