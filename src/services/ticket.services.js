import { ticketModel } from "../Data/MongoDB/Models/ticket.models.js"
import ticketRepository from "../Data/MongoDB/ticket.repository.js"

const newTicket = async (email, totalCart)=>{
    const newOne = {
        amount : totalCart,
        purchaser : email,
        code: Math.random().toString(36).substr(2,9)
    }

    const ticket = await ticketRepository.createTicket(newOne)
    return ticket
}

export default {newTicket}