import bcrypt from 'bcryptjs'
//import { Users } from '../schemas/users.js'
import jwt from 'jsonwebtoken'
import { request } from 'express'
import createJWT from '../helpers/createJWT.js'
import { dietAssistDB } from '../DB/dbConnection.js'
// pass:test12345

//Falta agg validaciones como campos vacio, ignorar espacio de la derehca de user, etc
//Posiblemente muchas cosas puedan hacerse tmb desde el front para ni enviar el fetch.

const Users = dietAssistDB.model('users')
export default async function logIn(req =request,res){

    //const 

    const {username,password} = req.body
    
    try{

        console.log(req.body)
        const user = await Users.find({
            username:username
        })
        
        if(user.length==0){
            return res.status(400).json('User/Password Incorrecta')  //400 is for bad request
        }

        console.log(user)
    
        const auth =  await bcrypt.compare(password,user[0].password)
        if(auth == false) {
            return res.status(401).json('User/Password Incorrecta') // or 401? Unauthorized
        }
        
        const token = createJWT(username)

        res.status(200).json({'token':token})

    }catch(err){
        res.status(500).json({err:err})       //500 becasuse it will only works is somenthing gone wrong creating JWT
                                        // For pass or user wrong we have individual problem manage...bad practice?

    }
    

}