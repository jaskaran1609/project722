const WishList = require("../models/wishListModel");

exports.createWishlist = async (req, res) => {
    try {
        const { _id: userid } = req.user;
        let existingWishlist = await WishList.findOne({ userid: userid });
        if (existingWishlist) {
            return res.status(200).json({
                success: true,
                error: "Cart already exists",
            });
        }

        const newWishlist = await new WishList({
            userid: userid,
            items: [],
        }).save();
        res.status(201).json({ success: true, newWishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getUserWishlist = async (req, res) => {
    try {
        const userid = req.user._id;
        const wishList = await WishList.findOne({ userid });
        if (!wishList) {
            return res.status(402).json({
                success: false,
                error: "Wishlist doesn't exists",
            });
        }
        res.status(200).json({
            success: true,
            wishList,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    const { _id: userid } = req.user;
    const { productId, name, price, image, discount } = req.body;
    try {
        let wishlist = await WishList.findOne({ userid });

        if (!wishlist) {
            wishlist = new WishList({
                userid: userid,
                items: [{ productId, name, price, image, discount }],
            });
        } else {
            const existingItem = wishlist.items.find(
                (item) => item.productId.toString() === productId
            );

            if (existingItem) {
                return res.status(200).json({
                    success: true,
                    wishlist
                })
            } else {
                wishlist.items.push({ productId, name, price, image, discount });
            }
        }
        await wishlist.save();

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteFromWishlist = async (req, res) => {
    const { _id: userid } = req.user;
    const { productId } = req.body;
    try {
        let wishlist = await WishList.findOne({ userid });

        if (!wishlist) {
            return res.status(402).json({
                success: false,
                error: "wishlist not found",
            });
        } else {
            const existingItem = wishlist.items.findIndex(
                (item) => item.productId.toString() === productId
            );

            console.log(existingItem)

            if (existingItem !== -1) {
                wishlist.items.splice(existingItem, 1);
            } else {
                return res.status(402).json({
                    success: false,
                    error: "Product not found in wishlist",
                });
            }
        }
        await wishlist.save();

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};