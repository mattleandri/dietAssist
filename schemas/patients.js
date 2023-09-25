import { Schema, model } from "mongoose";

const Patient = new Schema({
    _id:String,
    name:String,
    surname:String,
    age: Number
})

export const Patients = model('patients',Patient)