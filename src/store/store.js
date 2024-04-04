// store.js
import { configureStore } from "@reduxjs/toolkit";
import otpSlice from "./slices/otpSlice";

export default configureStore({
  reducer: {
    otp: otpSlice,
  },
});
