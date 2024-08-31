import { Cookie_NotFound, Token_Empty } from "./Error/errorHandle.js";

export const cookieExtractor = (req,name)=>{
    const token = req.cookies;
    console.log(name)
    console.log('!!!',token)
    try{
        console.log('Extrayendo Tokens:', token.hasOwnProperty(name))
        if (!token.hasOwnProperty(name)) 
            throw new Cookie_NotFound("No Cookie provided")

    }catch(error){
        console.log(error.message)
        throw new Token_Empty('No session Found')
    }

    return token[name]
}