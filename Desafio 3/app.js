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
  <div style="display : grid">
    <div>
    <button style="padding = 2rem" ><a href='/productos'>Productos</a></button>
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

app.get('/productos', async (req,res)=>{
    const itemList =  await data.getAll()
    console.log(typeof(itemList))
    
    res.send(itemList.items)
})




app.get('/productoRandom',async (req,res)=>{
    const itemList =  await data.getAll()
    let numeroID =Math.round(Math.random()*((itemList.items.length)-1)+1)
    const dataItem = data.getByID(numeroID,itemList.items)
    console.log('Lista:', itemList, 'NumeroRandom:', numeroID, 'ItemEncontrado:',dataItem.Item)
    res.send( dataItem.Item)
})
