const router = require('express').Router()
const {reloadProducts_Controller,findProducts_Controller,createProduct_Controller} = require('../Controller/product.controller')
const ProductManager = require('../Utils/productManager')



const prod = new ProductManager()
let allProd

router.get('/',async (req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next()
})

router.get('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})

router.delete('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        console.log(allProd)
    }catch(error)
    {
        console.log(error)
    }
    next();
})
router.put('/:pid',async(req,res,next)=>{
    try{
        allProd = await reloadProducts_Controller()
        console.log(allProd)
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
    const {title, description, price, thumbnail, code, category, stock} = req.body
    let newProduct = await createProduct_Controller(title, description, price, thumbnail, code, category, stock)
    
    res.status(newProduct.status).send(newProduct.data)
})

router.delete('/:pid',(req,res)=>{
    prod.deleteProduct(allProd,req.params.pid)
    .then(data=>{
        console.log(data)
        if (data?.messageError)
            res.status(data.status).send(data.messageError)
        else
            res.status(data.status).send(data)
    })

  
})
router.put('/:pid',(req,res)=>{
    const {title, description, price, thumbnail, code, category, stock} = req.body
    prod.putProduct(allProd,req.params.pid,title, description, price, thumbnail, code, category, stock)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })

})



module.exports = router;