import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = stockSlice.actions;

export default stockSlice.reducer;
