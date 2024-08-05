import { request, response } from "express";


export const validSession =  async (req=request,res=response)=>{

    console.log(req.session)
}