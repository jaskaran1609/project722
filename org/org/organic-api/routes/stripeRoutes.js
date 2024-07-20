const Order = require("../models/orderModel");
const express = require("express");
const { checkUser } = require("../middlewares/authMiddleware");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
require("dotenv").config()

const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

const router = express.Router();

router.post(
    "/create-checkout-session",
    express.json({ extended: true, limit: "30mb" }),
    checkUser,
    async (req, res) => {
        try {
            const taxRate = await stripe.taxRates.create({
                display_name: "GST",
                inclusive: false,
                percentage: 18,
                country: "IN",
            });
            const data = req.body; // items : [{productid , qty}], shipping


            let items = await Promise.all(
                data.items.map(async (item) => {
                    let product = await Product.findById(item.productId);
                    return {
                        productId: product._id,
                        productImage: product.image,
                        productName: product.name,
                        price: product.price,
                        qty: item.qty,
                    };
                })
            );


            const line_items = items.map((item) => {
                return {
                    price_data: {
                        currency: "INR",
                        product_data: {
                            name: item.productName,
                            images: [item.productImage],
                        },

                        unit_amount: item.price * 100,
                    },
                    tax_rates: [taxRate.id],
                    quantity: item.qty,
                };
            });


            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items,
                customer_email: req.user.email,
                success_url: "http://localhost:5173/checkout/success?success=true",
                cancel_url: "http://localhost:5173/checkout/success?success=false",
            });
            let subtotal = items.reduce((st, item) => st + item.price * item.qty, 0);
            let taxPer = subtotal * 0.18;
            let total = subtotal + taxPer;

            const newOrder = await new Order({
                userId: req.user._id,
                stripeSessionId: session.id,
                items: items,
                shipping: data.shipping,
                payment_status: "paid",
                total,
                subtotal,
            }).save();


            res.status(200).json({ url: session.url });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;


// // This is your test secret API key.
// const stripe = require('stripe')('sk_test_51NY6sJSHXxLnhgP9MPZffbow2U9PQHATK0GYxDvRTnztDmm0Ce5C25TyxmdawPb2o1OiP2ACl1C6KbfKvXc5dTwE009T3dS4I3');
// const express = require('express');
// const router = express.Router();


// const YOUR_DOMAIN = 'http://localhost:4242';

// router.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: '{{PRICE_ID}}',
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}?success=true`,
//         cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     });

//     res.redirect(303, session.url);
// });


module.exports = router