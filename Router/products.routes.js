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


router.get('/', (req, res)=>{
    res.status(allProd.status).send(allProd)
})


router.get('/:pid',async (req,res)=>{
    res.status(allProd.status).send(await findProducts_Controller(req.params.pid))

})

router.post('/',async(req,res)=>{
    const {title, description, price, thumbnail, code, stock} = req.body
    let pruebita = await createProduct_Controller(title, description, price, thumbnail, code, stock)
    console.log(pruebita)
    res.status(200).send()
    /*
    console.log('Esto es lo que recibo',req.body)
    prod.productAdd(title, description, price, thumbnail, code, stock)
    .then(data=>{ 
        console.log(data)
        if (data != undefined)
            res.status(201).send({message:'producto agregado', data:data})
        else
            throw new Error ('El producto no pudo ser Agregado')
        })
    .catch(error=>{
        res.send({message: error.message})
    })*/
    

})

router.delete('/:pid',(req,res)=>{
    prod.deleteProduct(req.params.pid)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })

  
})
router.put('/:pid',(req,res)=>{
    const {title, description, price, thumbnail, code, stock} = req.body
    prod.putProduct(req.params.pid,title, description, price, thumbnail, code, stock)
    .then(data=>{
        if (data?.messageError)
            res.send(data.messageError)
        else
            res.send(data)
    })

})



module.exports = router;