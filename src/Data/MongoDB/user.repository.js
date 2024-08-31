import cartModel from "./Models/cart.models.js"
import userModel from "./Models/user.models.js"

const getUsers = async (query,option)=>{
    try{
        //MONGODB
        return await userModel.paginate(query,option)
    
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- Buscador de todos los User\n',e)
        return null
    }
}

const getOneUser = async (id) =>{
    try{
        return await userModel.findById(id)
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- buscador de User POR ID\n',e)
        return null
    }
}
const getUserEmail = async (email) =>{
    try{
        return await userModel.findOne({email:email})
    }catch(e)
    {
        console.log('MANEJO DE ERROR -- buscador de User POR EMAIL\n',e)
        return null
    }
}

const newUserDB = async (data)=>{
    const {first_name,
        last_name,
        email,
        age,
        password,
        role} = data
    try{
        const cart = await cartModel.create({})
        console.log(cart)
        const newUser = await  userModel.create({first_name,
            last_name,
            email,
            age,
            cart: cart._id,
            password,//: hashPass,
            role})
        return newUser
        }catch(e){
            console.log('MANEJO DE ERROR -- Creacion de User\n',e)
        }
}

const delUserDB = async (id)=>{
    try{
        return await userModel.findByIdAndDelete(id)
        .then(data=>{
            !data?
                null
            :
            console.log('hay esto para borrar',data)
            return data
        })

    }catch(e){
        console.log('MANEJO DE ERROR -- Borrar User por ID\n',e)
        return null
    }
}

const putUserDB = async (id,data) =>{
    console.log('lo que recibo para modificar',data)
    try{
        return await userModel.findByIdAndUpdate(id,
            {first_name,
            last_name,
            email,
            age,
            password,
            role})
        .then(data=>{
            !data?
            null
            :
            console.log('se Actualizo',data)
            return userModel.findById(id)
            .then(data=> data)
            
        })
    }
    catch(e){
        console.log('MANEJO DE ERROR -- Modificacion de User por ID\n',e)
        return null
    }

     
}

export default {
    getUsers,
    getOneUser,
    getUserEmail,
    newUserDB,
    delUserDB,
    putUserDB

}