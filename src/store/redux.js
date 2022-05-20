import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
  },
});

//configureStore better than createStore to pass multiple slices
const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterAction = counterSlice.actions;
export default store;
