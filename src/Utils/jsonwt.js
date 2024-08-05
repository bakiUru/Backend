import jwt from 'jsonwebtoken'
import 'dotenv/config'
import envs from '../Config/env.config.js'


export const createToken = user =>{
    const {_id,email,role} = user
    try{
        const tkn = jwt.sign({_id,email,role}, envs.SECRET_CODE_JWT, {algorithm: "HS256", expiresIn:'1h'})
        return tkn
    }catch(e){
        console.log(e)
        return e.name
    }
}

export const verifyToken = token =>{
    try {
        const decoded = jwt.verify(token, envs.SECRET_CODE_JWT)
        return decoded
    } catch (error) {
        //Manejo de errores de Jwt
        console.log(error.name)
        return null
    }
}