import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  productList: [],
  cartItem: [],
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      //console.log(action);
      state.productList = [...action.payload];
    },

    addCartItem: (state, action) => {
      console.log(action.payload);
      const check = state.cartItem.some(
        (itr) => itr._id === action.payload._id
      );
      if (check) {
        toast("Item already in cart");
      } else {
        toast("Item added successfuly");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One Item Deleted");

      //to get the index of element we want to delete
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      //console.log(index);

      //index se next kitne elements delete karne
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      //console.log(index);
      let qty = state.cartItem[index].qty;
      const qtyTotal = ++qty;
      state.cartItem[index].qty = qtyTotal;

      let price = state.cartItem[index].price;
      let total = price * qtyTotal;
      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      console.log(index);
      let qty = state.cartItem[index].qty;
      let qtyTotal = 1;
      if (qty > 1) {
        qtyTotal = --qty;
        state.cartItem[index].qty = qtyTotal;
      }
      let price = state.cartItem[index].price;
      let total = price * qtyTotal;
      state.cartItem[index].total = total;
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export default productSlice.reducer;
