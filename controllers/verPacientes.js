import { Mongoose } from "mongoose";
import { Patients } from "../schemas/patients.js";

export async function getPatients(req,res){

    try{
        const {username} = req.body

        const regex= new RegExp(username)
        console.log(regex)
    
        const data = await Patients.find(
            {_id:regex},
            {_id:0,name:1,surname:1}
        ) 

        //setTimeout(()=>{res.status(200).send(data)},1500)
        res.status(200).send(data)
        

    }catch(err){
        res.status(400).send(err)
    }
   
}