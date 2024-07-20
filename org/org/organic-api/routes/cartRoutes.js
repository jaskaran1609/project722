const express = require("express");
const {
  createCart,
  getUserCart,
  addToCart,
  deleteFromCart,
  clearCart,
} = require("../controller/cartController");
const { checkUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", checkUser, getUserCart);
// router.put("/:id", deleteCartProducts);
router.put("/", checkUser, addToCart);
router.put("/delete/", checkUser, deleteFromCart);
router.post("/", checkUser, createCart);
router.put("/clearCart", checkUser, clearCart);

module.exports = router;
