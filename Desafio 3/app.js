const express=require('express')
const Contenedor = require('./contenedor.js')



const data = new Contenedor();
const app =  express();
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{
    console.log('Servidor Corriendo, en el Puerto: ' + PORT)
} )
server.on('Error',err=>{console.log('Error  en servidor'+err)})


app.get('/',(req,res)=>{
  res.send(`<h1>Bienvenidos</h1>
  <div>
    <div>
    <button style="padding = 1rem" ><a href='/productos'>Productos</a></button>
    </div>
    <div>
    <button ><a href='/productoRandom'>Producto Random</a></button>
    </div>
</div>
  `)
})

const producto = {
    name: 'Lampara',
    price: 878,
    img: 'xxx'
}

app.get('/productos', (req,res)=>{
    res.send(data.getAll())
})

const randomID =()=>{
    return Math.round(Math.random()*(6-1)+1)

}
randomID()
app.get('/productoRandom', (req,res)=>{
    res.send(data.getByID(randomID()))
})