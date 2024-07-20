const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require("./routes/productRoute")
const cartRoutes = require("./routes/cartRoutes")
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require('./routes/wishListRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const orderRoutes = require('./routes/OrderRoutes');

dotenv.config()


const app = express();

// http://localhost:8080/api/v1/products
app.use(cors())
app.use("/api/v1/stripe", stripeRoutes)
app.use(express.json())
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/wishlist", wishlistRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/order", orderRoutes)
// app.use("/api/v2/products", productRoutes)


app.get("/", (req, res) => {
    res.send("Hello From Organic API")
})



mongoose.connect("mongodb://127.0.0.1:27017/organic").then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port " + process.env.PORT + " and Connected to DB")
    })
})
