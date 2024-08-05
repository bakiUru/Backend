import  { Schema,model } from "mongoose";
import productModel from "./product.models.js";

//declaro el nombre de la coleccion 
const cartCollection = 'carts'

const CartSchema = new Schema ({
    products:{
        type: [{ 
            product: 
            {
            type: Schema.Types.ObjectId, 
            ref: productModel.modelName
            },
            quantity: Number}]
    }
},
{timestamps:true})
CartSchema.pre('find', ()=>{
    this.populate('products.products')
})

const cartModel = model(cartCollection,CartSchema)
export default cartModel;