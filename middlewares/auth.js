import { dietAssistDB } from "../DB/dbConnection.js"
import { userSchema } from "../schemas/users.js"

const Users = dietAssistDB.model('users')

export async function verifyUsername(req,res,next){

    const {username} = req.body

    //agg expres validator despues
    if(!username||username.length<6) return res.status(400).json({err:'Invalid username syntax'})

    const result = await Users.findOne({username:username})
    console.log(result)

    if(!result) next()
    else return res.status(400).json({err:'existent username'})
}