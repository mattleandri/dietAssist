import { Decimal128 } from "bson"
import { Group } from "../schemas/groups.js"


export function showCreatePlan(req,res) {

    res.render('createPlan',{})

}

export async function createGroup (req,res){

    const {groupId,name,goal}=req.body

    try {
        await Group.create({    
            _id: groupId, //"mattleandri@LucasLeandri42000000",
            name: name,//"Mes1",
            goal: goal //{p:180, c:200,f:80, kcal:2000}
                
        })   

        res.send("Creado con Exito")
    }

    catch(err)
    {res.status(500).send("Error")}

}

export async function newDay(req,res){

    const {groupId,dayName}=req.body
    const defaultGoal= await Group.findById(groupId, {"_id":0, "goal":1}).exec() //by def goal is the same than al month goal. Apply projection 
    console.log(defaultGoal.goal)
   
    try{
        
        const action = await Group.updateOne(
            {_id:groupId}, //filter
            {$addToSet:{days:{  //data (adding a item to the array with push)
                name:dayName,
                //goal:defaultGoal No especifico el goal a menos que sea diferente al del group
                meals:[]
        }}})
        
        //console.log(action)
        res.status(200).send(`Insersiones: ${action.modifiedCount>0 ?
        'Realizado con exito':`No se han realizado insersiones. Ya existe el Dia "${dayName}"`}`)
     
    }

    catch{res.status(500).send( "Something gone wrong...")}
   
    
}
/*
//Adding meals according the distribiution seted (amount of meals is the important)
export async function addDefMeals(req,res){


    const {groupId,dayName,mealsAmount}=req.body
    let mealNames=[]

    const defaultGoal=  await Group.findById(groupId, {"_id":0, "goal":1}).exec() //by def goal is the same than al month goal. Apply projection 

    if(mealsAmount===1){

        Group.updateOne(
            {_id:groupId}, //filter
            {"days.jueves"} //update
            )

    }
    if(mealsAmount===2){

    }
    if(mealsAmount===3){

    }
    if(mealsAmount>=4){

    }
        
        mealNames.push("Desayuno")
        

        for(let i=0;i<mealsAmount;i++){
        

    }

}

*/
//TO DO newMeal()   for if we want to add just 1 meal 