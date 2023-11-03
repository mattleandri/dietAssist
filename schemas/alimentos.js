import mongoose, { mongo } from "mongoose"
import { Decimal128 } from "mongoose"


export const alimentoSchema = new mongoose.Schema({

    name: String,
    amount: Number,
    kcal: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    type: String,
    category: String,
    fiber: Number,
    portion: Number,
    weight: Number

})

