import { request, response } from "express"
import userServices from '../services/user.services.js'
import { Server_Error, User_AuthError, User_EmailNotValid, User_LengthError, User_NullValueError } from "../Utils/Error/errorHandle.js"
import responseDto from "../dto/response.dto.js"
const MIN_LENGTH_String = 3
const MIN_LENGTH_PASS = 8
const REGEX_ATTACK_EXP = /<script[^>]*>(.*?)<\/script>/gi
const REGEX_EMAIL_EXP =   /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

const dataAttack_Controller = (data)=>{
    console.log('Data controller',data)
        // Validación de ataques
        Object.entries(data).forEach(([key,value] )=> {
            if(key!=='age' && value.match(REGEX_ATTACK_EXP))
            {
            console.log('ATACANDOOOO',req.ip)
            throw new Server_Error('No se permiten ataques')
            }
            //para los valores que no son STRING
            if(value.toString().match(REGEX_ATTACK_EXP))                              
                throw new Server_Error('No se permiten ataques')
        })
}

const userEmail_Controller = (email) =>{
    // Validación de email
    console.log('en el check de email', email)
    if(email){
        if(!email.match(REGEX_EMAIL_EXP))
            throw new User_EmailNotValid('El email ingresado no es Valido')
    else if(!email)
        throw new User_NullValueError('El email no puede ser nulo')
    } 
}
const userData_Controller = (data) =>{
    const {first_name,last_name,email,age,password,role} = data
    try{
        if(!first_name || !last_name || !email || !age || !password )
            throw new User_NullValueError('Hay campos que estan Vacios')
        if(first_name.length < MIN_LENGTH_String || last_name.length < MIN_LENGTH_String ) 
            throw new User_LengthError('El Nombre o Apellido debe tener mas de 3 caracteres')
        if(password.length < MIN_LENGTH_PASS)
            throw new User_LengthError('La Contraseña debe tener mas de 8 caracteres')
        //Verificacion de email
        userEmail_Controller(email)
    }catch(e){
        console.log(e)
        throw new Error(e)
    }

}

const userLogin_Controller = (data)=>{
    //const {email,password} = req.body
    const {email,password} = data
    try{
        if(!email || !password)
                throw new User_NullValueError('Credenciales Vacias')
    }catch(e){
        console.log(e)
    }
    
}


const getUsers = async (req=request,res=response)=>{
    const { limit, page, asc, query } = req.query;
    let filter = query;
    const options = {
        limit: limit ? limit : 10,
        page: page ? page : 1,
        sort: { price: asc === "true" ? 1 : -1 },
    }

    if (query !== undefined) {
        filter = query.split("=");
        console.log(filter);
        //del array que me da el split, lo convierto a un Objeto con su key
        filter = Object.fromEntries([filter]);
    }
    try {
        let allUser_DB = []
        //si recibo asc
        if (asc) 
            allUser_DB = await userServices.getUsers(filter, options)
        else
            allUser_DB = await userServices.getUsers(filter, {limit: limit ? limit : 10,page: page ? page : 1,});
        allUser_DB.totalDocs>0?
        res.status(200).json({
        status:'succes',
        payload:allUser_DB.docs.map(doc=>responseDto.resUsuario(doc)),
        totalPages: allUser_DB.totalPages,
        page: allUser_DB.page,
        pagingCounter: allUser_DB.pagingCounter,
        hasPrevPage: allUser_DB.hasPrevPage,
        hasNextPage: allUser_DB.hasNextPage,
        prevLink: allUser_DB.prevPage,
        nextLink: allUser_DB.nextPage
        })
        :
        res.status(404).json({status:'error',payload:[],message:"No hay Usuarios"})
    } catch (error) {
        console.log("MANEJO DE ERROR -- Buscador de todos los Usuarios\n", error);
        return null;
    }
}

const getOneUser = async (req = request , res=response)=>{
    const {id} = req.params;
    try {
        const user = await userServices.getUserById(id)
        user?res.status(200).json({status:'succes',payload:responseDto.resUsuario(user)}):
        res.status(404).json({status:'error',payload:[],message:`No hay usuarios con ---> ${id}`})
    }
    catch(error){
        console.log("MANEJO DE ERROR -- Buscador de un Usuario por ID\n", e);
        return null
    }
}



const getUserEmail = async (req = request , res=response)=>{
    const {email} = req.body;
    userEmail_Controller(email)
    try {
        console.log('entro al bloque',email)
        const user = await userServices.getUserEmail(email)
        console.log('enGETUSER',user)
        if(user)
            return user
    } catch (error) {
        console.log("MANEJO DE ERROR -- Buscador de un Usuario por Mail\n", error);
        return unde
    }


} 

const newUserDB = async  (req = request , res=response)=>{
    //Controlamos los datos de entrada
    console.log('Usuario NUEVO', req.body)
    dataAttack_Controller(req.body)
    userData_Controller(req.body)
    try {
        const newUser = await userServices.newUserDB(req.body)
        newUser?res.status(200).json({status:'success',payload:responseDto.resUsuario(newUser)})
        :
        res.status(404).json({status:'error',payload:[],message:'No se pudo crear el usuario'})
    } catch (error) {
        console.log("MANEJO DE ERROR -- Creacion Usuario\n", e);
        return null
    }

}

const delUserDB = async (req=request,res=response)=>{
    const {id} = req.params
    try {
        const user = await userServices.delUserDB(id)
        user?res.status(200).json({status:'succes',payload:responseDto.resUsuario(user)})
        :
        res.status(404).json({status:'error',payload:[],message:`No hay usuarios a Eliminar --> ${id}`})
    } catch (error) {
        console.log("MANEJO DE ERROR -- Eliminacion Usuario\n", error);
        return null
    }
}
const putUserDB = async (req = request, res= response)=> {
    //Controlamos los datos de entrada
    dataAttack_Controller(req.body)
    userData_Controller(req.body)
    const {id} = req.params
    try {
        const modUser = await userServices.putUserDB(id,req.body)
        modUser?res.status(200).json({status:'success', payload: responseDto.resUsuario(modUser)})
        :
        res.status(404).json({status:'error',payload:[],message:'No se pudo Modificar el Usuario'})
    } catch (error) {
        console.log("MANEJO DE ERROR -- Modificacion Usuario\n", error);
        return null
    }
}

export {
    getUsers,
    getOneUser,
    getUserEmail,
    newUserDB,
    delUserDB,
    putUserDB,
    //Controles que se usan en otras Rutas
    dataAttack_Controller,
    userLogin_Controller,
    userData_Controller

}
