const fs = require("fs");
const path = "./utils/products.txt";

class Contenedor {
  //Guardamos los datos en el Archivo
  saveData(data) {
    
    fs.promises.readFile(path, "utf-8")
    .then((res) => {
      //Convierto la cadena de texto a objeto
      console.log(res)
      let dataRead = JSON.parse(res);
      console.log(dataRead)
      //genero el nuevo ID
      let newId = 1;
      //Compruebo si el Id fue eliminado
      if (dataRead.length != 0) {
        while (dataRead.find((element) => element.id === newId)) {
          newId++;
          console.log("Testeando ID:", newId);
        }
        console.log("Nuevo id:", newId);
        data = Object.assign({ id: newId }, data);
        dataRead.push(data);

        //Escribimos en el Archivo
        fs.promises
          .writeFile(path, JSON.stringify(dataRead, null, 2))
          .then(() => {
            return console.log({
              status: "Succes",
              message: "Escritura exitosa Producto Agregado",
              nuevoID: "El nuevo ID: " + newId,
            });
          })
          .catch((error) => {
            return console.log({
              status: "Error",
              message: "No se pudo escribir el Archivo " + error,
            });
          });
      } else {
        newId = 1;
        console.log('1'+dataRead)
        dataRead.push(({ id: newId }, data));
        console.log(dataRead)
        //Escribimos en el Archivo por primera vez
        fs.promises
          .writeFile(path, JSON.stringify( dataRead, null, 2))
          .then(() => {
            return console.log({
              status: "Succes",
              message: "Escritura exitosa Producto Agregado",
            });
          })
          .catch((error) => {
            return console.log({
              status: "Error",
              message: "No se pudo escribir el Archivo " + error,
            });
          });
      }
    }).catch(err=>{
      return console.log({status:'Error', message:'El archivo no Existe o esta Corrupto ' + err})
    })
          

 
      
  
  }

  getByID(id) {
    fs.promises
      .readFile(path, "utf-8")
      .then((data) => {
        data = JSON.parse(data);
        if (data.length === 0)
          return console.log({ status: "Error", message: "Archivo Vacio" });
        else {
          let itemFind = data.find((element) => element.id === id);
          if (itemFind)
            return console.log({ status: "Succes", Item: itemFind });
          else
            return console.log({
              status: "Warning",
              message: "No existe el elemento",
            });
        }
      })
      .catch((err) => {
        return console.log({
          status: "Error",
          message: "Problemas de lectura con el Archivo\n" + err,
        });
      });
  }
  getAll() {
    fs.promises
      .readFile(path, "utf-8")
      .then((data) => {
        if (data.length == 0)
          return console.log({ status: "Error", message: "Archivo Vacio" });
        else {
          const items = JSON.parse(data);
          return console.log({ status: "Succes", items: items });
        }
      })
      .catch((err) => {
        return console.log({
          status: "Error",
          message: "No se pudo leer el Archivo\n" + err,
        });
      });
  }

  deleteByID(id) {
    fs.promises
      .readFile(path, "utf-8")
      .then((data) => {
        const dataRead = JSON.parse(data);
        return dataRead;
      })
      .then((res) => {
        let resAct = res.filter((element) => element.id !== id);
        if (resAct.length === res.length)
          return console.log({
            status: "Warning",
            message: "No se Encontro el Item, ID: " + id + " Inconrrecto",
          });
        else
          fs.promises
            .writeFile(path, JSON.stringify(resAct, null, 2))
            .then(() => {
              return console.log({
                status: "Succes",
                message: "Item Eliminado... ID: " + id,
              });
            })
            .catch((err) => {
              return console.log({
                status: "Error",
                message: "El Item no pudo ser Borrado \n",
                err,
              });
            });
      });
  }

  deleteAll() {
    fs.promises
      .writeFile(path, '[]')
      .then(() => {
        return { status: "Succes", message: "Contenido Eliminado" };
      })
      .catch((err) => {
        return {
          status: "Error",
          message: "El archivo no pudo ser Borrado" + err,
        };
      });
  }
}

module.exports =Contenedor;

