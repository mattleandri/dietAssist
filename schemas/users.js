import {Schema, model} from "mongoose"

const User = new Schema({
    username:String,
    password:String
})

export const Users =model('users',User)