import { Server_Error, User_AuthError, User_LengthError, User_NullValueError } from "../Utils/Error/errorHandle.js"
const MIN_LENGTH_String = 3
const MIN_LENGTH_PASS = 8
const REGEX_ATTACK_EXP = /<script[^>]*>(.*?)<\/script>/gi


export const dataAttack_Controller = (req,res,next)=>{
        // Validación de ataques
        Object.entries(req.body).forEach(([key,value] )=> {
            if(key!=='age' && value.match(REGEX_ATTACK_EXP))
            {
            console.log('ATACANDOOOO',req.ip)
            throw new Server_Error('No se permiten ataques')
            }
            //para los valores que no son STRING
            if(value.toString().match(REGEX_ATTACK_EXP))                              
                throw new Server_Error('No se permiten ataques')
        })
    next()
}

export const userData_Controller = (req,res,next) =>{
    const {first_name,last_name,email,age,password,role} = req.body
    try{
        if(!first_name || !last_name || !email || !age || !password )
            throw new User_NullValueError('Hay campos que estan Vacios')
        if(first_name.length < MIN_LENGTH_String || last_name.length < MIN_LENGTH_String ) 
            throw new User_LengthError('El Nombre o Apellido debe tener mas de 3 caracteres')
        if(password.length < MIN_LENGTH_PASS)
            throw new User_LengthError('La Contraseña debe tener mas de 8 caracteres')
        next()
    }catch(e){
        next(e)
    }

}

export const userLogin_Controller = (req,res,next)=>{
    const {email,password} = req.body
    try{
        if(!email || !password)
                throw new User_NullValueError('Credenciales Vacias')
        next()
    }catch(e){
        next(e)
        
    }
    
}