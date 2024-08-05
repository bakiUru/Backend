import dotenv from 'dotenv'

dotenv.config()

export default{
    PORT:process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB : process.env.MONGO_DB,
    SECRET_CODE : process.env.SECRET_CODE,
    GOOGLE_CLIENTID : process.env.GOOGLE_CLIENTID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_CODE_JWT : process.env.SECRET_CODE_JWT
}