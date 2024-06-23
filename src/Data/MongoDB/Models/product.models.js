import { Schema,model } from "mongoose";
import mogoosePaginate  from "mongoose-paginate-v2";

//declaro el nombre de la coleccion 
const productsCollection = 'products'

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
ProductSchema.plugin(mogoosePaginate)
const productModel = model(productsCollection,ProductSchema)

export default productModel