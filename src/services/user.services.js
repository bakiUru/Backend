import userRepositry from '../Data/MongoDB/user.repository.js'


const getUsers = async (query,option) =>{
    return await userRepositry.getUsers(query,option)
}

const getOneUser = async (id)=>{
    return await userRepositry.getOneUser(id)
}

const getUserEmail = async (email) =>{
    return await userRepositry.getUserEmail(email)
}

const newUserDB = async (data)=>{
    return await userRepositry.newUserDB(data)
}

const delUserDB = async (id)=>{
    return await userRepositry.delUserDB(id)
}

const putUserDB = async (data) =>{
    return await userRepositry.putUserDB(data)
}

export default{
    getUsers,
    getOneUser,
    getUserEmail,
    newUserDB,
    delUserDB,
    putUserDB
}

