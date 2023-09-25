import jwt from 'jsonwebtoken'
import { request, response } from "express";

export default function validJWT(req =request,res = response,next){

    try{

        const red='/servicios' //   <= Enviar como argumento luego a la llamada de la validacion para redireccion flexible.
        const {xtoken} = req.headers
        const validation = jwt.verify(xtoken,process.env.SECRET_TOKEN)

        console.log(validation)
        if(!validation) throw new Error ('Token no Autorizado')

        
    }catch(err){
        return res.redirect('/servicios')
        //O quizas tendria mas sentido redireccionar al login...

    }

    next()


}