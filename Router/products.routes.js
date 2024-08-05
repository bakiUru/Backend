import express  from 'express'
import { reloadProducts_Controller, filterData_Controller } from '../Controller/product.controller.js'
import ProductManager from '../Utils/productManager.js'
import { socketServer } from '../app.js'
import { getOneProduct, getProducts, newProduct, delProductDB,putProductDB } from '../Data/MongoDB/product.dao.js'
import { validToken } from '../middleware/tokenVerify.meddleware.js'
import { User_AuthError } from "../Utils/Error/errorHandle.js"
const router = express.Router()
const prod = new ProductManager()
let allProd, allProd_DB

//MIDDLEWARE
//Obtenemos los Productos Middleware
router.get('/',validToken, async (req,res,next)=>{
    const {limit,page,asc,query} = req.query
    console.log(req.user)
    socketServer.on('cliente:liveProduct', data=>console.log(data))
    try{
        //FYLESYSTEM

        allProd = await reloadProducts_Controller()
        //console.log(allProd)

        //MONGODB
        allProd_DB = await getProducts(limit,page,asc,query)
        
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
        getOneProduct
        //console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})

//PRUEBA DE BORRAR UN PRODUCTO CON ROL DE USAURIO
router.delete('/:pid',validToken,async(req,res,next)=>{
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

///////////////////////////////////////////////
router.get('/', (req, res)=>{
    //MONGODB

    allProd_DB.totalDocs>0?
    res.status(200).json({
        status:'succes',
        payload:allProd_DB.docs,
        totalPages: allProd_DB.totalPages,
        page: allProd_DB.page,
        pagingCounter: allProd_DB.pagingCounter,
        hasPrevPage: allProd_DB.hasPrevPage,
        hasNextPage: allProd_DB.hasNextPage,
        prevLink: allProd_DB.prevPage,
        nextLink: allProd_DB.nextPage
    })
    :
    res.status(404).json({status:'error',payload:[],message:"No hay productos"})

    //FYLESYSTEM
    //res.status(allProd.status).send(allProd)
    
})


router.get('/:pid',async (req,res)=>{
    const {pid} = req.params

    const product = await getOneProduct(pid)
    if(!product)
        return res.status(404).json({status:'error',message:"No Encontramos el Producto",payload:[]})
    return res.status(200).json({success:'success',message:'Producto Encontrado',payload: product })
    /*await productModel.findOne({_id:{$eq:pid}})
        .then(product=>{
            if(!product)
                return console.log('no hay nadie')
            console.log('desde la BD un producto',product)
        })
    res.status(allProd.status).send(await findProducts_Controller(pid))
    */

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
        //MONGO DB
        const newProductDB = await newProduct(title, description, price, thumbnail, code, category, stock)
        //const newProductDB = await productModel.create({title, description, price, thumbnail, code, category, stock,status:(stock>0)? true : false })
        console.log(newProductDB)
        if(!newProductDB)
            return res.status(400).json({status:'ERROR',message:"No se pudo crear el Producto",payload:[]})
        return res.status(200).json({status:'success',message:"Se ha creado el Producto",payload:newProductDB})


        //FILESYSTEM
        /*
        let newProduct = await createProduct_Controller(title, description, price, thumbnail, code, category, stock)
        console.log('Lo que devuelvo',newProduct)
        if(newProduct.status==201)
            res.render('products/new-product',newProduct.data)
        else
            res.status(newProduct.status).send(newProduct.data)
        */

    
})

router.delete('/:pid',async (req,res)=>{
    
    //MONGO DB
    const {pid} = req.params
    const deletedProduct = await delProductDB(pid)
    console.log('DELETE ROUTES',deletedProduct)
    if(!deletedProduct)
        return res.status(400).json({status:'ERROR',message:"No se pudo Borrar el Producto",payload:[]})
    return res.status(200).json({status:'success',message:"Se ha Borrado el Producto",payload:deletedProduct})
    
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
  
})


router.put('/:pid',async (req,res)=>{
    const {pid} = req.params
    const {title, description, price, thumbnail, code, category, stock} = filterData_Controller(req.body)
    //MONGO DB
    const modProdcut = await putProductDB(pid,title, description, price, thumbnail, code, category, stock)
    console.log('MOD ROUTES',modProdcut)
    if(!modProdcut)
        return res.status(400).json({status:'ERROR',message:"No se pudo Modificar el Producto",payload:[]})
    return res.status(200).json({status:'success',message:"Se ha Modificado el Producto",payload:modProdcut})
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
})



export default router;