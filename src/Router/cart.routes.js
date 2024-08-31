import {Router}  from 'express'
//FYLESYSTEM
//import Cart from '../Utils/cartManager.js'
//import Product from '../Utils/productManager.js'
import {createCart,addProductCart,getCart,deleteProductCart,deleteCart,emptyCart,updateQuantityCart,purchaseController} from '../Controller/cart.controller.js'
import { authPolicies } from '../middleware/auth.middleware.js'
import { POLICIES } from '../Config/handlePolicies.config.js'



const routerCart = Router()
//Clases para el USO DEL MODO FILESYSTEM 
/*
const cart = new Cart()
const prod = new Product()
let prodInCart = {}
*/
//AL ENTRAR AL CARRO GENERA EL OBJETO CART
/*
routerCart.get('/', async(req,res,next)=>{
    //Creo el cart
    //FILE SYSTEM
    /*
    const newCart = await cartCreate()
    console.log(newCart)
    cart.storeCart()
    next() 
})
*/

routerCart.get('/createCart',authPolicies(POLICIES.USER), createCart)


//TODOS LOS PRODUCTOS DEL CARRO
routerCart.get('/:cid',authPolicies(POLICIES.USER),getCart)

//AGREGAR UN PRODUCTO AL CARRO, O AUMENTAR SU CANTIDAD
routerCart.post('/:cid/products/:pid',authPolicies(POLICIES.USER), addProductCart
        /*
        ///FyleSystem
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
)
//ELIMINO EL CARRO COMPLETO
routerCart.delete('/:cid',authPolicies(POLICIES.ADMIN),deleteCart)

//VACIO EL CARRO
routerCart.delete('/:cid/empty',authPolicies(POLICIES.USER),emptyCart)

//ELIMINO UN PRODUCTO DEL CARRO
routerCart.delete('/:cid/products/:pid',authPolicies(POLICIES.USER),deleteProductCart)

//METODO PUT QUNTITY
routerCart.put('/:cid/products/:pid',authPolicies(POLICIES.USER),updateQuantityCart)


//Ruta de Compra
routerCart.get('/:cid/purchase',authPolicies(POLICIES.USER),purchaseController)


export default routerCart