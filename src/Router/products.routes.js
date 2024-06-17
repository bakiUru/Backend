import express  from 'express'
import { reloadProducts_Controller, findProducts_Controller, createProduct_Controller, filterData_Controller } from '../Controller/product.controller.js'
import ProductManager from '../Utils/productManager.js'
import { socketServer } from '../app.js'
import productModel from '../Data/MongoDB/Models/product.models.js'

const router = express.Router()
const prod = new ProductManager()
let allProd, allProd_DB


//Obtenemos los Productos Middleware
router.get('/',async (req,res,next)=>{
    //prueba
    socketServer.on('cliente:liveProduct', data=>console.log(data))
    try{
        allProd = await reloadProducts_Controller()
        //console.log(allProd)
        allProd_DB = await productModel.find()
        console.log('desde la BD',allProd_DB)
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
    await productModel.findOne({_id:{$eq:req.params.pid}})
    .then(product=>{
        if(!product)
             return console.log('no hay nadie')
        console.log('desde la BD un producto',product)
    })
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

router.delete('/:pid',async (req,res)=>{
    
    //MONGO DB
    await productModel.findById(req.params.pid,{title:1,price:1})
    .then(data=>{
        if(!data)
            return console.log('no hay nada que borrar')
        console.log('hay esto para borrar',data)
        productModel.findByIdAndDelete(data._id)
        .then(data=>console.log('Se elimino',data))
    })
    //FILESYSTEM
    prod.deleteProduct(allProd,req.params.pid)
    .then(data=>{
        console.log(data)
        if (data?.messageError)
            res.status(data.status).send(data.messageError)
        else
            res.status(data.status).send(data.messageError)
    })

  
})
router.put('/:pid',async (req,res)=>{
    
    const {title, description, price, thumbnail, code, category, stock} = filterData_Controller(req.body)

    //MONGO DB
    await productModel.findByIdAndUpdate(req.params.pid,{title, description, price, thumbnail, code, category, stock})
    .then(data=>{
        if (!data)
            return console.log('NO encontro nada para actualizaR')
        console.log('se Actualizo',data)
        productModel.findById(req.params.pid)
        .then(data=>console.log('ACTUALIZADO',data))
        
    })

    //FILESYSTEM
    prod.putProduct(allProd,req.params.pid,title, description, price, thumbnail, code, category, stock)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })

})



export default router;