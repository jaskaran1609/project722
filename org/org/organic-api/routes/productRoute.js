const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controller/productController");
const { checkUser, checkAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// http://localhost:8080/products
router.get("/", getAllProducts);
// http://localhost:8080/products/:id
router.get("/:id", getProductById);
// http://localhost:8080/products

router.post("/", createProduct);
router.put("/:id", updateProduct);

router.post("/create", checkUser, checkAdmin, createProduct)
router.put("/update/:productId", checkUser, checkAdmin, updateProduct)
router.delete("/delete/:productId", checkUser, checkAdmin, deleteProduct)
router.put("/addReview/:productId", checkUser, addReview)

module.exports = router;
