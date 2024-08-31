import cartRepository from '../Data/MongoDB/cart.repository.js'
import productRepository from '../Data/MongoDB/product.repository.js'

const createCart = async () =>{
    return await cartRepository.cartCreate()
}

const getCart = async (id) =>{
    return await cartRepository.getCartProduct(id)
}

const addProductCart = async (id,pid,quantity=1)=>{
    return await cartRepository.addProductCart(id,pid,quantity)
}

const deleteProductCart = async (id,pid)=>{
    return await cartRepository.delProductCart(id,pid)
}

const deleteCart = async (id)=>{
    return await cartRepository.delCart(id)
}

const emptyCart = async (id)=>{
    return await cartRepository.emptyCart(id)
}
const updateQuantityCart = async (id, pid, quantity) =>{
    return await cartRepository.updateQuantityCart(id, pid, quantity)
}

const purchase = async (id)=>{
    const cart = await cartRepository.getCartProduct(id)
    let tot = 0
    const noStockProduct = []
    console.log(cart)
    for (const product of cart){
        const prod = await productRepository.getOneProduct(product.product) 
        console.log(prod)
        if (prod.stock >= product.quantity)
        {
            tot += prod.price * product.quantity
            await productRepository.updateStock(prod._id,{stock:prod.stock-product.quantity})

        }
        else
            noStockProduct.push(product)
        await cartRepository.updateCart(id,{products:noStockProduct})

        }
    return tot
}
export default{
    createCart,
    getCart,
    addProductCart,
    deleteProductCart,
    deleteCart,
    emptyCart,
    updateQuantityCart,
    purchase
}

/*
    emptyCart,

    updateQuantityCart
*/