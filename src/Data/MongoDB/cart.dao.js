import cartModel from "./Models/cart.models.js"
import productModel from "./Models/product.models.js"

//Verificar antes la existencia del producto en la BD y del carro
const addProductCart = async (id,pid)=>{
    try {
        const cart = await findCart(id)
        console.log('CARRO',cart)
            if(!cart)
                return null
            const productCart = await cartModel.findOneAndUpdate({_id:id, "products.product":pid},{$inc:{"products.$.quantity":1}},{new:true})
            console.log(productCart)
            if(productCart)
                console.log(`esta en el carro incremento la cantidad ${productCart.products[0].quantity}`)
            if(!productCart)
                {
                    console.log(`No esta en el carro lo Agrego al producto ID: ${pid}`)
                    return  cartModel.updateOne({ _id: {$eq:id}}, { $push: { products: {product: pid , quantity: 1 }}},{ new: true })
                }
            return productCart                 
    }catch(e){
        console.log(e)
    }
}


const getCartProduct = async (id)=>{
    try {
        const cart = await cartModel.findById(id)
        if(!cart)
            return null
        return cart.products
    }
    catch(e){
        console.log(e)
    }
}

const findCart = async(id)=>{
    try{
    return await cartModel.findById(id)
    }catch(e){
        console.log(e)
        return null
    }
}

const delProductCart = async (id,pid) =>{
    try {
        const cart = await findCart(id)
        .then(data => data)
        if(!cart)
            return null
        const productCart = await cartModel.updateOne({ _id: {$eq:id}}, { $pull: { products: {product:  {$eq:pid} }}})
        console.log(productCart)
    }catch(e){
        console.log(e)
    }
}

const emptyCart= async (id)=>{
    try {
        const cart = await findCart(id)
        if(!cart)
            return null
        await cartModel.updateOne({ _id: {$eq:id}}, { $set: { products: []}})
        .then(resolve=>{
            console.log(resolve)
            console.log('carro vacio',cart.products.length)
        })
    return {message: 'Se quitaron del Carro todos los Productos: ', prodInCart:cart.products.length}
    }catch(e){
        console.log(e)
    }

}

const delCart = async (id) =>{
    try {
        const cart = await findCart(id)
        .then(data => data)
        if(!cart)
            return null
        await cartModel.findOneAndDelete({_id:id})
        .then(resolve=>{
            console.log(resolve)
            console.log('carro eliminado',cart.products.length)
        })
    return {message: 'Carro Eliminado', prodInCart:cart.products.length}
    }catch(e){
        console.log(e)
    }
}

const cartCreate = async ()=>{
    try {
        const cart = await cartModel.create({})
        return cart
    }catch(e)
    {
        console.log(e)
    }
}

//Actualizacion de Cantidad del Producto en el Carro
const updateQuantityCart =async (id,pid,quantity)=>{
    try{
    const cart = await findCart(id)
        if(!cart)
            return null
    console.log('Carro en Modificacion: ', cart)
    //LOGICA DE MAXIMO STOCK
    const productMAXSTOCK = await cartModel.findOne({products:{product: pid}})
    .then(()=>productModel.findById(pid)).then(
        product => {
            if(quantity > product.stock)
                return {success: 'ERROR',message: `No hay Stock Suficiente---> STOCK: ${product.stock}`}
            //si envia cantidad IGUAL a 0 quitamos el producto del carro
            if(quantity == 0)
                return delProductCart(id,pid)
                .then(prod=>{
                    return {success:'success', message:'Cantidad Modificada a 0 -> Se quito el Producto',payload:prod}
                })
            //Funcionamiento Normal    
            return cartModel.findOneAndUpdate({products:{product: pid, quantity: quantity}})
            .then(prod=>{
                return {success:'success', message:'Cantidad Modificada',payload:prod}})
        }
    ).catch(e=>{
        //console.log(e)
        return null})
        if(!productMAXSTOCK)
            return {success: 'ERROR', message:'No esta el producto en este carro'}
    console.log(productMAXSTOCK)

    //RETORNO EL CARRO ACTUALIZADO
    return  {success:productMAXSTOCK.success,message:productMAXSTOCK.message,payload:await findCart(id)}
    }catch(e)
    {
        console.log(e)
    }
}


export {
    addProductCart,
    cartCreate,
    delProductCart,
    getCartProduct,
    emptyCart,
    delCart,
    updateQuantityCart
}