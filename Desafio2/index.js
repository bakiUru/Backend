const Contenedor = require('./contenedor.js')

const prueba = new Contenedor();

const datos = {
  title: "Olla",
  precio: "400",
  image: "xxxx",
};

//Pruebas
console.log("Agrega Item");
prueba.saveData(datos);
//console.log('Eliminar por ID')
//prueba.deleteByID(13)
//console.log('Muestra Toda la Lista')
//prueba.getAll()
//console.log('Muestra Item por ID')
//prueba.getByID(13)

//console.log('Eliminar Todos los Items')
//prueba.deleteAll()