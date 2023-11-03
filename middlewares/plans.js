import { dietAssistDB } from "../DB/dbConnection.js"

 const Plans = dietAssistDB.model('plans')

export const checkDayName = async (req,res,next) =>{

    try{
        const {planId} = req.params
        const {newDayName} = req.body

        console.log(planId)
        console.log(newDayName)

        const result = await Plans.findOne(
            {
                _id: planId,
              },
              {
                _id: 0,
                days: 1,
              }
            )
        
            let existe = false
            console.log(result)
            result.days.forEach(day => {
                if(day.name == newDayName) existe = true 
            });
            console.log(existe)
            if(existe) return res.status(404).json({err:'El nombre ya existe'})


            next()


    }catch(err){
        console.log(err)
    }

}

//TODO: Aprender mas de MongoDB y mejorar Query
export const checkMealName = async (req,res,next) =>{

    try{
        const {planId,dayName} = req.params
        const {newMealName} = req.body

        const result = await Plans.findOne(
            {
                _id: planId,
                'days.name': dayName,
              },
              {
                _id: 0,
                days: 1,
              }
            )
        
            let existe = false
            result.days.find(day => day.name == dayName).meals.forEach(meal => {
                if(meal.name == newMealName) existe = true
                console.log(existe)
            });

            if(existe) return res.status(404).json({err:'El nombre ya existe'})

            console.log(result)
            next()


    }catch(err){
        console.log(err)
    }

}