const file = require('../Data/fileManager')

class Product {
    constructor(title,description,price,thumbnail,code,category,stock)
    {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.status = true;
        this.category = category;
        this.stock = stock;
    }
    getPrice(){
        return this.price;
    }
    getDescription(){
        return this.description
    }
    getThumbnail(){
        return this.thumbnail
    } 
    getCode(){
        return this.code
    } 
    getCategory(){
        return this.category
    } 
    getStatus(){
        return this.status
    } 
    getStock(){
        return this.stock
    }
    getTitle(){
        return this.title
    }
}


class ProductManager{

    constructor(){
        this.path = file.filePath;
        this.products = [];
    }
   async productAdd(title,description,price,thumbnail,code,category,stock){
        const prod = new Product(title,description,price,thumbnail,code,category,stock)
        console.log('ID a generar ACEPTADO: ',this.idGeneration(this.products))
        if (this.products.length>0)
            {
                console.log('Hay : ',this.products.length)
                console.log('es : ',typeof(this.products))
                this.products= await file.readProduct()
                .then(data=>{
                    console.log('Al agregar, tengo estos productos',this.products)
                    return JSON.parse(data)
                })
                .catch(e =>{
                    console.error(e.message)
                })
                if (this.products.find(product => product.code === code))
                    return {error:`El Codigo del Producto ya existe --->  ${code}  NO SE INGRESO EL PRODUCTO: ${prod.title}`}
                else{
                    prod.id = this.idGeneration(this.products);
                    this.products.push(prod);
                    //Escribo en el archivo
                    await file.writeProduct(this.products)
                }
        }else{
            prod.id = this.idGeneration(this.products);
            //Es el primer producto
            this.products.push(prod);
            //Escribo en el archivo
            await file.writeProduct(this.products)
        }    

        return {title,description,price,thumbnail,code,category,stock}
    }

   async getProducts(){
    this.products = await file.readProduct()
        .then(data=>{
            return this.products = JSON.parse(data)
        })
        .catch(e =>{
            console.error(e.message)
        })

    return this.products

    }

    getProductsbyID(list,id){
    
        const product = list.find(prod => prod.id == id) 
        return  product == undefined ? [] : product

    }

   async deleteProduct({data},id){

       console.log('esto hay antes de eliminar',data)
        let product = this.getProductsbyID(data,id)
        console.log('esto devuelve al eliminar',product)
        try{
            if (product.length == 0)
                return {messageError:`Producto no encontrado para Eliminar: ID ${id}`,status:400}
            else{
                //filtro todos los productos que no coinciden con ese array
                this.products = data.filter(prod => prod.id != id)
                await file.writeProduct(this.products)
                return {message:'El producto fue Eliminado',data:{id:product.id,title:product.title},status:200}
            }
        }catch(error){
            return {message:error.message}
        }
        
    }

    async putProduct({data},id,title,description,price,thumbnail,code,stock){
        const product = this.getProductsbyID(data,id)
        try{
            if (product.length == 0)
                return {messageError:`Producto no encontrado para Modificar: ID ${id}`,status:400}
            else{
                //filtro todos los productos que no coinciden con ese array
                this.products = data.filter(prod => prod.id != id)
                //reemplazo los valores del producto
                product.title = title==null?product.title:title
                product.description = description==null?product.description:description
                product.price = price==null?product.price:price
                product.thumbnail = thumbnail==null?product.thumbnail:thumbnail
                product.code = code==null?codeproduct.code:code
                product.stock = stock==null?product.stock:stock

                //Añado el ProductoModificado
                this.products.push(product)

                await file.writeProduct(this.products)
                return {message:'El producto fue Actualizado',data:product}
            }
        }catch(error){
            return {message:error.message}
        }
        
    }
    idGeneration(list){
        let newlist = [] //lista vacia para generar ID Unico despues de Borrar Producto
        if (list.length == 0)
            return 1 //si es el primer producto retorno 1
        else{
        //obtengo solo los numero de ID
        list.map(prod=>Object.entries(prod).forEach(([key,val])=>{
            if (key === 'id')
                newlist.push(val)}))

        //Ordeno la lista de ID de forma ASC
        newlist = newlist.sort(function(a,b){return a-b})
        //recorro la lista de ID y verifico si el siguiente ID es mayor al anterior   
        //si no hay ID repetidos retorno el ultimo ID + 1
        if(Math.max(...newlist)>newlist.length)
            {
                let newId=1;
                console.log('se han borrado productos',(Math.min(...newlist)))
                if((Math.min(...newlist)-1) === 1)
                    return 1
                else{
                    newlist.forEach(num=>{
                        if(newId==num)
                            newId ++
                    })
                    console.log('Nuevo ID:',newId)
                    return newlist.find(id=>id===newId)?Math.max(...newlist)+1:newId
                }
            }
        else
            return newlist.length + 1
        }
    }
}

/*
const pM = new ProductManager()


try{

    pM.productAdd('producto prueba','es una tetera1',5484,'dsadasdasdassdad','AAA231',200)
    pM.productAdd('producto prueba','es una tetera2',11484,'dsadasdasdassdad','BBB231',2200)
    pM.productAdd('producto prueba','es una tetera3',384,'dsadasdasdassdad','CCC231',100)
   // pM.productAdd('producto prueba Clon','es una tetera3',384,'dsadasdasdassdad','CCC231',100)
}catch(e){
    console.log(e.message)
}

pM.getProducts().then(data=>{
    console.log('Todos los Productos:', data)})


console.log('Producto por ID:',pM.getProductsbyID(1))
*/
module.exports = ProductManager;