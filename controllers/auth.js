import bcrypt from 'bcryptjs'
//import { Users } from '../schemas/users.js'
import jwt from 'jsonwebtoken'
import { request } from 'express'
import createJWT from '../helpers/createJWT.js'
import { dietAssistDB } from '../DB/dbConnection.js'
import { createExPatient } from '../helpers/createExPatient.js'
// pass:test12345

//Falta agg validaciones como campos vacio, ignorar espacio de la derehca de user, etc
//Posiblemente muchas cosas puedan hacerse tmb desde el front para ni enviar el fetch.

const Users = dietAssistDB.model('users')
export async function logIn(req =request,res){

    //const 

    const {username,password} = req.body
    
    try{

        console.log(req.body)
        const user = await Users.find({
            username:username
        })
        
        if(user.length==0){
            return res.status(401).json('User/Password Incorrecta') 
        }
    
        const auth =  await bcrypt.compare(password,user[0].password)
        if(auth == false) {
            return res.status(401).json('User/Password Incorrecta') // 400 is for bad request / 401 Unauthorized
        }
        
        const token = createJWT(username)

        res.status(200).json({'token':token})

    }catch(err){
        res.status(500).json({err:err})       //500 becasuse it will only works is somenthing gone wrong creating JWT
                                            
    }

}

//TODO: Add restrictions to password
export async function signUp(req,res){

    const {username,password,name,surname} = req.body
    console.log(password)

    try{

        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password,salt)

        //TODO: make it Transaction 

        const result = await Users.create({username:username,password:hashedPass,name:name,surname:surname})
        createExPatient(username)
        res.status(200).json({msj:'ok'})

    }catch(err) {
        console.log(err)
        res.status(500).json({err:err})
    }

}