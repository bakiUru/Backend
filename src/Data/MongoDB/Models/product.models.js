import { Schema,model } from "mongoose";

const ProductSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    thumbnail: String,
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        defult: true,
    },
    category: {
        type: String,
        required: true
    },   
    stock: {
        type: Number,
        required: true,
        min: 0
}
}, {timestamps: true})
const productModel = model('products',ProductSchema)

export default productModel