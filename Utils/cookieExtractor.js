import { Cookie_NotFound } from "./Error/errorHandle.js";

export const cookieExtractor = (req,name)=>{
    const token = req.cookies;
    console.log(name)
    console.log('Extrayendo Tokens:', token.hasOwnProperty(name))
    if (!token.hasOwnProperty(name)) 
        throw new Cookie_NotFound("No Cookie provided")

    return token[name]
}