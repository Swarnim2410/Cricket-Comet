import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.jsx";
import productSliceReducer from "./productSlice.jsx";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer,
  },
});
