import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import deviceReducer from "./devices/deviceSlice";
import systemReducer from "./devices/system/systemSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer,
    system: systemReducer
  },
});
