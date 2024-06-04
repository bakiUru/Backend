import express  from 'express'
import Cart from '../Utils/cartManager.js'
import Product from '../Utils/productManager.js'
import { findProducts_Controller } from '../Controller/product.controller.js'

const routerCart =express.Router()
const cart = new Cart()
const prod = new Product()
//AL ENTRAR AL CARRO GENERA EL OBJETO CART
routerCart.get('/',(req,res,next)=>{
    cart.storeCart()
    next()
})
routerCart.get('/',(req,res)=>{

//cart.addItem({id: 3,nombre: 'pepi', apellido:'muñeco'})
res.send('estamos en el cart')
})
routerCart.get('/:cid',(req,res,next)=>{
    if(cart.getCart(req.params.cid)==undefined)
        cart.storeCart()
    next()
})
routerCart.get('/:cid',(req,res)=>{
    console.log(cart.getItem(req.params.cid))
    res.send('estamos buscando el id en el carro')
})
routerCart.post('/:cid/products/:pid', (req,res,next)=>{
    if(cart.getCart(req.params.cid)==undefined)
        cart.storeCart()
    next()
})
routerCart.post('/:cid/products/:pid', (req,res)=>{
        const {cid,pid} = req.params
        
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
        
         
})

routerCart.delete('/', (req,res)=>{
    cart.delCart()
    res.send('Carrito Vacio')
})

export default routerCart