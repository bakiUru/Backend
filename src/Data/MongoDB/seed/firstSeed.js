import productModel from "../Models/product.models.js";
import { seedProduct } from "./products_seed.js";

export const firstSeed = async ()=>{
    try{
        const resul = await productModel.insertMany(seedProduct)
        console.log(resul)
    }catch(e)
    {
        console.log(e)
    }
}