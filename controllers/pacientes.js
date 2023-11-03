import { Mongoose } from "mongoose";
import { dietAssistDB } from "../DB/dbConnection.js";
//import { Patients } from "../schemas/patients.js";

const Patients = dietAssistDB.model('patients')

export async function getPatients(req,res){

    try{
        
        const {username} = req

        const regex= new RegExp(username)
        console.log(regex)
    
        const data = await Patients.find(
            {_id:regex},
        ) 

        res.status(200).send(data)

    }catch(err){
        res.status(400).send(err)
    }
   
}

export async function newPatient(req,res){

    try{

        const {name,surname,dni,sex,age,height,weight,sport,ocupation,goal} = req.body
        const {username} = req

        const result = await Patients.create(
            {_id:`${username}@${dni}`,
            name:name,
            surname:surname,
            dni:dni,
            age:age,
            sex:sex,
            height:height,
            weight:weight,
            sport:sport,
            ocupation,
            goal:goal
            }
        )

        console.log(result)
        res.status(200).send(result)

    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }

}


export async function deletePatient(req,res){

    try{

        const {patientId} = req.body
        const {username} = req

        const result = await Patients.deleteOne(
            {_id:patientId}
        )        
        
        console.log(result)
        res.status(200).send(result)

    }catch(err){
        res.status(400).send(err)
        console.log(err)
    }

}

