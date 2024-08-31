import productModel from "./Models/product.models.js"

const getProducts = async (query, options)=>{
    try{
        //MONGODB
        //si recibo asc 
        return await productModel.paginate(query,options)
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- Buscador de todos los Productos\n',e)
        return null
    }
}

const getOneProduct = async (id) =>{
    try{
        return await productModel.findById(id)
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- buscador de Producto POR ID\n',e)
        return null
    }
}

const newProduct = async (title, description, price, thumbnail, code, category, stock)=>{
    try{
        return await productModel.create({title, description, price, thumbnail, code, category, stock,status:(stock>0)? true : false })
    }
    catch(e)
    {
        console.log('MANEJO DE ERROR -- Creador de Producto\n',e)
        //error PERSONALIZADO
        return null
    }
}

const delProductDB = async (id)=>{
    try{
        return await productModel.findByIdAndDelete(id)
        .then(data=>{
            !data?
                null
            :
            console.log('hay esto para borrar',data)
            return data
        })

    }catch(e){
        console.log('MANEJO DE ERROR -- Borrar Producto por ID\n',e)
        return null
    }
}

const updateStock = async (id,option)=>{
    try{
        return await productModel.findByIdAndUpdate(id,option,{new:true})
        }catch(e)
        {
            console.log('MANEJO DE ERROR -- Actualizar Stock\n',e)
            return null
            }
}

const putProductDB = async (id,title, description, price, thumbnail, code, category, stock) =>{
    try{
        return await productModel.findByIdAndUpdate(id,{title, description, price, thumbnail, code, category, stock})
        .then(data=>{
            !data?
            null
            :
            console.log('se Actualizo',data)
            return productModel.findById(id)
            .then(data=> data)
            
        })
    }
    catch(e){
        console.log('MANEJO DE ERROR -- Modificacion de Producto por ID\n',e)
        return null
    }

     
}

export default {
    getProducts,
    getOneProduct,
    newProduct,
    delProductDB,
    putProductDB,
    updateStock

}