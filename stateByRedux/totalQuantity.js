import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalQuantity: 0 };

const totalQuantitySlice = createSlice({
  name: "tQuantity",
  initialState,
  reducers: {
    increaseTquantity(state, action) {
      state.totalQuantity += action.payload;
    },
    decreaseTquantity(state, action) {
      state.totalQuantity -= action.payload;
    },
  },
});
