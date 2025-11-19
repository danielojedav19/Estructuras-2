import { configureStore } from "@reduxjs/toolkit";
import cityNetworkReducer from "./slices/cityNetworkSlice";

const store = configureStore({
  reducer: {
    cityNetwork: cityNetworkReducer,
  },
});

export default store;
