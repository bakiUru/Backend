const fs = require("fs");
const path = "./utils/products.txt";

class Contenedor {
  //Guardamos los datos en el Archivo
  saveData(data) {
    fs.promises
      .readFile(path, "utf-8")
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
              console.log("ID de cada elemento: ", element.id);
              newId=element.id +1;
            })
          );

          console.log("Nuevo id:", newId); 
          
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
        console.log("Lo que Va a Guardar: " + data);
        fs.promises
          .writeFile(path, JSON.stringify(data, null, 2))
          .then((res) => {
            return {
              status: "Succes",
              message: "Escritura exitosa " + "\n" + res,
            };
          })
          .catch((error) => {
            return {
              status: "Error",
              message: "No se pudo escribir el Archivo" + error,
            };
          });
      })
      .catch((error) => {
        return {
          status: "Error",
          message: "No se pudo leer el Archivo" + error,
        };
      });
  }


}

const prueba = new Contenedor();

const datos = {
  title: "vaso",
  precio: "400",
  image: "xxxx",
};

prueba.saveData(datos);
