import { Router } from "express";
import passport from "passport";
import { getUserEmail } from "../Data/MongoDB/user.dao.js";
import { isValidPassword } from "../Utils/hashPass.js";
import { createToken } from "../Utils/jsonwt.js";
import { dataAttack_Controller,userLogin_Controller } from "../Controller/user.controller.js";

const routerSession = Router()

routerSession.get('/login',passport.authenticate('googleRegister',{
    scope:["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session:false
}),
async (req,res)=>{
    try {
        return res.status(200).json({status: "ok", payload: req.body})
        } catch (error) {
            return res.status(400).json({status: "error", payload: error})
            }
            })


//JWT
routerSession.post('/authJWT',dataAttack_Controller,userLogin_Controller,  async (req,res)=>{
    const {email, password} = req.body
    try{
        const user = await getUserEmail(email)
        if(!user)
            return res.status(400).json({succes:'Error',message:'No encontramos registros'})

      
        
        if(await isValidPassword(password,user.password))
        {
            const {first_name,last_name,role} = user
            console.log('entre')
            const token =  createToken(user)
            console.log(token)
      |     //Guardamos en la cookie la info
            res.cookie('tokenjwt', token, {httpOnly:false})
            res.user = user

            return res.status(200).json({status: "ok", payload: {first_name,last_name,email,role},token})
        }
        return res.status(401).json({status: "error de auth", payload: user})
    }catch(error)
    {
        console.log(error)
        return res.status(400).json({status: "error", payload: error})
    }
})

routerSession.post('/login2',
    passport.authenticate('login',{
         failureRedirect: "/login2"
    }),dataAttack_Controller,userLogin_Controller,async (req,res)=>{
        const {email, first_name} = req.user
        console.log(req.user)
        res.send({status:'sucess',message:"User Login", payload: {email,first_name}})
    }
)
routerSession.get('/succesLogin', (req,res)=>{
    res.send({status:'sucess',message:"User Login"})
})
routerSession.post('/login2',(req,res)=>{
    console.log(req.body)
    res.send({status:'error',message:"User Login Failed"})
})

//Current ruta que tomara el token de la cookie y validara, sera una estragia de passport
routerSession.get('/current', passport.authenticate('current'), async(req,res)=>{
    
    res.send({status:'sucess',message:"User Login", payload: req.user})
})
export default routerSession
