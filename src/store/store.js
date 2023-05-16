// store.js

import { configureStore } from '@reduxjs/toolkit';
import workOrderReducer from '../store/workOrderSlice';

const store = configureStore({
  reducer: {
    workOrder: workOrderReducer,
  },
});

export default store;
