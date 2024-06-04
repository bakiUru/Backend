import  express  from 'express'
import path  from 'path'
//SOCKET
import {Server} from 'socket.io'
//ROUTER
import routerProduct from './Router/products.routes.js'
import routerView from './Router/realTimeViews.routes.js'
import routerCart from './Router/cart.routes.js'
//morgan para monitorear peticiones
import morgan  from 'morgan'
//__dirname
import { __dirname } from './dirname.js'
//Para .env
import 'dotenv/config'
//Handlebars
import handlebars from 'express-handlebars'
import { reloadProducts_Controller } from './Controller/product.controller.js'

const app = express()
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

///WEBSOCKET TENGO PROBLEMAS PARA EXPORTARLO EN EL ARCHIVO
socketServer.on('connection',async (socket) => {

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

export {socketServer}