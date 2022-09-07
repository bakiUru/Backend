const fs = require('fs');
const path = './utils/products.txt';

class Contenedor {
  //Guardamos los datos en el Archivo
  saveData(data) {
    fs.promises
      .readFile(path, 'utf-8')
      .then((res) => {
        //Convierto la cadena de texto a objeto
        let dataRead = JSON.parse(res);
        //genero el nuevo ID
        let newId = 1;
        //Compruebo si el Id fue eliminado
        if (dataRead.length != 0) {
          while (
            dataRead.find((element) => {
              element.length < newId;
              console.log('ID de cada elemento: ', element.id);
              newId = element.id + 1;
            })
          );

          console.log('Nuevo id:', newId);

          data = Object.assign({ id: newId }, data);
          dataRead.push(data);
        } else {
          newId = 1;
          data = Object.assign([{ id: newId }, data]);
        }
        return dataRead;
      })
      //Escribimos en el Archivo
      .then((data) => {
        console.log('Lo que Va a Guardar: ' + data);
        fs.promises
          .writeFile(path, JSON.stringify(data, null, 2))
          .then((res) => {
            return {
              status: 'Succes',
              message: 'Escritura exitosa ' + '\n' + res,
              nuevoID: 'Producto con ID: ' + newId,
            };
          })
          .catch((error) => {
            return {
              status: 'Error',
              message: 'No se pudo escribir el Archivo' + error,
            };
          });
      })
      .catch((error) => {
        return {
          status: 'Error',
          message: 'No se pudo leer el Archivo' + error,
        };
      });
  }

  getByID(id) {
    fs.promises
      .readFile(path, 'utf-8')
      .then((data) => {
        if (data.length == 0)
          return { status: 'Error', message: 'Archivo Vacio' };
        else {
          const item = JSON.parse(data);
          item.find((element) => {
            element.id === id;
            return element;
          });
        }
        return element.length !== 0
          ? element
          : { status: 'Warning', message: 'No existe el elemento' };
      })
      .catch((err) => {
        return {
          status: 'Error',
          message: 'Problemas de lectura con el Archivo\n' + err,
        };
      });
  }
  getAll() {
    fs.promises
      .readFile(path, 'utf-8')
      .then((data) => {
        if (data.length == 0)
          return { status: 'Error', message: 'Archivo Vacio' };
        else {
          const item = JSON.parse(data);
          return item;
        }
      })
      .catch((err) => {
        return { status: 'Error', message: 'No se pudo leer el Archivo' };
      });
  }

  //TODO
  deleteByID(id){
    fs.promises.readFile(path,'utf-8')
    .then(data=>{
      dataRead = JSON.parse(data)
      return dataRead
    })
    .then(res=>{
      res.find(element=> {element.id === id
        res = res.drop()
      })
    })
  }

  deleteAll(){
    fs.promises.writeFile(path,' ')
    .then(()=>{
      return{status:'Succes', message:'Contenido Eliminado'}
    })
    .catch(err=>{
      return{status:'Error', message:'El archivo no pudo ser Borrado'+err}
    })
  }
}

const prueba = new Contenedor();

const datos = {
  title: 'vaso',
  precio: '400',
  image: 'xxxx',
};

console.log(prueba.getByID(1));
