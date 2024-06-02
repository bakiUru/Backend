const routerViews =  require('express').Router()
const socketServer = require('../app.js')


routerViews.get('/add',(req,res)=>{
    res.render('products/add-product')
})
routerViews.get('/',(req,res)=>{
    //socketServer.local.emit('servidor:liveProduct','hola')
    socketServer.on('server:liveProduct','hola')

    res.status(200).send('nada en tiempo real')

})

module.exports = routerViews