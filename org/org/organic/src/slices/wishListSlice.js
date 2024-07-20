import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    wishlist: null,
    loading: false,
    error: false,
};


axios.defaults.baseURL = "http://localhost:8080/api/v1";

export const fetchUserwishlist = createAsyncThunk(
    "wishlist/fetchUserwishlist",
    async ({ token }) => {
        let res = await axios.get(`/wishlist`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data.wishList;
        }
    }
);
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ productdata, token }) => {
        let res = await axios.put(`/wishlist`, { ...productdata }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data.wishlist;
        }
    }
);
export const deleteFromWishlist = createAsyncThunk(
    "wishlist/deleteFromWishlist",
    async ({ productId, token }) => {
        let res = await axios.put(`/wishlist/delete`, {
            productId: productId,
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        if (res.data.success) {
            return res.data.wishlist;
        }
    }
);

const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserwishlist.pending]: (state) => {
            state.loading = true;
        },
        [fetchUserwishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        },
        [fetchUserwishlist.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message);
            state.error = action.error.message;
        },
        [addToWishlist.pending]: (state) => {
            state.loading = true;
        },
        [addToWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        },
        [addToWishlist.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message);
            state.error = action.error.message;
        },
        [deleteFromWishlist.pending]: (state) => {
            state.loading = true;
        },
        [deleteFromWishlist.fulfilled]: (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        },
        [deleteFromWishlist.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message);
            state.error = action.error.message;
        },
    },
});

export default wishListSlice.reducer;
