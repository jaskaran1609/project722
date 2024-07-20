import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    product: null,
    loading: false,
    error: false
}

axios.defaults.baseURL = "http://localhost:8080/api/v1"


export const fetchSingleProduct = createAsyncThunk("products/fetchSingleProduct", async ({ id }) => {
    let res = await axios.get(`/products/${id}`)
    if (res.data.success) {
        return res.data.product
    }
})

export const addReview = createAsyncThunk("products/addReview", async ({
    productId,
    rating,
    message,
    token
}) => {
    let res = await axios.put(`/products/addReview/${productId}`, { rating, message }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    if (res.data.success) {
        return res.data.product
    }
})


const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchSingleProduct.pending]: (state) => {
            state.loading = true
        },
        [fetchSingleProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload
        },
        [fetchSingleProduct.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message)
            state.error = action.error.message
        },
        [addReview.pending]: (state) => {
            state.loading = true
        },
        [addReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload
        },
        [addReview.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message)
            state.error = action.error.message
        }
    }
})

export default singleProductSlice.reducer