import { getAlimentosById, getAlimentosByName } from '../controllers/common/getAlimentos.js'
import {newPlan,getPlan ,
    getPlansNames,getDay, updateFoodsList,getFoodsList,updateMealGoal, addDay,updateMealName,addMeal,
    deleteMeal,deleteDay,setDayName} from '../controllers/createPlan.js'
import { checkDayName, checkMealName } from '../middlewares/plans.js'

import express from 'express'

const createPlanRouter=express.Router()

//TODO: Rename this route to Plan
//TODO: Agg Middleware con .use de checkJWT.... Por lo tanto agg en el front el envio del token en todas las solicitudes

createPlanRouter.post('/newPlan',newPlan)  // Posiblemente solo me quede con New Plan que creara de ser necesario el Group
//createPlanRouter.post('/addDefMeals',addDefMeals)
//createPlanRouter.post('/setDistribution',setDistribution)

createPlanRouter.get('/getPlansNames/:patientId',getPlansNames)
createPlanRouter.get('/getPlan/:planId',getPlan)
createPlanRouter.get('/getPlan/:planId/:dayName',getDay)

//days
createPlanRouter.put('/addDay/:planId',addDay)   //TODO: VerificaNombreUnico 
createPlanRouter.put('/setDayName/:planId/:dayName',checkDayName, setDayName)
createPlanRouter.delete('/deleteDay/:planId/:dayName',deleteDay)


//foods
createPlanRouter.get('/getFoodsList/:planId/:dayName/:mealName',getFoodsList)
createPlanRouter.put('/updateFoods/:planId/:dayName/:mealName',updateFoodsList)

//goals
createPlanRouter.put('/updateMealGoal/:planId/:dayName/:mealName',updateMealGoal)

//Meals 
createPlanRouter.put('/updateMealName/:planId/:dayName/:mealName',checkMealName, updateMealName)   //TODO: VerificaNombreUnico + Ver tema Espacios
createPlanRouter.put('/addMeal/:planId/:dayName',addMeal)
//TODO: Seria interesante que la DB ofreciera borrado por bandera
//Pero deberia actualizar muchas cosas. Por ejemplo a la hora de crear el nombre del sig plato
//No  deberia leer la long sino la cant de Meals que hay sin borrado por bandera...etc
createPlanRouter.delete('/deleteMeal/:planId/:dayName/:mealName',deleteMeal)


//TODO: Tendria mas sentido que esto sea de otra Ruta. Por ej crear una ruta Alimentos con todos sus endpoints.Busqueda.Modificacion,creacion, etc
createPlanRouter.get('/getAlimentos',getAlimentosByName)
createPlanRouter.get('/getAlimentosById/:foodId',getAlimentosById)




export default createPlanRouter;