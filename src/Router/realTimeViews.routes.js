import express from 'express'
import { socketServer } from '../app.js'
import { reloadProducts_Controller } from '../Controller/product.controller.js'
//import { getViews, createView, updateView, deleteView } from '../Controller/viewsController.js'

const routerViews=express.Router()
routerViews.get('/add',(req,res)=>{
    res.render('products/add-product')
})
routerViews.get('/',(req,res)=>{
    
    socketServer.on('cliente:liveProduct',data=>{
        console.log(data)
    })
    socketServer.sockets.emit('server:liveProduct','hola desde aca')
    reloadProducts_Controller()
    .then(data=>{
        console.log('voy a cargar')
        const products = data.data.reverse()
        socketServer.emit('server:liveProduct',data.data)
        res.render('products/realTime-products',{ products })
    }).catch(e=>{
        console.log(e) 
    })


})

export default routerViews