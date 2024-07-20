import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    products: null,
    loading: false,
    error: false,
    filteredProducts: [],
    searchQuery: "",
    sort: 0,
    priceRange: { min: 0, max: 10000 },
}

axios.defaults.baseURL = "http://localhost:8080/api/v1"


export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts", async () => {
    let res = await axios.get("/products")
    if (res.data.success) {
        return res.data.allProducts
    }
})


export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async ({ token, productId }) => {
        try {
            let { data } = await axios.delete(
                `http://localhost:8080/api/v1/products/delete/${productId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ formData, token, productId }) => {
        try {
            let { data } = await axios.put(
                `http://localhost:8080/api/v1/products/update/${productId}`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async ({ formData, token }) => {
        try {
            let { data } = await axios.post(
                `http://localhost:8080/api/v1/products/create`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        filterProducts: (state, action) => {
            const { searchQuery, priceRange, products } =
                current(state);

            const filteredProducts = products?.filter((product) => {
                // Filter by search query
                if (
                    searchQuery &&
                    !product.name.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    return false;
                }

                // Filter by price range
                // const { price } = product;
                if (product.price < priceRange.min || product.price > priceRange.max) {
                    return false;
                }

                return true;
            });

            state.filteredProducts = state.sort === 1 ? [...filteredProducts].sort((a, b) => {
                a = parseInt(a["price"])
                b = parseInt(b["price"])
                return a - b
            }) : state.sort === - 1 ? [...filteredProducts].sort((a, b) => {
                a = parseInt(a["price"])
                b = parseInt(b["price"])
                return b - a
            }) : filteredProducts
        }
    },
    extraReducers: {
        [fetchAllProducts.pending]: (state) => {
            state.loading = true
        },
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload
            state.filteredProducts = action.payload
        },
        [fetchAllProducts.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.error.message)
            state.error = action.error.message
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            let index = state.products.findIndex(
                (product) => product._id === action.payload._id
            );
            state.products.splice(index, 1);
            state.filteredProducts.splice(index, 1);

        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            let index = state.products.findIndex(
                (product) => product._id === action.payload._id
            );
            state.products.splice(index, 1, action.payload);
            state.filteredProducts.splice(index, 1, action.payload);
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [addProduct.pending]: (state) => {
            state.loading = true;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = [action.payload, ...state.products];
            state.filteredProducts = [action.payload, ...state.products];

        },
        [addProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
    }
})

export default productSlice.reducer
export const { setPriceRange, setSearchQuery, filterProducts, setSort } = productSlice.actions