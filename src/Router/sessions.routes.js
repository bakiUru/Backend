import { Router } from "express";
import passport from "passport";
import { getUserEmail } from "../Controller/user.controller.js";
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
routerSession.post('/authJWT', async (req,res)=>{
    dataAttack_Controller(req.body)
    userLogin_Controller(req.body)
    const {email, password} = req.body
    
    try{
        const user = await getUserEmail(req)
        if(!user)
            return res.status(400).json({succes:'Error',message:'No encontramos registros'})

        if(await isValidPassword(password,user.password))
        {
            const {first_name,last_name,role} = user
            console.log('entre')
            const token =  createToken(user)
            console.log(token)
      |     //Guardamos en la cookie la info
            res.cookie('tokenjwt', token, {httpOnly:true})
            req.session.save(()=>{
                console.log('entra acA?')
                req.session.user = user
                console.log(req.session)
             
         }) 
         return res.status(200).json({succes:'success',message:'Login exitoso', payload: {first_name,last_name,email,role},token:token})
        }
         res.status(401).json({status: "error de auth", payload: user})
    }catch(error)
    {
        console.log(error)
         res.status(400).json({status: "error", payload: error})
    }
})

routerSession.post('/login2',
    passport.authenticate('login'),async (req,res)=>{
        dataAttack_Controller(req.body)
        userLogin_Controller(req.body)
        console.log('que hay',req.user)
        const {email, password} = req.body
        try{
            const user = await getUserEmail(req)
            if(!user)
                return res.status(400).json({succes:'Error',message:'No encontramos registros'})
    
            if(await isValidPassword(password,user.password))
            {
                const {first_name,last_name,role} = user
                console.log('entre')
                const token =  createToken(user)
                console.log(token)
          |     //Guardamos en la cookie la info
                res.cookie('tokenjwt', token, {httpOnly:true})
                req.session.save(()=>{
                    console.log('entra acA?')
                    req.session.user = user
                    console.log(req.session)
                 
             }) 
             return res.status(200).json({succes:'success',message:'Login exitoso', payload: {first_name,last_name,email,role},token:token})
            }
             res.status(401).json({status: "error de auth", payload: user})
        }catch(error)
        {
            console.log(error)
             res.status(400).json({status: "error", payload: error})
        }
    })
    
routerSession.get('/succesLogin', (req,res)=>{
    res.send({status:'sucess',message:"User Login"})
})
routerSession.post('/login2',(req,res)=>{
    console.log(req.body)
    res.send({status:'error',message:"User Login Failed"})
})

//Pruebas logOut
routerSession.delete('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err)
            return res.status(400).json({succes:'Error',message:'No encontramos registros'})
        res.clearCookie('tokenjwt')
        return res.status(200).json({succes:'ok',message:'cerraste sesion'})
    })

})

routerSession.get('/hiAgaain',(req,res)=>{
    console.log('Saliste bandid@')
    res.status(200).json({message:'Adiosss'})
})

//Current ruta que tomara el token de la cookie y validara, sera una estragia de passport
routerSession.get('/current', passport.authenticate('current'), async(req,res)=>{
    
    res.send({status:'sucess',message:"User Login", payload: req.user})
})
export default routerSession
