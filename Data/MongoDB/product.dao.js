import productModel from "./Models/product.models.js"

const getProducts = async (limit,page,asc,query)=>{
    let filter = query
    if (query!==undefined)
        {
            filter =  query.split('=')
            console.log(filter)
            //del array que me da el split, lo convierto a un Objeto con su key
            filter = Object.fromEntries([filter])
        }
    try{
        //MONGODB
        //si recibo asc 
        return asc!==undefined?
            await productModel.paginate(filter,{limit:limit?limit:10,page:page?page:1, sort: { price: asc.toLocaleLowerCase() === 'true'?1:-1}})
        :
            await productModel.paginate(filter,{limit:limit?limit:10,page:page?page:1})
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- Buscador de todos los Productos\n',e)
        return null
    }
}

const getOneProduct = async (id) =>{
    try{
        return await productModel.findById(id).populate('products.products')
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

const putProductDB = async (id,title, description, price, thumbnail, code, category, stock) =>{
    console.log(id,title, description, price, thumbnail, code, category, stock)
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

export {
    getProducts,
    getOneProduct,
    newProduct,
    delProductDB,
    putProductDB

}