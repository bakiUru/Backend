const fs = require("fs");
const path = "./products.txt";

class Contenedor {
  //Guardamos los datos en el Archivo
  saveData(data) {
    fs.promises
      .readFile(path, "utf-8")
      .then((res) => {
        //Convierto la cadena de texto a objeto
        console.log(res);
        let dataRead = JSON.parse(res);
        console.log(dataRead);
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
          console.log(dataRead);
          dataRead.push({ id: 1, ...data });
          console.log("Primer Articulo: " + dataRead);
          //Escribimos en el Archivo por primera vez
          fs.promises
            .writeFile(path, JSON.stringify(dataRead, null, 2))
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
      })
      .catch(() => {
        fs.promises.writeFile(path, "[]");
      })
      .then(() => {
        return console.log({
          status: "Succes",
          message: "El archivo Fue Creado en: " + path,
        });
      })
      .catch((err) => {
        return console.log({
          status: "Error",
          message: "El archivo no Pudo ser Creado " + err,
        });
      });
  }

  getByID(id,data) {
        if (data.length === 0)
          return ({ status: "Error", message: "Archivo Vacio" });
        else {
          let itemFind = data.find((element) => element.id === id);
          if (itemFind)
            return ({ status: "Succes", Item: itemFind })                               
          else
            return ({
              status: "Warning",
              message: "No existe el elemento",
            });
        }
  } 
   getAll = async() =>{
    try{
      const data = await fs.promises.readFile(path, "utf-8")
           if (data.length == 0)
             return console.log({ status: "Error", message: "Archivo Vacio" });
           else {
             const items = JSON.parse(data);
            return ({ status: "Succes", items: items })
           }
    }
      catch(err){
        return ({
          status: "Error",
          message: "No se pudo leer el Archivo" + err,
        });
      };
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
      .writeFile(path, "[]")
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

module.exports = Contenedor;
const fs = require("fs");
const path = "./products.txt";

class Contenedor {
  //Guardamos los datos en el Archivo
  saveData(data) {
    fs.promises
      .readFile(path, "utf-8")
      .then((res) => {
        //Convierto la cadena de texto a objeto
        console.log(res);
        let dataRead = JSON.parse(res);
        console.log(dataRead);
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
          console.log(dataRead);
          dataRead.push({ id: 1, ...data });
          console.log("Primer Articulo: " + dataRead);
          //Escribimos en el Archivo por primera vez
          fs.promises
            .writeFile(path, JSON.stringify(dataRead, null, 2))
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
      })
      .catch(() => {
        fs.promises.writeFile(path, "[]");
      })
      .then(() => {
        return console.log({
          status: "Succes",
          message: "El archivo Fue Creado en: " + path,
        });
      })
      .catch((err) => {
        return console.log({
          status: "Error",
          message: "El archivo no Pudo ser Creado " + err,
        });
      });
  }

  getByID(id,data) {
        if (data.length === 0)
          return ({ status: "Error", message: "Archivo Vacio" });
        else {
          let itemFind = data.find((element) => element.id === id);
          if (itemFind)
            return ({ status: "Succes", Item: itemFind })                               
          else
            return ({
              status: "Warning",
              message: "No existe el elemento",
            });
        }
  } 
   getAll = async() =>{
    try{
      const data = await fs.promises.readFile(path, "utf-8")
           if (data.length == 0)
             return console.log({ status: "Error", message: "Archivo Vacio" });
           else {
             const items = JSON.parse(data);
            return ({ status: "Succes", items: items })
           }
    }
      catch(err){
        return ({
          status: "Error",
          message: "No se pudo leer el Archivo" + err,
        });
      };
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
      .writeFile(path, "[]")
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

module.exports = Contenedor;
