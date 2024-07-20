const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [10, "Product Name Should be Greater than 10 characters"],
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    // required : true
    default: 0,
  },
  category: {
    type: String,
    enum: ["Groceries", "Juices"],
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  numOfReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model("product", productSchema)

module.exports = Product
