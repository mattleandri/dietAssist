import {Schema, model} from "mongoose"

const userSchema = new Schema({
    username:String,
    password:String,
    name:String,
    surname:String,
    //age,born,dni... etc
})

export {userSchema}

//export const Users = dietAssitDB.model('users',User)