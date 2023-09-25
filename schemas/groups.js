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
    percentage:Decimal128,
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

const plansSchema = new mongoose.Schema({
    _id: String,
    name: String,
    goal: goalSchema,
    days: [daySchema]
})






export const Plans = mongoose.model('plans',plansSchema)
