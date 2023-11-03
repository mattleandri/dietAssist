import { Schema, model } from "mongoose";

const patientSchema = new Schema({
    _id:String,
    name:String,
    surname:String,
    dni:Number,
    age: Number,
    sex:String,
    height:Number,
    weight:Number,
    sport:String,
    ocupation:String,
    goal:String
})

export {patientSchema}

//export const Patients = dietAssitDB.model('patients',Patient)