import express from 'express'
import { getUsers, newUserDB,dataAttack_Controller,userLogin_Controller } from '../Controller/user.controller.js'
import passport from 'passport'



const routerUser = express.Router()
//GET USER
routerUser.get('/',getUsers)

//ADDNEW USER
routerUser.post('/sing-up',newUserDB)

//ADDNEW USER GOOGLE
routerUser.get('/google',passport.authenticate('googleRegister',{
    scope:["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session:false
}),
async (req,res)=>{
    try {
        return res.status(200).json({status: "ok", payload: req.user})
        } catch (error) {
            return res.status(400).json({status: "error", payload: error})
            }
            })

routerUser.post('/sing-up2',
    passport.authenticate('register', {failureRedirect:'/failregister'}),async(req,res)=>{
        dataAttack_Controller(req.body)
        userLogin_Controller(req.body)
        res.send({status:'sucess',message:"User Registred"})
    })
//FAIL STRATEGY
routerUser.get('/failregister',async(req,res)=>{
    res.send({status:'fail',message:"User not Registred"})
    })
//UPDATE USER

//UPDATE DE CONTRASEÑA



export default routerUser