// Instantiating the Redux Store
import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import { petApi } from "./petApiService";
import searchParams from "./searchParamsSlice";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const store = configureStore({
  reducer: {
    // adding our Slice-reducers to the overall Redux store
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  // middleware enables the caching functionality, good idea to always include it with Redux React Query toolkit
  middleware: (curryGetDefaultMiddleware) =>
    curryGetDefaultMiddleware().concat(petApi.middleware),
});

export default store;
