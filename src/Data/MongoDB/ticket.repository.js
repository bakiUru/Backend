import { query } from "express";
import { ticketModel } from "./Models/ticket.models.js";

const getTickets = async (query, option)=>{
    const ticket = await ticketModel.paginate(query,options)
    return ticket
}

const getById = async (id)=>{
    return await ticketModel.findById(id)
    
}

const createTicket = async (data)=>{
    return await ticketModel.create(data)

}

const updateTicket = async (id,data) =>{
    return await ticketModel.findByIdAndUpdate(id, data, {new: true})
}

export default{
    getTickets,
    getById,
    createTicket,
    updateTicket
}