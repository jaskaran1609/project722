const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({
            success: true,
            allProducts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
exports.getProductById = async (req, res) => {
    try {

        const id = req.params.id
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


module.exports.createProduct = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).json({ error: "Cannot create product" });
        }
        const data = req.body;
        const newProduct = await new Product(data).save();
        if (!newProduct) {
            return res.status(400).json({ error: "Error creating product" });
        }
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports.updateProduct = async (req, res) => {
    try {
        let data = req.body;
        let { productId } = req.params;
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        let newProduct = {
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description,
            countInStock: data.countInStock,
            featured: data.featured,
            image: data.image,
            rating: existingProduct.rating,
            reviews: [...existingProduct.reviews],
            numOfReviews: existingProduct.numOfReviews,
        };
        const updatedProduct = await Product.findByIdAndUpdate(
            { _id: productId },
            newProduct,
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports.deleteProduct = async (req, res) => {
    try {
        let { productId } = req.params;
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const deletedProduct = await Product.findByIdAndDelete({ _id: productId });
        const allProducts = await Product.find();

        return res.status(200).json(deletedProduct);
    } catch (error) { }
};



module.exports.addReview = async (req, res) => {
    try {
        const { productId } = req.params
        const { _id, username } = req.user;
        const { message, rating } = req.body;

        const review = {
            userid: _id,
            username,
            message,
            rating,
        }

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        const { reviews } = existingProduct;
        let existingReview = reviews.find((review) => {
            return review.userid.toString() === _id.toString()
        })
        if (existingReview) {
            return res.status(402).json({
                success: false,
                error: "You Already Have one review on this product"
            })
        } else {
            const newReviews = [...reviews, review]
            const newRating = reviews.length !== 0 ? newReviews.reduce((acc, curItem) => acc + curItem.rating, 0) / newReviews.length : rating;
            const updatedProduct = await Product.findByIdAndUpdate({ _id: productId }, {
                $set: { rating: newRating, numOfReviews: newReviews.length },
                $push: { reviews: review }
            }, { new: true })

            return res.status(201).json({
                success: true,
                product: updatedProduct
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}