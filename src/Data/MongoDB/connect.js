import {connect} from 'mongoose'
import { firstSeed } from './firstSeed.js'

export const connectDB = async (MONGO_URI,MONGO_DB) => {  
    try{
        await connect(MONGO_URI,{dbName:MONGO_DB})
        console.log('Connected to MongoDB')
        firstSeed()
    }
    catch(error){
        console.log(error)
    }

}

