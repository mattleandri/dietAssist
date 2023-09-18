import {showCreatePlan,createGroup,newDay} from '../controllers/createPlan.js'
import express from 'express'

const createPlanRouter=express.Router()


createPlanRouter.get('/',showCreatePlan)
createPlanRouter.post('/newGroup',createGroup)  // Posiblemente solo me quede con New Plan que creara de ser necesario el Group
createPlanRouter.post('/newDay',newDay)

export default createPlanRouter;