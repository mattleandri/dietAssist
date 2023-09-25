import { Decimal128 } from "bson"
import { Plans } from "../schemas/groups.js"
import mongoose, { mongo } from "mongoose"


export function showCreatePlan(req,res) {

    res.render('createPlan',{})

}

export async function createGroup (req,res){

    const {groupId,name,goal}=req.body

    try {
        await Plans.create({    
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
    const defaultGoal= await Plans.findById(groupId, {"_id":0, "goal":1}).exec() //by def goal is the same than al month goal. Apply projection 
    console.log(defaultGoal.goal)
   
    try{
        
        const action = await Plans.updateOne(
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

//Adding meals according the distribiution seted (amount of meals is the important)
export async function addDefMeals(req,res){


  
    const {groupId,dayName,mealsAmount}=req.body
    let mealNames=[]
    const percentage=100/mealsAmount

    const defaultGoal = await Plans.findById(groupId, {"_id":0, "goal":1}).exec() //by def goal is the same than all month goal. Apply projection 

   
    
    const meals=[]

    const goal={
        p:(defaultGoal.goal.p*percentage)/100,
        c:(defaultGoal.goal.c*percentage)/100,
        f:(defaultGoal.goal.f*percentage)/100,
        kcal:(defaultGoal.goal.kcal*percentage)/100
    }
    
    for(let i=0;i<mealsAmount;i++){
        const meal = {
            name:`Plato ${i+1}`,
            percentage: percentage,
            goal: goal,
            foods:[]
        } 
        meals.push(meal)

    }

    try{
        const action = await Plans.updateOne(
            {$and:[{_id:groupId},{"days.name":dayName}]}, //filter
            {$addToSet:{"days.$.meals":meals}} //update
            )

            res.status(200).send("Todo Bien" + "\n" + JSON.stringify(action))
    }
    catch(error){res.status(500).send("Something worng..." + error)}
    
}


export async function setDistribution (req,res){
//Todo Restrinctions: Distribution must be =100
    // Utilizare Trasactions (sesion en mongoose) lo que me permite que todas mi operaciones se consideren una
    // => si falla una insersion de percentage o del nuevo goal => se cancela toda la operacion :)

    const {groupId,dayName,distribution} = req.body
    const goal= await Plans.findById(groupId, {"_id":0, "goal":1}).exec() //by def goal is the same than al month goal. Apply projection 

            
    try{
        const data = await Plans.find(
            {$and:[{_id:groupId},{"days.name":dayName}]},
            {_id:0,"days.$":1}
        )
        const day = data[0].days[0]

        //1 Si Existe day.goal lo asigno. Sino tomo el Default 
        //Puedo mejorarse codigo poniendo el find en else. Para que buscaria el default si luego lo sobreecribire? dot make sense
        if('goal' in  data) goal = day.goal  
        
        //Calculo nuevos Goal de c/meal y luego asigno su nuevo percentage
        day.meals.map((meal,i)=>{
            
            meal.goal.p=(meal.goal.p/meal.percentage)*distribution[i] //(Getting te 1% value) & multiplying it * new percentage value to asign
            meal.goal.c=(meal.goal.c/meal.percentage)*distribution[i]
            meal.goal.f=(meal.goal.f/meal.percentage)*distribution[i]
            meal.goal.kcal=(meal.goal.kcal/meal.percentage)*distribution[i]

            meal.percentage=distribution[i]

        })
        //3 Actualizo en DB
        const action = await Plans.updateOne(
            {$and:[{_id:groupId},{"days.name":dayName}]},
            {$set:{"days.$":day}}
        )


        res.status(200).send(JSON.stringify(data[0].days[0].meals))

    }catch(err){
        res.status(500).send("Somethign Wrong: " + err) 
    }

        

}

//TO DO newMeal()   for if we want to add just 1 meal 