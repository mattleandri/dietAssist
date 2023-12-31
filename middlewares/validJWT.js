import jwt from 'jsonwebtoken'
import { request, response } from "express";

export default function validJWT(req =request,res = response,next){

    try{

        const accesToken = (req.headers.authorization).split('Bearer ')[1]
        
        const validation = jwt.verify(accesToken,process.env.SECRET_TOKEN)

        req.username = validation.username

        console.log(validation)
        if(!validation) throw new Error ('Token no Autorizado')

        
    }catch(err){
        return res.status(401).json({err})
    }

    next()

}