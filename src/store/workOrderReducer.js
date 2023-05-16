// workOrderReducer.js

import { createReducer } from '@reduxjs/toolkit';
import { addWorkOrder } from '../store/workOrderSlice';

const initialState = {
  workOrders: [],
};

const workOrderReducer = createReducer(initialState, (builder) => {
  builder.addCase(addWorkOrder, (state, action) => {
    state.workOrders.push(action.payload);
  });
});

export default workOrderReducer;
