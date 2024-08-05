import passport from "passport";
import { Strategy as CustomStrategy } from "passport-custom";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getUserEmail,getOneUser, newUserDB } from "../Data/MongoDB/user.dao.js";
import { hashPassword,isValidPassword } from "../Utils/hashPass.js";
import envs from "./env.config.js";
import { cookieExtractor } from "../Utils/cookieExtractor.js";
import { verifyToken } from "../Utils/jsonwt.js";

export const initializePassport = ()=>{
    //Estrategia de Google

passport.use('googleRegister',
    new GoogleStrategy({
        clientID: envs.GOOGLE_CLIENTID,
        clientSecret: envs.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/user/google"
        }, async (accessToken, refreshToken, profile, done)=>{
            console.log('----PASSPORT GOOGLE----')
            try{
                console.log(accessToken)
                const {id,name,emails} = profile
                const email = emails[0].value
                console.log(email)
                const user = await getUserEmail(email)
                if(!user)
                    {
                        const newUser = 
                        {
                            first_name:name.givenName,
                            last_name:name.familyName,
                            email:email,
                            password:'google',
                            age:''
                        }
                        const userCreate = await newUserDB(newUser)
                        return done(null,userCreate);
                        }
                return done(null,user,{message:'User Already exist'})
                        
            }catch(error){
                return done(error);
            }

    
}))
    passport.use('register',
        new LocalStrategy({
        passReqToCallback: true,//habilita el uso de req
        usernameField: 'email'
        }, async (req, username, password, done)=>{
            console.log('----PASSPORT REGISTER----')
            try{
                console.log(req.body.first_name)
                console.log(username)
                req.body.password = await hashPassword(password)

                const user = await getUserEmail(username);
                console.log(req.body.password)
                //Controlamos la respuesta de la Busqueda 
                if(!user)
                {
                    console.log('crea uno nuevoo')
                    const newAdd = await newUserDB(req.body)
                    return done(null, newAdd);
                }
                console.log('ya hay usuario')
                return done(null,false,{message:'User Already exist'})
                    
                        }catch(err){
                            return done(err);
                            }
            }))

    passport.use('login',
        new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'email'
            }, async (req, username, password, done)=>{
                try{
                    console.log('----PASSPORT LOGIN LOCAL----')
                   
                    console.log('este es el email',username)
                    console.log('este es la pass',password)
                    const user = await getUserEmail(username);
                    if(!user)
                        return done(null,false,{message:'User not exist'})
                    if(await !isValidPassword(password,user.password))
                        return done(null,false,{message: 'Credenciales Incorrectas'})
                    //registro el usuario en la session 
                    req.user = user
                    return done(null,user,{message:'Login Existoso'})
                    }catch(err){
                        return done(err);
                    }
        }))

        //Definida por mi
        passport.use('current',
            new CustomStrategy(
            async (req,done)=>{
                try{
                    console.log('----PASSPORT CURRENT----')
                    const token = cookieExtractor(req,'tokenjwt')
                    const tokenDecoded =  verifyToken(token)
                    if(!tokenDecoded)
                        return done(null,false,{message: 'Problemas con el Token'})
                        
                    const user = await getUserEmail(tokenDecoded.email)
                    console.log('Custom Passport',token)
                    console.log(tokenDecoded)
                    return done(null,tokenDecoded);
                    }catch(err){
                        console.log(err)
                        return done(err);
                        }
            }    
            ))

        //SERIALIZACION 
        passport.serializeUser((user,done)=>{
           done(null,user._id)
           })
       
                                   
           passport.deserializeUser(async (id,done)=>{
            try {
                const user = await getOneUser(id)
                console.log(user)
                done(null,user)
                
            } catch (error) {
                console.log(error)
                done(error)
            }
               })
    }
    







/*

                    return done(null, false, {message: "No user with that email."});
                    }
                    const validate = await user.isValidPassword(password);
                    if(!validate){
                        return done(null, false, {message: "Wrong password."});
                        }
                        return done(null, user, {message: 'User Login!'});

*/