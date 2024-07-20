const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
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
                    default: 0,
                },

            },
        ],
    },
    {
        timestamps: true,
    }
);

const WishList = mongoose.model("wishList", wishListSchema);

module.exports = WishList;
