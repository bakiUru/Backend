import express  from 'express'
import { reloadProducts_Controller, getAllProducts,getOneProduct, addProduct, updateProduct, deleteProduct } from '../Controller/product.controller.js'
import ProductManager from '../Utils/productManager.js'
import { socketServer } from '../app.js'
import { validToken } from '../middleware/tokenVerify.meddleware.js'
import { User_AuthError } from "../Utils/Error/errorHandle.js"
import { authPolicies } from '../middleware/auth.middleware.js'
import { POLICIES } from '../Config/handlePolicies.config.js'
const router = express.Router()
const prod = new ProductManager()
let allProd, allProd_DB

//MIDDLEWARE
//Obtenemos los Productos Middleware
/*
router.use('/',validToken, async (req,res,next)=>{
    const {limit,page,asc,query} = req.query
    console.log(req.user)
    socketServer.on('cliente:liveProduct', data=>console.log(data))
    try{
        //FYLESYSTEM
        
        allProd = await reloadProducts_Controller()
        console.log(allProd)
        
        //MONGODB
        allProd_DB = await getProducts(limit,page,asc,query)
        
    }catch(error)
    {
        console.log(error)
    }
    next()
})*/


//Obtenemos el Producto x ID
router.get('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        getOneProduct
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})

//PRUEBA DE BORRAR UN PRODUCTO CON ROL DE USAURIO
router.delete('/:pid',validToken,authPolicies(POLICIES.ADMIN),async(req,res,next)=>{
    const {role} = req.user
    console.log(role)
    if(role=='user')
    {
        console.log('estoy como usuario')
        const {error,message,status} = new User_AuthError('No tienes Persmisos de Administador')
        return res.status(status).json({message:error + message})
    }
    try{
        allProd = await reloadProducts_Controller()
        next()
    }catch(error)
    {
        console.log(error)
    }
    
})
/*
router.put('/:pid',validToken,authPolicies(POLICIES.ADMIN),async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})
*/
///////////////////////////////////////////////
router.get('/', getAllProducts
    //FYLESYSTEM
    //res.status(allProd.status).send(allProd)
    )


router.get('/:pid',getOneProduct)


router.post('/',validToken,authPolicies(POLICIES.ADMIN),addProduct


    //FILESYSTEM
    /*
    let newProduct = await createProduct_Controller(title, description, price, thumbnail, code, category, stock)
    console.log('Lo que devuelvo',newProduct)
    if(newProduct.status==201)
        res.render('products/new-product',newProduct.data)
    else
        res.status(newProduct.status).send(newProduct.data)
    */
)

router.delete('/:pid',validToken,authPolicies(POLICIES.ADMIN),deleteProduct
    //FILESYSTEM
    /*
    prod.deleteProduct(allProd,req.params.pid)
    .then(data=>{
        console.log(data)
        if (data?.messageError)
            res.status(data.status).send(data.messageError)
        else
            res.status(data.status).send(data.messageError)
    })
    */
  
)


router.put('/:pid',validToken,authPolicies(POLICIES.ADMIN),updateProduct
/*
    //FILESYSTEM
    prod.putProduct(allProd,req.params.pid,title, description, price, thumbnail, code, category, stock)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })
    */
)



export default router;