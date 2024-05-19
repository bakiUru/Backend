const express = require('express')
const app = express()
const router = require('./Router/products.routes')
require('dotenv').config()

const PORT = process.env.PORT || 3000


app.use(express.json())
    .use(express.urlencoded({extended: true}))
    .use('/api/products',router)
    .use('/api/products/:id',router)



app.listen(PORT, ()=>{
    console.log(`Server escuchando en el puerto ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send(`<h1>Busqueda de PRODUCTOS</h1>
    <br>
    <br>
    <li><a href=http://127.1.0.0:${PORT}/products>Listar Todos los Productos</a></li>
    <br>
    <br>

    `)
})
