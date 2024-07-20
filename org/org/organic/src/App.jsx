import { ThemeProvider, CssBaseline } from "@mui/material";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomeLayout from "./components/HomeLayout/HomeLayout";
import HomePage from "./pages/HomePage.jsx";
import theme from "./theme";
import ProductList from "./components/ProductList/ProductList";
import ProductListByCategory from "./components/ProductListByCategory/ProductListByCategory";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SingleProduct from "./pages/SingleProduct";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./slices/productSlice";
import { fetchUserCart } from "./slices/cartSlice";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import AboutPage from "./pages/AboutPage";
import { fetchUserwishlist } from "./slices/wishListSlice";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import SuccessPage from "./pages/SuccessPage";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductPanel from "./pages/Dashboard/AdminPanels/ProductPanel";
import UnderMaintainence from "./pages/Dashboard/AdminPanels/UnderMaintainence";



function App() {
  const dispatch = useDispatch();
  const { cart, totalQty } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);
  // const {}
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname]);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  useEffect(() => {
    user && dispatch(
      fetchUserCart({ token: user?.token })
    );
  }, [user, totalQty]);


  useEffect(() => {
    user && dispatch(
      fetchUserwishlist({ token: user?.token })
    );
  }, [user]);

  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="everything" element={<ProductList />} />
          <Route
            path="product-category/:categoryName"
            element={<ProductListByCategory />}
          />
          <Route path="cart" element={<CartPage />} />
          {/* <Route path="checkout" element={user ? <CheckoutPage /> : <Navigate to={"/login"} />} /> */}
          <Route path="checkout" element={!user ? <Navigate to={"/login"} /> : user && cart?.items?.length < 1 ? <Navigate to={"/"} /> : <CheckoutPage />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route
            path="login"
            element={user ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="register"
            element={user ? <Navigate to={"/"} /> : <Register />}
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout/success" element={<SuccessPage />} />
          <Route path="dashboard" element={user?.role === "admin" ? <Dashboard /> : <Navigate to={"/login"} />}>
            <Route index element={user?.role === "admin" ? <ProductPanel /> : <Navigate to="/" />} />
            <Route path="products" element={user?.role === "admin" ? <ProductPanel /> : <Navigate to="/" />} />
            <Route path="orders" element={user?.role === "admin" ? <UnderMaintainence /> : <Navigate to="/" />} />
            <Route path="users" element={user?.role === "admin" ? <UnderMaintainence /> : <Navigate to="/" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
    // </ThemeProvider>
  );
}

export default App;
