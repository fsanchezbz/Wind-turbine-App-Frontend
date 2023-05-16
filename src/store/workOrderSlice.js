import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workOrders: [],
};

const workOrderSlice = createSlice({
  name: 'workOrder',
  initialState,
  reducers: {
    addWorkOrder: (state, action) => {
      state.workOrders.push(action.payload);
    },
  },
});

export const { addWorkOrder } = workOrderSlice.actions;
export default workOrderSlice.reducer;
