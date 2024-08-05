import express from 'express'
import { userData_Controller,dataAttack_Controller } from '../Controller/user.controller.js'
import { getUsers, newUserDB } from '../Data/MongoDB/user.dao.js'
import passport from 'passport'



const routerUser = express.Router()
//GET USER
routerUser.get('/',async (req,res)=>{
    const {limit,page,asc,query} = req.query
    console.log(req.query)
    const users = await getUsers(limit,page,asc,query)
    res.send(users)
})

//ADDNEW USER
routerUser.post('/sing-up',dataAttack_Controller,userData_Controller, async (req,res)=>{
    try {
        const newUser = await newUserDB(req.body)
    res.send(newUser).status(200)
    } catch (error) {
        res.send(error).status(400)
        }
})
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

routerUser.post('/sing-up2',dataAttack_Controller, userData_Controller,
    passport.authenticate('register', {failureRedirect:'/failregister'}),async(req,res)=>{
        res.send({status:'sucess',message:"User Registred"})
    })
//FAIL STRATEGY
routerUser.get('/failregister',async(req,res)=>{
    res.send({status:'fail',message:"User not Registred"})
    })
//UPDATE USER

//UPDATE DE CONTRASEÑA



export default routerUser