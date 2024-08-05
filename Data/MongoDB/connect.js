import {connect} from 'mongoose'
import { firstSeed } from './firstSeed.js'
import envs from '../../Config/env.config.js';
import 'dotenv/config'
const MAX_ATTEMPTS = 3;
const TIMEOUT = 5000;


export const connectDB = async () => {  
    await connect(envs.MONGO_URL,{dbName:envs.MONGO_DB})
    .then(db=>{
        db.connection.listCollections().then(
            collections => collections.map(collection=>console.log(collection.name))
        )
    }).catch(e=>{throw e})
    console.log('Connected to MongoDB')
    console.log('Collections Name:')
   // firstSeed()
    
}

//Funcion de reconexion de BD
export const connectRetryDB = async ()=>{
    //inicializo los intentos de conexion
    let attempts = 0
    while (attempts< MAX_ATTEMPTS){
        try{
            const db = await connectDB()
            return db
        }
        catch (e){
            //voy incrementando los intentos del centinela del while 
            attempts ++
            console.log(`Failed to connect to MongoDB attempt: ${attempts}. Retrying in ${TIMEOUT/1000}s...`);
            await new Promise (resolve => setTimeout(resolve,TIMEOUT));
            if (MAX_ATTEMPTS == attempts)
            {
                console.log('Failed to connect to MongoDB after max attempts');
                throw e
            }
            
        }
    }
}
