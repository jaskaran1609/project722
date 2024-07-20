const mongoose = require("mongoose")
const { products } = require("./data")

const Product = require("./models/productModel")

mongoose.connect(`mongodb://127.0.0.1:27017/organic`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
}).then(() => {
    console.log("connectdb")
})


const seedProduct = async () => {
    try {
        await Product.deleteMany()
        await Product.insertMany(products)
    } catch (error) {
        console.log(error)
    }
}

seedProduct()

