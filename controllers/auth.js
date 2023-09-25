import bcrypt from 'bcryptjs'
import { Users } from '../schemas/users.js'
import jwt from 'jsonwebtoken'
// pass:test12345

export default async function logIn(req,res){

    const {username,password} = req.body

    try{

        const user = await Users.find({
            username:username
        })
        
        if(user.length==0){
            return res.status(400).send('User/Password Incorrecta')  //400 is for bad request
        }

        console.log(user)
    
        const auth =  await bcrypt.compare(password,user[0].password)
        if(auth == false) {
            return res.status(401).send('User/Password Incorrecta') // or 401? Unauthorized
        }
        
        const token = jwt.sign({username:username},process.env.SECRET_TOKEN)
        console.log(token)

        res.status(200).send("logged")

    }catch(err){
        res.status(400).send(err)
    }
    

}