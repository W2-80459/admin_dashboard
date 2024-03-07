// store.js

import {  configureStore } from "@reduxjs/toolkit";
import MForderSlice from "./pages/newProduct/addBusSlice";



const store = configureStore({
  reducer: {
    addBusData: MForderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;
