import { Decimal128 } from "bson"
import mongoose, { model, mongo } from "mongoose"
import { dietAssistDB } from "../DB/dbConnection.js"
import { request } from "express"
import { mealSchema,daySchema } from "../schemas/groups.js"
import { getDayName } from "./helpers/days.js"
import { getMealName } from "./helpers/meal.js"

const Plans = dietAssistDB.model('plans')
const Day = dietAssistDB.model('days')
const Meal = dietAssistDB.model('meals')

export async function newPlan (req,res){

    const {patientId,name,kcal,p,c,f,days,meals,description}=req.body
    //const {username} = req.body //(from JWT middlware)
    const planId = `${patientId}@${name}`
    
    console.log(req.body)

    const mealNames = getMealName(meals)
    const mealsArray = getDefMeals({meals,mealNames,p,c,f,kcal})
    //const dayName = getDayName(days,[])

     let daysArray = []
     for(let i = 0 ; i<days ; i++){

        const newDay= new Day({
            name:getDayName(i,[]),
            goal:{p:p,c:c,f:f,kcal:kcal},
            hola:'hola',
            meals: mealsArray
        })

        daysArray.push(newDay)
     }

   

    try {
        const result = await Plans.create({    
            _id: planId, 
            name: name,
            goal: {kcal:kcal,p:p,c:c,f:f},
            days: daysArray,
            description:description,   
        })   

        console.log(result.name)

        res.status(200).json({name:result.name})
    }

    catch(err)
    {console.log(err) ;  res.status(500).send("Error")}

}


//Adding meals according the distribiution seted (amount of meals is the important)
export function getDefMeals({meals:amount,mealNames,p,c,f,kcal}){
//TODO:agg poder recibir porcentaje especificado de distribucion

    const percentage=100/amount

    let meals=[]

    const goal={
        p:p*(percentage/100),
        c:c*(percentage/100),
        f:f*(percentage/100),
        kcal:kcal*(percentage/100)
    }
    
    for(let i=0;i<amount;i++){
        const meal = new Meal ({
            name: mealNames[i],
            percentage: 0,
            goal: goal,
            foods:[],
            autoCalculate:false
        }) 
        meals.push(meal)

    }

    
    
    return meals
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


//TODO: Agregar que la id sea leida de query Params
export async function getPlan(req,res){

    const {planId} = req.params

    try{
        const result = await Plans.findById(planId)

        
        res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
   
}

export async function getPlansNames (req = request,res){

    try{    
       
        const {patientId} = req.params

        const reg = new RegExp(patientId)

        const planes = await Plans.find({_id:reg},{_id:0,name:1})

        res.status(200).json(planes)

    }catch(err){
        res.send(500).json(err)
    }

}

export async function getDay (req,res){

    try{
        const {planId,dayName} = req.params

        const dayPlan = await Plans.find(
        {_id:planId,'days.name':dayName},
        {_id:0,'days.$':1})

        const dayData = dayPlan[0].days[0]

        res.status(200).json(dayData)

    }catch(err){

        res.status(500).json(err)
        
    }

}

export async function getFoodsList(req,res){


    try{
        const {planId,dayName,mealName} = req.params

        const result = await Plans.findOne(
            {
                _id: planId,
                'days.name': dayName,
                'days.meals.name': mealName,
            },
            {
                _id: 0,
                'days.$': 1,
            }
        );

        const foods = result.days.find(day => day.name == dayName)
        .meals.find(meal => meal.name == mealName).foods

        res.status(200).json(foods)

    }catch(err){

        res.status(500).json(err.message)
        
    }

}

//PUTS

export async function updateFoodsList(req,res){
    try{
        
        const {planId,dayName,mealName} = req.params
        const foods = req.body

            
        const result = await Plans.updateOne(
            {
                _id: planId,
                'days.name': dayName,
                'days.meals.name': mealName,
            },
            {
                $set: { 'days.$.meals.$[meal].foods': Object.keys(foods).length != 0?foods:[] },
            },
            {
                arrayFilters: [{ 'meal.name': mealName }],
            }
            );
            
            if (result.modifiedCount === 1) {
            console.log('Comida insertada correctamente.');
            } else {
            //throw new Error('No se realizo la insersion')
            }



        res.status(200).json({})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

export async function updateMealGoal (req,res){

    try{

        const {planId,dayName,mealName} = req.params
        const goals = req.body

        const result = await Plans.updateOne(
            {
              _id: planId,
              'days.meals.name': mealName
            },
            {
              $set: {
                'days.$[day].meals.$[meal].goal': goals
              }
            },
            {
              arrayFilters: [
                { 'day.name':  dayName },  // Nombre del día que contiene el 'meal' a actualizar
                { 'meal.name': mealName } // Nombre del 'meal' que quieres actualizar
              ]
            }
        );

        if(result.modifiedCount!=1) return res.status(404).json('No se modifico ningun Goal. Verifique los datos enviados')

        res.status(200).json({})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }

}

export async function addDay(req,res){

    try{
        const {planId} = req.params
        
        const data = await Plans.findById(
            {_id:planId},
            {_id:0,days:1,goal:1}
        )

        const dayAmount = parseFloat(data.days.length)
        const diasExistentes = data.days.map(day=>day.name)

        const dayName = getDayName(dayAmount,diasExistentes)

        const mealGoal = {
            p:data.goal.p/4,
            c:data.goal.c/4,
            f:data.goal.f/4,
            kcal:data.goal.kcal/4
        }

        const newDay = { 
            name: dayName,
            goal:data.goal,
            meals : [
                {name:'Desayuno' , goal: mealGoal},
                {name:'Almuerzo' , goal: mealGoal},
                {name:'Merienda' , goal: mealGoal},
                {name:'Cena' ,  goal: mealGoal}
            ]
        }

        const result = await Plans.updateOne(
            {_id:planId},
            {
                $addToSet: {days: newDay }
            }
        )

        res.status(200).json(newDay)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }
}

export async function setDayName(req,res){

    try{
        const {planId,dayName} = req.params
        const {newDayName} = req.body

        const result = await Plans.updateOne(
            {
              _id: planId,
              'days.name': dayName,
            },
            {
              $set: {
                'days.$[day].name': newDayName
              }
            },
            {
              arrayFilters: [
                { 'day.name': dayName },
              ]
            }
          );


        res.status(200).json({ok:'Modificado'})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }

}

//TODO: Agg Middleware que verifique la no existencia 
export async function updateMealName(req,res){

    try{
        const {planId,dayName,mealName} = req.params
        const {newMealName} = req.body

        const result = await Plans.updateOne(
            {
              _id: planId,
              'days.name': dayName,
              'days.meals.name': mealName
            },
            {
              $set: {
                'days.$[day].meals.$[meal].name': newMealName
              }
            },
            {
              arrayFilters: [
                { 'day.name': dayName },
                { 'meal.name': mealName }
              ]
            }
          );


        res.status(200).json({ok:'Modificado'})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }

}

//TODO: Aprender a hacer querys mas especificos. Arrays. Aprender a usar Aggregation
export async function addMeal(req,res){

    try{
        const {planId,dayName} = req.params
        const {mealNameClicked} = req.body
        console.log(mealNameClicked)
        
        const data = await Plans.find(
            {_id:planId , 'days.name': dayName },
            {_id:0,'days.$':1 }
        )

        let pos = data[0].days[0].meals.findIndex( meal =>
            ( meal.name == mealNameClicked)
        )

        if(pos == -1) throw new Error('Dia no encontrado...')
        
        pos+=1

        const mealName = `Plato${data[0].days[0].meals.length + 1}`
        const newMeal = {
            name: mealName,
            percentage:0,
            goal: {p:0,c:0,f:0,kcal:0},
            foods:[],
            autoCalculate:false
        }

        const response = await Plans.updateOne(
            {_id:planId},
            {
                $push:{
                    [`days.$[day].meals`]: {
                        $each:[newMeal],
                        $position: pos 
                    }
                }
            },
            {
                arrayFilters: [
                  { 'day.name': dayName },
                  //{ 'meal.name': mealNameClicked }
                ]
            }
        )

        console.log(newMeal)
        res.status(200).json({newMeal,pos})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }

}


//DELETES

export async function deleteMeal(req,res){

    try{

        const {planId,dayName,mealName} = req.params
       
        const result = await Plans.updateOne(
            {_id:planId},
            {
                $pull:{'days.$[day].meals':{name:mealName}}
            },
            {
                arrayFilters:[
                    {'day.name':dayName}
                ]
                
            }
            )
        
        if(result.modifiedCount!=1) return res.status(404).json({err:'Plato no Encontrado'})
       

        res.status(200).json({result})

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }


}

export async function deleteDay(req,res){

    try{

        const {planId,dayName} = req.params
       
        const result = await Plans.updateOne(
            {_id:planId},
            {
                $pull:{'days':{name:dayName}}
            }
            )
        
        if(result.modifiedCount!=1) return res.status(404).json({err:'Dia no Encontrado'})
       

        res.status(200).json(result)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    
    }

}