import { dietAssistDB } from "../DB/dbConnection.js"

import { getMealName , getDefMeals } from "../controllers/helpers/meal.js"
import { getDayName } from "../controllers/helpers/days.js"

export const createExPatient = async (username) => {

    const Patients = dietAssistDB.model('patients')
    const Plans = dietAssistDB.model('plans')
    const Meal = dietAssistDB.model('meals')
    const Day = dietAssistDB.model('days')
    
    const patientId = `${username}@1`

    await Patients.create({
        _id:patientId,
        name:'Paciente ',
        surname:'de Ejemplo',
        dni:1,
        age: 22,
        sex:'masc', 
        height:180,
        weight:90,
        sport:'Pesas',
        ocupation:'Software Engineer',
        goal:'Aumentar Masa Muscular'

    })


    //Plan Creation
    //TODO: aprovechar el controlador newPlan ... convertir a fn? o usarlo como proximo endpoint?
    
    //const {,name,kcal,p,c,f,days,meals,description}=req.body
    //const {username} = req.body //(from JWT middlware)
    const name = 'Plan Mes 1',
        planId =  `${patientId}@${name}`,
        kcal = 3300,
        p = 144,
        c = 452,
        f = 70,
        days = 5,
        meals = 4,
        description = 'Plan de Ejemplo'

    const mealNames = getMealName(meals)
    const mealsArray = getDefMeals({meals,mealNames,p,c,f,kcal})
    //const dayName = getDayName(days,[])

     let daysArray = []
     for(let i = 0 ; i<days ; i++){

        const newDay= new Day({
            name:getDayName(i,[]),
            goal:{p:p,c:c,f:f,kcal:kcal},
            meals: mealsArray
        })

        daysArray.push(newDay)
     }

 
    const result = await Plans.create({    
        _id: planId, 
        name: name,
        goal: {kcal:kcal,p:p,c:c,f:f},
        days: daysArray,
        description:description,   
    })   

    console.log(result.name)

  
}