const express = require('express')
const path = require('path')
const app = express()
//SOCKET
const {Server} = require('socket.io')
//ROUTER
const routerProduct = require('./Router/products.routes')
const routerView = require('./Router/realTimeViews.routes')
const routerCart = require('./Router/cart.routes')
//morgan para monitorear peticiones
const morgan = require('morgan')
//Para .env
require('dotenv').config()
//Handlebars
const handlebars = require('express-handlebars')
const { reloadProducts_Controller } = require('./Controller/product.controller')

const PORT = process.env.PORT || 3000

const httpServer  =  app.listen(PORT, ()=>{
        console.log(`Server escuchando en el puerto ${PORT}`)
    })

const socketServer = new Server(httpServer)

//morgan en desarrollo
app.use(morgan('dev'))

//MOTOR DE PLANTILLA
//Config Handlebars
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'hbs')

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials')
}))

app.use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/api/products',routerProduct)
    .use('/api/upd_product',routerView)
    .use('/api/cart',routerCart)
    .use('/realtimeproducts',routerView)


//TODO RUTA STATIC
app.use(express.static(path.join(__dirname,'public')))


app.get('/',(req,res)=>{

    res.render('home')

})

///WEBSOCKET 
socketServer.on('connection', (socket) => {

    reloadProducts_Controller()
    .then(data=>{
        socket.emit('loadProducts',data.data)
        
    }).catch(e=>{
        console.log(e) 
    })
    console.log('New client connected',socket.id);

    socket.broadcast.emit('connectUser',socket.id)
    socket.on('message', data =>{
        console.log(data)
    })
})

module.exports = socketServer