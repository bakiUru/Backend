import { request, response } from "express";
import ProductManager from "../Utils/productManager.js";
import productServices from "../services/product.services.js";
import responseDto from "../dto/response.dto.js";
const data = new ProductManager();
//Recarga los productos por alguna modificacion en tiempo de ejecucion
const reloadProducts_Controller = async () => {
  return data.getProducts().then((products) => {
    // console.log(products.length)
    if (products.length > 0)
      return { message: "Tenemos Productos", data: products, status: 200 };
    else
      return {
        message: "no tenemos nada que mostrar, ERROR DE CONEXION A LA BD",
        data: [],
        status: 400,
      };
  });
};

const findProducts_Controller = async (id) => {
  let productfind = await reloadProducts_Controller();
  productfind = data.getProductsbyID(productfind.data, id);
  console.log("dentro del controller", productfind);
  console.log("longitud del controller", productfind.length);
  if (productfind.length != 0)
    return {
      message: `Econtramos producto ${id}`,
      data: productfind,
      status: 200,
    };
  else
    return {
      message: `No se encuentra el producto ${id}, en nuestra BD`,
      data: [],
      status: 400,
    };
};

const createProduct_Controller = async (...product) => {
  console.log("Recibo", product);
  product.find((element) => element !== undefined)
    ? (product = { data: await data.productAdd(...product), status: 201 })
    : (product = {
        message: "No se agrego el producto",
        data: [],
        status: 400,
      });
  if (product.data?.error) return { data: product.data.error, status: 400 };
  else {
    console.log("Devuelvo", product);
    return product;
  }
};

//Filtrado de Data Input
const filterData_Controller = (data) => {
  let { title, description, price, thumbnail, code, category, stock } = data;
  try {
    title = title ? title.toString() : undefined;
    description = description ? description.toString() : undefined;
    category = category ? category.toString() : undefined;
    thumbnail = thumbnail ? thumbnail.toString() : undefined;
    //CONTROL SI PRICE O NUMBER SON MENORES A 0-9 --- Convertirlos a un arreglo y verificar cada posicion si es mayor o menor a 0-9 usar exresiones regulares
    if (!Number.isInteger(price) && price !== undefined) {
      price = price.split("");
      price.forEach((element) => {
        if (!/^[0-9]+$/.test(element))
          throw new Error(
            `Precio no es una entrada valida, error encontrado: ${element}`
          );
      });
      price = Number.parseInt(price.join(""));
    }
    if (!Number.isInteger(stock) && stock !== undefined) {
      stock = stock.split("");
      stock.forEach((element) => {
        if (!/^[0-9]+$/.test(element))
          throw new Error(
            `Stock no es una entrada valida, error encontrado: ${element}`
          );
      });
      stock = Number.parseInt(stock.join(""));
    }

    return {
      title,
      description: description,
      price: price ? price : undefined,
      thumbnail,
      code,
      category: category,
      stock: stock ? stock : undefined,
    };
  } catch (e) {
    console.log(e.message);
    return { message: e.message, data: [], status: 400 };
  }
};

//TODO
//CONTROLADOR DE DEL Y PUT /////////////////////////////////////////////////////////////////////////
//ARQUITECTURA REPOSITORY
const getAllProducts = async (req = request, res = response) => {
    const { limit, page, asc, query } = req.query;
    let filter = query;
    const options = {
        limit: limit ? limit : 10,
        page: page ? page : 1,
        sort: { price: asc === "true" ? 1 : -1 },
    }

    if (query !== undefined) {
        filter = query.split("=");
        console.log(filter);
        //del array que me da el split, lo convierto a un Objeto con su key
        filter = Object.fromEntries([filter]);
    }
    try {
    //MONGODB
    let allProd_DB = []
    //si recibo asc
    if (asc !== undefined)
        allProd_DB= await productServices.getAllProducts(filter, options)
    else 
        allProd_DB=await productServices.getAllProducts(filter, {limit: limit ? limit : 10,page: page ? page : 1,});
    
    allProd_DB.totalDocs>0?
        res.status(200).json({
        status:'succes',
        payload:allProd_DB.docs.map(doc=>responseDto.resProduct(doc)),
        totalPages: allProd_DB.totalPages,
        page: allProd_DB.page,
        pagingCounter: allProd_DB.pagingCounter,
        hasPrevPage: allProd_DB.hasPrevPage,
        hasNextPage: allProd_DB.hasNextPage,
        prevLink: allProd_DB.prevPage,
        nextLink: allProd_DB.nextPage
    })
    :
    res.status(404).json({status:'error',payload:[],message:"No hay productos"})
    } catch (e) {
    console.log("MANEJO DE ERROR -- Buscador de todos los Productos\n", e);
    return null;
  }
};

const addProduct = async (req = request, res = response) => {
  const { title, description, price, thumbnail, code, category, stock } =
    filterData_Controller(req.body);
  //MONGO DB
  const newProductDB = await productServices.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    stock
  );
    console.log(newProductDB);
    if (!newProductDB)
    return res.status(400).json({
        status: "ERROR",
        message: "No se pudo crear el Producto",
        payload: [],
      });
    return res.status(200).json({
      status: "success",
      message: "Se ha creado el Producto",
      payload: responseDto.resProduct(newProductDB),
    });
};

const getOneProduct = async (req = request, res = response) => {
    const { pid } = req.params;
    console.log('ID del producto',pid)
    try {
    const product = await productServices.getOneProduct(pid);
    if (!product)
    return res.status(404).json({ message: "Producto no encontrado", data: [], status: 404 })

    return res.json( {status: "success",
      message: "Se ha encontrado el Producto",
      payload: responseDto.resProduct(product)});
  } catch (e) {
    console.log("MANEJO DE ERROR -- Buscador de un producto\n", e);
    return res.status(404).json({ message: "Producto no encontrado", data: [], status: 404 })
  }
};

const updateProduct = async (req = request, res = response) => {
    const { pid } = req.params;
    const { title, description, price, thumbnail, code, category, stock } =filterData_Controller(req.body);
    //MONGO DB
    let modProduct = await productServices.getOneProduct(pid)
    console.log("Producto a Modificar", modProduct);
    if (!modProduct)
    return res.status(400).json({
        status: "error",
        message: "No se pudo Encontrar el Producto a Modificar",
        payload: [],
      });
    modProduct = await productServices.updateProduct(
      pid,
      title, 
      description, 
      price, 
      thumbnail, 
      code, 
      category, 
      stock 
    )
    modProduct? res.status(200).json({
        status: "success",
        message: "Se ha Modificado el Producto",
        payload: responseDto.resProduct(modProduct),
    })
    :
    res.status(400).json({
      status: "error",
      message: "No se pudo Modificar el Producto",
      payload: [],
    });
};

const deleteProduct = async (req = request, res = response) => {
  //Falta control de Error
  const { pid } = req.params;
  const deletedProduct = await productServices.deleteProduct(pid);
  console.log("DELETE ROUTES", deletedProduct);
  if (!deletedProduct)
    return res.status(400).json({
        status: "ERROR",
        message: "No se pudo Borrar el Producto",
        payload: [],
    });
    return res.status(200).json({
        status: "success",
        message: "Se ha Borrado el Producto",
        payload: responseDto(deletedProduct),
    });
};

export {
        //Data Services
        reloadProducts_Controller,
        findProducts_Controller,
        createProduct_Controller,
        filterData_Controller,
        //METODOS
        getAllProducts,
        addProduct,
        getOneProduct,
        updateProduct,
        deleteProduct,
};
