import {Schema, model} from "mongoose"

const userSchema = new Schema({
    username:String,
    password:String
})

export {userSchema}

//export const Users = dietAssitDB.model('users',User)