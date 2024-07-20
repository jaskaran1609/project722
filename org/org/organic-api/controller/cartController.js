const Cart = require("../models/cartModel");
const WishList = require("../models/wishListModel");

exports.createCart = async (req, res) => {
  try {
    const { _id: userid } = req.user;
    console.log(userid);
    let existingCart = await Cart.findOne({ userid: userid });
    if (existingCart) {
      return res.status(402).json({
        success: false,
        error: "Cart already exists",
      });
    }

    const newCart = await new Cart({
      userid: userid,
      items: [],
    }).save();
    let existingWishlist = await WishList.findOne({ userid: userid });
    if (existingWishlist) {
      return res.status(200).json({
        success: true,
        message: "Cart and Wishlist created successfully",
      });
    }

    const newWishlist = await new WishList({
      userid: userid,
      items: [],
    }).save();
    res.status(201).json({ success: true, message: "Cart and Wishlist created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userid = req.user._id;
    const cart = await Cart.findOne({ userid });
    if (!cart) {
      return res.status(402).json({
        success: false,
        error: "Cart doesn't exists",
      });
    }
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { _id: userid } = req.user;
  const { productId, name, price, image, qty, discount } = req.body;
  try {
    let cart = await Cart.findOne({ userid });

    if (!cart) {
      cart = new Cart({
        userid: userid,
        items: [{ productId, name, price, image, qty, discount }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.qty = qty;
      } else {
        cart.items.push({ productId, name, price, image, qty, discount });
      }
    }
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  const { _id: userid } = req.user;
  const { productId } = req.body;
  try {
    let cart = await Cart.findOne({ userid });

    if (!cart) {
      return res.status(402).json({
        success: false,
        error: "Cart not found",
      });
    } else {
      const existingItem = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItem !== -1) {
        cart.items.splice(existingItem, 1);
      } else {
        return res.status(402).json({
          success: false,
          error: "Product not found in cart",
        });
      }
    }
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports.clearCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.findOne({ userid: _id })
    if (cart.items.length === 0) {
      return res.status(200).json({ message: "Cart cleared successfully" })
    }

    cart.items = []
    let updatedCart = await cart.save()
    return res.status(200).json(updatedCart)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// router.post('/cart/add', async (req, res) => {
// const { userId, productId } = req.body;

// try {
//   // Check if the user's cart already exists
//   let cart = await Cart.findOne({ userId });

//   if (!cart) {
//     // If the cart doesn't exist, create a new cart
//     cart = new Cart({ userId, items: [{ productId }] });
//   } else {
//     // Check if the product is already in the cart
//     const existingItem = cart.items.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingItem) {
//       // If the product already exists, increase the quantity by 1
//       existingItem.quantity += 1;
//     } else {
//       // If the product doesn't exist, add it to the items array
//       cart.items.push({ productId });
//     }
//   }

//   // Save the updated cart
//   await cart.save();

//   res.status(200).json({ message: "Product added to cart successfully" });
// } catch (error) {
//   res
//     .status(500)
//     .json({ error: "An error occurred while adding the product to cart" });
// }
// //   });
