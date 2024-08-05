import { response,request } from "express"
import { verifyToken } from "../Utils/jsonwt.js"
import { Token_NotProvider } from "../Utils/Error/errorHandle.js"

export const validToken = async (req=request,res=response,next)=>{
    try{
        console.log('Cookies: ', req.cookies)
        const token =  req.cookies.tokenjwt
        if(!token){
            const {error,message,status} = new Token_NotProvider("No token provided")
            return res.status(status).json({payload:error + message})
        } 
        const isToken = verifyToken(token)
        if(!isToken) {return res.status(401).json({message:"Invalid token"})}
        //Asisgno los datos del token decodificado
        req.user = isToken
        next()
    }catch(e){
        if ( e instanceof TypeError)
            next(new Token_NotProvider(e.message))
    }
}