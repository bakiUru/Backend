import  express  from 'express'
import path  from 'path'
//Conexion Mongo
import {connectRetryDB} from './Data/MongoDB/connect.js'
//Sesiones en MONGO

//SOCKET
import {Server} from 'socket.io'
//ROUTER
import routerProduct from './Router/products.routes.js'
import routerView from './Router/realTimeViews.routes.js'
import routerCart from './Router/cart.routes.js'
import routerUser from './Router/user.routes.js'
import routerSession from './Router/sessions.routes.js'
//morgan para monitorear peticiones
import morgan  from 'morgan'
//__dirname
import { __dirname } from './dirname.js'
//Para .env
import 'dotenv/config'
//Handlebars
import handlebars from 'express-handlebars'
import { reloadProducts_Controller } from './Controller/product.controller.js'
import { initializePassport } from './Config/passport.config.js'
import session from 'express-session'
import passport from 'passport'
import envs from './Config/env.config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const PORT = envs.PORT || 3000


const httpServer  =  app.listen(PORT, async()=>{
        console.log(`Server escuchando en el puerto ${PORT}`)
        //conexion a la BD
        try{
            await connectRetryDB()
        }catch(e)
        {
            console.log(e)
        }


    })

export const socketServer = new Server(httpServer)

//morgan en desarrollo
app.use(morgan('dev'))
app.use(cors())
//Cookie
app.use(cookieParser())

//MOTOR DE PLANTILLA
//Config Handlebars
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'hbs')

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials')
}))

//SESSION

app.use(session({
    secret: envs.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
    cookie: {secure:true}
}))
//PASSPORT
initializePassport()
app.use(passport.initialize())
.use(passport.session())

//RUTAS
app.use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/api/products',routerProduct)
    .use('/api/upd_product',routerView)
    .use('/api/cart',routerCart)
    .use('/realtimeproducts',routerView)
    .use('/api/user',routerUser)
    .use('/api/session', routerSession)
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
    socket.emit('liveProduct','sorete')
    socket.broadcast.emit('connectUser',socket.id)
    socket.on('message', data =>{
        console.log(data)
    })
})

