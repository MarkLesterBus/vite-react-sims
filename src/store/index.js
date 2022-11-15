import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import deviceReducer from "./devices/deviceSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer
  },
});
