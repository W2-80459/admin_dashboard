import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { toastNotification } from "../../../../app/Notification";


const initialState = {
  SelectedOrderData: {},
  mfSipOrderDetails: [],

};
const AddBusSliceData = createSlice({
  name: "addBusData",
  initialState,
  reducers: {


    SetSelectedOrderData: (state, action) => {
      state.SelectedOrderData = action.payload;
    },
    GetSelectedOrderData: (state, action) => {
      // toastNotification("error", action.payload);
    },
  },
});
export const {

  SetSelectedOrderData,
  GetSelectedOrderData,
} = AddBusSliceData.actions;


export const StpGetOrders = function(data) {
  return async function(dispatch) {
    try {
      // /const getStpOrderData = await GetSTPOrder(data);
     // dispatch(GetSelectedOrderData(getStpOrderData));
    } catch (err) {
      dispatch(GetSelectedOrderData(err));
    }
  };

};


export default AddBusSliceData.reducer;
