// Instantiating the Redux Store
import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";

const store = configureStore({
  reducer: {
    // adding our Slice-reducers to the overall Redux store
    adoptedPet,
    searchParams,
  },
});

export default store;
