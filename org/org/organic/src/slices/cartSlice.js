import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const calculateQty = (arr) => {
  return arr?.reduce((qty, item) => qty + item.qty, 0);
};
const calculateAmount = (arr) => {
  return arr?.reduce((amount, item) => amount + item.qty * item.price, 0);
};

const initialState = {
  cart: null,
  loading: false,
  error: false,
  totalItems: 0,
  totalAmount: 0,
};


axios.defaults.baseURL = "http://localhost:8080/api/v1";

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async ({ token }) => {
    let res = await axios.get(`/cart`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (res.data.success) {
      return res.data.cart;
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productdata, token }) => {
    let res = await axios.put(`/cart`, { ...productdata }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (res.data.success) {
      return res.data.cart;
    }
  }
);
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async ({ productId, token }) => {
    let res = await axios.put(`/cart/delete/`, {
      productId: productId,
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (res.data.success) {
      return res.data.cart;
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async ({
  token
}) => {
  try {
    let response = await axios.put("http://localhost:8080/api/v1/cart/clearCart", {}, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserCart.pending]: (state) => {
      state.loading = true;
    },
    [fetchUserCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalItems = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [fetchUserCart.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalItems = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [deleteFromCart.pending]: (state) => {
      state.loading = true;
    },
    [deleteFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalItems = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [deleteFromCart.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [clearCart.pending]: (state) => {
      state.loading = true;
    },
    [clearCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.totalItems = calculateQty(action.payload.items);
      state.totalAmount = calculateAmount(action.payload.items);
    },
    [clearCart.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    },
  },
});

export default cartSlice.reducer;
