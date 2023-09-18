import { Decimal128 } from "bson";
import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    p: Decimal128,
    c: Decimal128,
    f: Decimal128,
    kcal: Decimal128
},
{_id:false})

const foodSchema = new mongoose.Schema({
    foodId:String,
    amount:Decimal128
},{_id:false})

const mealSchema = new mongoose.Schema({
    name:String,
    goal:goalSchema,
    foods:[foodSchema]
},
{_id:false})

const daySchema = new mongoose.Schema({
    name: String,
    goal: goalSchema,
    autoCalculate: {
        type:Boolean,
        default:true},
    meals: [mealSchema]
    
},
{_id:false})

const groupSchema = new mongoose.Schema({
    _id: String,
    name: String,
    goal: goalSchema,
    days: [daySchema]
})






export const Group = mongoose.model('plans',groupSchema)
//export const Goal = mongoose.model('plans',goalSchema)
//export const Day = mongoose.model('plans',daySchema)
//export const Meal = mongoose.model('plans',mealSchema)

