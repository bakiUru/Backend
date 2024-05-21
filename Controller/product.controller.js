const ProductManager = require('../Utils/productManager')

const data = new ProductManager()
//Recarga los productos por alguna modificacion en tiempo de ejecucion
const reloadProducts_Controller = async()=>{
        return  data.getProducts().then(
            products => {
               // console.log(products.length)
                if (products.length>0)
                    return {message:'Tenemos Produtctos', data: products,status: 200}
                else
                    return {message:'no tenemos nada que mostrar ERROR DE CONEXION A LA BD', data: [], status:400}
            })

}


const findProducts_Controller = async (id)=>{
    let productfind = await reloadProducts_Controller()
    productfind = data.getProductsbyID(productfind.data,id)
    console.log('dentro del controller',productfind)
    console.log('longitud del controller',productfind.length)
    if(productfind.length!=0)
                return {message: `Econtramos producto ${id}`, data: productfind,status: 200}
            else
                return {message: `No se encuentra el producto ${id}, en nuestra BD`, data: [],status: 400}

}

const createProduct_Controller = async(...product)=>{
    console.log('Recibo',product)
    product.length!={}?
    product= { data: await data.productAdd(...product),status:201} : product= {message:'No se agrego el producto',data:[], status: 400}
    if (product.data?.error)
        return {data:product.data.error,status:400}
    else{
        console.log('Devuelvo',product)
        return product
    }
}


//TODO
//CONTROLADOR DE DEL Y PUT

module.exports = {reloadProducts_Controller, findProducts_Controller,createProduct_Controller};
