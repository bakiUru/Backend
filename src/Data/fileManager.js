const fs = require('node:fs/promises')
const {existsSync} = require('fs')
const filePath = __dirname+'/productosBD.txt'


//Estudiar con Generadores
const  readProduct = async () =>{
    if (existsSync(filePath))
        {
            try{
                const data = await fs.readFile(filePath, {encoding: 'utf-8'})
                if (!data)
                    return [] 
                return data
            }catch(e){
                console.log(`Error al leer el archivo ${e.message}`)
            }finally{
                console.log('Termino la Promesa de Lectura')
            }
        }
        else{
            console.log('donde estAS???',__dirname)

            //Crea Nuevo Archivo
            try{
                await fs.writeFile(filePath,'[]',{flag:'w+'}).then(()=>{return {message:'Archivo Creado'}})
            }catch(e){
                console.log(e.message)
            }
        }
}
const  writeProduct = async (prod = '-') =>{
    try{
        await fs.writeFile(filePath,JSON.stringify(prod), {flag: 'w+'}) //a+ escribe y lee en la ultima posicion // w+ escribe y lee desde el principio
    }catch(e){
        console.log(e.message)
    }finally{
        console.log('Termino la Promesa de Escritura')
    }
}
//Pruebas
/*
readProduct()    
writeProduct()
readProduct()
*/
module.exports = {readProduct,writeProduct,filePath}