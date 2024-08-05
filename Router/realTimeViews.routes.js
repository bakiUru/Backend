import express from 'express'
import { socketServer } from '../app.js'
import { reloadProducts_Controller } from '../Controller/product.controller.js'
//import { getViews, createView, updateView, deleteView } from '../Controller/viewsController.js'

const routerViews=express.Router()
routerViews.get('/add',(req,res)=>{
    res.render('products/add-product')
})
routerViews.get('/',(req,res)=>{
    
    socketServer.emit('liveProduct','hola desde aca')
    reloadProducts_Controller()
    .then(data=>{
        console.log('voy a cargar')
        const products = data.data.reverse()
        //EL ERROR ESTA EN QUE CUANDO RENDERIZAS PERDES EL CONSOL DESDE EL CLIENTE, LO ULTIMO QUE HACE ES RENDERIZAR EL DOM
        //res.render('products/realTime-products',{ products })
        socketServer.emit('liveProduct1',products=>{
            res.render('products/realTime-products',{ products })
        })

            socketServer.on('cliente:liveProduct',data=>{
                console.log(data)
            })
    
    }).catch(e=>{
        console.log(e) 
    })


})

export default routerViews