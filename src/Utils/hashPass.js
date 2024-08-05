import bcrypt from 'bcrypt'


//Hasheo
export const hashPassword = async (password) => {
    try{
        console.log(password) 
        return await bcrypt.hash(password, 10);
    }catch(e)
    {
        console.log(e);
    }
}

export const isValidPassword = async (password, userPassword)=>{
    console.log(password,userPassword)
    try{
        return await bcrypt.compare(password,userPassword);
        }catch(e)
        {
            console.log(e);
            next(e)
        
        }


}