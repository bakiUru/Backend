import cartServices from '../services/cart.services.js'
import productServices from '../services/product.services.js'
import { request,response } from "express"
import ticketServices from '../services/ticket.services.js'
import responseDto from '../dto/response.dto.js'


const createCart = async (req=request,res=response)=>{
    try {
        const newCart = await cartServices.createCart()
        res.status(200).json({messages: 'Success', payload: newCart})
    }   
    catch(error){
    console.error(error)
    res.status(500).json({message:'Error, al Crear el carrito',error})
    }
}

const getCart = async (req = request , res=response)=>{
    const {cid} = req.params
    try{
        const cart = await cartServices.getCart(cid)
        res.status(200).json({messages: 'Success', payload: cart})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error, al obtener el carrito',error})
        }
}

const addProductCart = async(req = request , res=response)=>{
    const {cid,pid} = req.params
    const {quantity} = req.query

    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const product = await productServices.getOneProduct(pid)
        if(!product)
            return res.status(404).json({message:'Producto no encontrado'})
        const newCart = await cartServices.addProductCart(cid,pid,quantity)
        res.status(200).json({messages: 'Success', payload: newCart})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:'Error,  al Agregar producto al carrito',error})
    }
}
const deleteProductCart = async (req = request , res=response)=>{
    const {cid,pid} = req.params
    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const product = await productServices.getOneProduct(pid)
        if(!product)
            return res.status(404).json({message:'Producto no encontrado'})
        const newCart = await cartServices.deleteProductCart(cid,pid)
        res.status(200).json({messages: 'Success', payload: newCart})
    } catch(error){
        console.error(error)
        res.status(500).json({message:'Error,  al Borrar producto al carrito',error})
    }
}
const deleteCart= async (req = request , res=response)=>{
    const {cid} = req.params
    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const newCart = await cartServices.deleteCart(cid)
        res.status(200).json({messages: 'Success', payload: newCart})
    } catch(error){
    console.error(error)
    res.status(500).json({message:'Error,  al Borrar el carrito',error})
    }
}
const emptyCart = async (req = request , res=response)=>{
    const {cid} = req.params
    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const newCart = await cartServices.emptyCart(cid)
        res.status(200).json({messages: 'Success', payload: newCart})
    } catch(error){
    console.error(error)
    res.status(500).json({message:'Error,  al Vaciar el carrito',error})
    }
}

const updateQuantityCart= async (req = request , res=response)=>{
    const {cid,pid} = req.params
    const {quantity} = req.body
    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const product = await productServices.getOneProduct(pid)
        if(!product)
            return res.status(404).json({message:'Producto no encontrado'})
        const newCart = await cartServices.updateQuantityCart(cid,pid,quantity)
        res.status(200).json({messages: 'Success', payload: newCart})
    } catch(error){
        console.error(error)
        res.status(500).json({message:'Error,  al Actualizar la Cantidad del Producto',error})
    }
}

const purchaseController = async (req=request,res=response)=>{
    const {cid} = req.params
    console.log('Quien esta logueado',req.user)
    try{
        const cart = await cartServices.getCart(cid)
        if(!cart)
            return res.status(404).json({message:'Carrito no encontrado'})
        const total = await cartServices.purchase(cid)
        console.log('Quien esta logueado2',req.user)
        const ticket = await ticketServices.newTicket(req.user.email,total)
        res.status(200).json({messages: 'Success', payload: responseDto.resTicket(ticket)})
        } catch(error){
            console.error(error)
            res.status(500).json({message:'Error,  al Realizar la Compra',error})
                }
}

export {
    createCart,
    getCart,
    addProductCart,
    deleteProductCart,
    deleteCart,
    emptyCart,
    updateQuantityCart,
    purchaseController
}