import express  from 'express'
import { reloadProducts_Controller, findProducts_Controller, createProduct_Controller, filterData_Controller } from '../Controller/product.controller.js'
import ProductManager from '../Utils/productManager.js'
import { socketServer } from '../app.js'

const router = express.Router()
const prod = new ProductManager()
let allProd


//Obtenemos los Productos Middleware
router.get('/',async (req,res,next)=>{
    //prueba
    socketServer.on('cliente:liveProduct', data=>console.log(data))
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next()
})
//Obtenemos el Producto x ID
router.get('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})

router.delete('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})
router.put('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})


router.get('/', (req, res)=>{
    res.status(allProd.status).send(allProd)
    
})


router.get('/:pid',async (req,res)=>{
    res.status(allProd.status).send(await findProducts_Controller(req.params.pid))

})


router.post('/',async(req,res)=>{
    //Prueba de Ingreso // TODO ERRORES
    console.log('lo que recibo del FORM',req.body)
    const {title, 
        description, 
        price, 
        thumbnail, 
        code, 
        category, 
        stock} = filterData_Controller(req.body)
        
        let newProduct = await createProduct_Controller(title, description, price, thumbnail, code, category, stock)
        console.log('Lo que devuelvo',newProduct)
        if(newProduct.status==201)
            res.render('products/new-product',newProduct.data)
        else
            res.status(newProduct.status).send(newProduct.data)


    
})

router.delete('/:pid',(req,res)=>{
    prod.deleteProduct(allProd,req.params.pid)
    .then(data=>{
        console.log(data)
        if (data?.messageError)
            res.status(data.status).send(data.messageError)
        else
            res.status(data.status).send(data.messageError)
    })

  
})
router.put('/:pid',(req,res)=>{
    
    const {title, description, price, thumbnail, code, category, stock} = filterData_Controller(req.body)
    prod.putProduct(allProd,req.params.pid,title, description, price, thumbnail, code, category, stock)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })

})



export default router;