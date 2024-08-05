import ProductManager from '../Utils/productManager.js'

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
    product.find(element=>element!==undefined)?
    product= { data: await data.productAdd(...product),status:201} : product= {message:'No se agrego el producto',data:[], status: 400}
    if (product.data?.error)
        return {data:product.data.error,status:400}
    else{
        console.log('Devuelvo',product)
        return product
    }
}


//Filtrado de Data Input
const filterData_Controller = (data)=>{
    let {title, description, price, thumbnail, code, category, stock} = data
    try{
        title=title?title.toString():undefined
        description=description?description.toString():undefined
        category=category?category.toString():undefined
        thumbnail=thumbnail?thumbnail.toString():undefined
        //CONTROL SI PRICE O NUMBER SON MENORES A 0-9 --- Convertirlos a un arreglo y verificar cada posicion si es mayor o menor a 0-9 usar exresiones regulares
        if(!Number.isInteger(price) && price !== undefined)
            {
                price = price.split('')
                price.forEach(element => {
                    if (!/^[0-9]+$/.test(element)) 
                        throw new Error (`Precio no es una entrada valida, error encontrado: ${element}`)       
            })
            price=Number.parseInt(price.join(''))
        }
        if(!Number.isInteger(stock) && stock !== undefined)
            {
                stock = stock.split('')
                stock.forEach(element => {
                    if (!/^[0-9]+$/.test(element)) 
                        throw new Error (`Stock no es una entrada valida, error encontrado: ${element}`)        
            })
            stock=Number.parseInt(stock.join(''))
        }
        
        return {title, description:description,price:price?price:undefined, thumbnail, code, category:category, stock:stock?stock:undefined}
    }catch(e){
        console.log(e.message)
        return {message:e.message,data:[],status:400}
    }
    
}

//TODO
//CONTROLADOR DE DEL Y PUT

export  {reloadProducts_Controller, findProducts_Controller,createProduct_Controller,filterData_Controller};
