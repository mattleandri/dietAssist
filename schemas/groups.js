import { Decimal128 } from "bson";
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    p: Number,
    c: Number,
    f: Number,
    kcal: Number
},
{_id:false})

const foodSchema = new mongoose.Schema({
    foodId:String,
    amount:Number
},{_id:false})

export const mealSchema = new mongoose.Schema({

    name:String,
    percentage:Number,
    goal:goalSchema,
    foods:[foodSchema]
},
{_id:false})

export const daySchema = new mongoose.Schema({
    name: String,
    goal: {
        type: goalSchema,
        required: true,
    },
    meals: {
            type: [mealSchema],
            default:[]
        }
    
},
{_id:false})

const plansSchema = new mongoose.Schema({
    _id: String,
    name: String,
    goal: goalSchema,
    description: String,
    days: [daySchema]
})

export {plansSchema}


//export const Plans = dietAssitDB.model('plans',plansSchema)
