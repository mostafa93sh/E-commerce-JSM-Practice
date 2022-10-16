import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalPrice: 0 };
const totalPriceSlice = createSlice({
  name: "cart-items",
  initialState,
  reducers: {
    increasePrice(state, action) {
      return (state.totalPrice += action.payload);
    },
    decrease(state, action) {
      return (state.totalPrice -= action.payload);
    },
  },
});

export const totalPriceAction = totalPriceSlice.actions;

export default totalPriceSlice.reducer;
