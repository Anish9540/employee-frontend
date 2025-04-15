// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../slices/authSlice"

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Update path as per your project structure

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Use this to get the types of your Redux store state
export type AppDispatch = typeof store.dispatch; // This is for dispatching actions

export default store;
