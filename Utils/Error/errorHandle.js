const ErrorFactory = (name,status) =>{
    return  class CustomizedError extends Error{
            constructor(message){
            super(message)
            this.status = status? status : 500
            this.error = name +'-',
            //Esto es todo el detalle de error, rutas ETC
            this.stack= ''
    }
}
}
//USER
export const User_AuthError = ErrorFactory('AuthentificationError',401)//401
export const User_NotFoundError = ErrorFactory('NotFoundError',403)//403 -- Sin autorizacion Forbidden
export const User_NullValueError = ErrorFactory('EmptyValuesError',400)
export const User_LengthError = ErrorFactory('ValueLengthError')//

//TOKEN
export const Token_NotProvider = ErrorFactory('Token_Error',401)
export const Token_Invalid = ErrorFactory('Token_Error',401)

//COOKIES
export const Cookie_NotFound = ErrorFactory('Cookie_Error',401)

//ATAQUES
export const Server_Error = ErrorFactory('Server_Error')
/*
class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "NotFoundError";
        }
        }

export {
    AuthError,
    NotFoundError

}*/