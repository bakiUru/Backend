import mongoose, { Schema } from "mongoose";
import mogoosePaginate  from "mongoose-paginate-v2";

const ticketCollection = 'ticket' 

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true
        },
    puschase_time: {
        type: Date, 
        default:Date.now()
    },
    amount:{
        type: Number,
        required: true
        },
    purchaser: {
        type: String,
        required: true
    }
    
})
ticketSchema.plugin(mogoosePaginate)
export const ticketModel = mongoose.model(ticketCollection,ticketSchema)