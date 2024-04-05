import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.API_URL || "http://localhost:4000";
export const validateOtp = createAsyncThunk("otp/validate", async (otp) => {
  try {
    const response = await axios.post(baseURL + "/api/validate_otp", otp);
    const data = response.data;
    console.log(data, "data");
    return data;
  } catch (error) {
    console.log("Error validating OTP2:", error);
    return error.response.data;
  }
});
export const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otpStatus: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateOtp.pending, (state) => {
        state.otpStatus = "pending";
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.otpStatus = "fulfilled";
        state.error = null;
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.otpStatus = "rejected";
        state.error = action.error.message;
      });
  },
});
export default otpSlice.reducer;
