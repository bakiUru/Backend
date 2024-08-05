import express  from 'express'
import Cart from '../Utils/cartManager.js'
import Product from '../Utils/productManager.js'
import productModel from '../Data/MongoDB/Models/product.models.js'
import {addProductCart,getCartProduct,cartCreate, delCart, delProductCart, emptyCart,updateQuantityCart} from '../Data/MongoDB/cart.dao.js'


const routerCart =express.Router()
//Clases para el USO DEL MODO FILESYSTEM 
const cart = new Cart()
const prod = new Product()
let prodInCart = {}
//AL ENTRAR AL CARRO GENERA EL OBJETO CART
routerCart.get('/', async(req,res,next)=>{
    //Creo el cart
    const newCart = await cartCreate()
    console.log(newCart)
    cart.storeCart()
    next()
})

routerCart.get('/', (req,res)=>{
//cart.addItem({id: 3,nombre: 'La Gran', apellido:'Muñeca'})
res.send('estamos en el cart')
})

//MIDLEWARE TODOS LOS PROUCTOS EN EL CARRO  
routerCart.get('/:cid', async(req,res,next)=>{
    const cid = req.params.cid
    prodInCart = await getCartProduct(cid)
    /*
    if(cart.getCart(req.params.cid)==undefined)
        cart.storeCart()
    */
    if(prodInCart)
        next()
    else
        res.status(404).json({message:'No existe tal carrito'})
})

//TODOS LOS PRODUCTOS DEL CARRO
routerCart.get('/:cid',(req,res)=>{
    console.log(prodInCart)
    res.status(200).json({message:'Todos los productos del Carro', payload: prodInCart})
    /*
    console.log(cart.getItem(req.params.cid))
    res.send('estamos buscando el id en el carro')
    */
})
routerCart.post('/:cid/products/:pid', (req,res,next)=>{
    if(cart.getCart(req.params.cid)==undefined)
        cart.storeCart()
    next()
})

//AGREGAR UN PRODUCTO AL CARRO, O AUMENTAR SU CANTIDAD
routerCart.post('/:cid/products/:pid',async (req,res)=>{
        const {cid,pid} = req.params
        //MONGODB
        productModel.findById(pid)
        .then(data=>{
            if(!data)
                return res.status(404).json({status: 'ERROR', message: 'Producto no encontrado'})
            addProductCart(cid,pid)
            .then(cart=>{
                if(!cart)
                    return res.status(404).json({status: 'ERROR', message: 'Carro no encontrado'})
                return res.status(200).json({status: 'success', message: 'Producto agregado al carro', cart})
            })
        })
        /*
        ///DE MANERA LOCAL
        //const prodFind = prod.getProductsbyID(pid)
        const cartFind = cart.getCart(cid) 
        if (cartFind.length > 0 || cartFind == cid)
            {
            //console.log('Encontre carrito', cartFind)
            findProducts_Controller(pid)
                .then(data=>  {
                    console.log('que es',Object.keys(data.data).length)
                    if(Object.keys(data.data).length != 0)
                        {
                            cart.addItem(data.data)
                            cart.storeCart()
                            res.status(data.status).send(`Se agrego Producto ${data.data.id}`)
                        }
                    else    
                        res.status(data.status).send(data.message)
                  
                })
            
            }
        else
            res.send('No encontre El producto a Agregar')
        
         */
})
//ELIMINO EL CARRO COMPLETO
routerCart.delete('/:cid',async (req,res)=>{
    const {cid} = req.params
    delCart(cid)
    .then(cart=>{
        console.log('endpoint',cart)
        if(!cart)
           return res.status(404).json({status: 'ERROR', message: 'Carro no Existe'})
        return res.status(200).json({status:'success',message:`${cart.message} con ${cart.prodInCart}`})
    })

})

//VACIO EL CARRO
routerCart.delete('/:cid/empty',async (req,res)=>{
    const {cid} = req.params
    emptyCart(cid)
    .then(cart=>{
        console.log(cart)
        if(!cart)
            return res.status(404).json({status: 'ERROR', message: 'Carro no Existe'})
        return res.status(200).json({status:'success',message:`${cart.message} ${cart.prodInCart} Productos `})
    })

})

//ELIMINO UN PRODUCTO DEL CARRO
routerCart.delete('/:cid/products/:pid',async (req,res)=>{
    const {cid,pid} = req.params
    delProductCart(cid,pid)
    .then(cart=>{
        console.log(cart)
        if(!cart)
            res.status(404).json({status: 'ERROR', message: 'Producto'})
        else
        res.status(200).json({status:'success',message:'Producto eliminado',payload: cart})
    })

})

routerCart.delete('/', (req,res)=>{
    //FILESYSTEM
    cart.delCart()
    res.send('Carrito Vacio')
})

//METODO PUT QUNTITY
routerCart.put('/:cid/products/:pid',async (req,res)=>{
    const {cid,pid} = req.params
    const {quantity} = req.body

    console.log('ID:',cid, pid)
    console.log('QUANTITY:',quantity)

    //funcion CART
    const cartPUT = await updateQuantityCart(cid,pid,quantity)
    console.log('CART ROUTE',cartPUT)
    if(cartPUT)
     return res.status(200).json({status:cartPUT.success,message:cartPUT.message,payload:cartPUT.payload})
    return res.status(404).json({status:'ERROR',message:'No Hay producto',payload:cartPUT})

})

export default routerCart