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
            {_id:1,name:1,surname:1}
        ) 

        //setTimeout(()=>{res.status(200).send(data)},1500)
        res.status(200).send(data)

    }catch(err){
        res.status(400).send(err)
    }
   
}