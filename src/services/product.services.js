import productRepository from "../Data/MongoDB/product.repository.js"



const getAllProducts = async (query,options)=>{
    return await productRepository.getProducts(query,options)

}
const addProduct = async (title, description, price, thumbnail, code, category, stock)=>{
    return await productRepository.newProduct(title, description, price, thumbnail, code, category, stock)
}
const getOneProduct = async (id)=>{
    return await productRepository.getOneProduct(id)
}
const updateProduct = async (id,title, description, price, thumbnail, code, category, stock)=>{
    return await productRepository.putProductDB(id,title, description, price, thumbnail, code, category, stock)
}
const deleteProduct = async (id)=>{
    return await productRepository.delProductDB(id)
}

export default{
    getAllProducts,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
}