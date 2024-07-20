import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./slices/productSlice"
import singleProduct from "./slices/singleProduct"
import cartSlice from "./slices/cartSlice"
import userSlice from "./slices/userSlice"
import WishListSlice from "./slices/wishListSlice.js";

const store = configureStore({
    reducer: {
        productState: productSlice,
        singleProduct: singleProduct,
        cartState: cartSlice,
        userState: userSlice,
        wishListState: WishListSlice,
    }
})

export default store