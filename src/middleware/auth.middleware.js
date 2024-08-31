import { request,response } from "express";

export const authPolicies = (role)=>{
    return async (req = request, res=response, next)=>{
        console.log('Dentro de las politicas',req.user)
        if (!req.user) return res.status(401).json({status:'error', message:'Unauthorized'})
        if (req.user.role != role) return res.status(403).json({status:'error',message:'NO permission'})

        next()
        
    }
}
