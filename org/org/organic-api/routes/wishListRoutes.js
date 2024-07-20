const express = require("express");
const {
    getUserWishlist,
    createWishlist,
    addToWishlist,
    deleteFromWishlist
} = require("../controller/wishlistController");
const { checkUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", checkUser, getUserWishlist);
// router.put("/:id", deleteCartProducts);
router.put("/", checkUser, addToWishlist);
router.put("/delete", checkUser, deleteFromWishlist);
router.post("/", checkUser, createWishlist);

module.exports = router;
