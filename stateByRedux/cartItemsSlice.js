import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartItemSlice = createSlice({
  name: "cart-item",
  initialState,
  reducers: {
    addOne(state, action) {
      return state.push(action.payload);
    },
  },
});
