import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import deviceReducer from "./devices/deviceSlice";
import systemReducer from "./devices/system/system";
import vlanReducer from './devices/system/vlan';
import portReducer from './devices/system/ports';
import bridgeReducer from './devices/system/bridge';
import interfaceReducer from './devices/system/interface';
import ipReducer from './devices/system/ip';
import hotspotReducer from './devices/system/hotspot';
import voucherReducer from './devices/system/voucher';

export default configureStore({
  reducer: {
    auth: authReducer,
    devices: deviceReducer,
    system: systemReducer,
    vlans: vlanReducer,
    ports: portReducer,
    bridges: bridgeReducer,
    interfaces: interfaceReducer,
    ip: ipReducer,
    hotspot: hotspotReducer,
    voucher: voucherReducer,
  },
});
