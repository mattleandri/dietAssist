import { Schema, model } from "mongoose";

const patientSchema = new Schema({
    _id:String,
    name:String,
    surname:String,
    age: Number
})

export {patientSchema}

//export const Patients = dietAssitDB.model('patients',Patient)